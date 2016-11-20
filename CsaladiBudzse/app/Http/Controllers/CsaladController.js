'use strict'

const Validator = use('Validator')
const Csalad = use('App/Model/Csalad')
const User =  use('App/Model/User')
const Jogosultsag = use('App/Model/Jogosultsag')

class CsaladController {

  generateLink() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 20; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text
  }
  * join(request, response) {
      if(request.currentUser.csalad_id) {
        response.redirect('/csalad')
        return
      }
      const secret_id = request.param('id');
      const csalad = yield Csalad.findBy('reg_link', secret_id)
      request.currentUser.csalad_id = csalad.id
      yield request.currentUser.save()

      response.redirect('/csalad')
    }
  * index(request, response) {
    if(request.currentUser.csalad_id == null) {
      response.redirect('/csalad/create')
      return
    }

    const csalad = yield Csalad.query()
      .where('id', request.currentUser.csalad_id).with('tagok', 'tagok.koltsegek', 'tagok.jogosultsagok').fetch()

    const jogosultsagok = yield Jogosultsag.all()

    yield response.sendView('csalad', {
      csalad: csalad.toJSON()[0],
      jogosultsagok: jogosultsagok.toJSON()
    })
  }
  * delete(request, response) {
    const user = yield User.findBy('id', request.param('id'))
    console.log(user)

    if(user.csalad_id != request.currentUser.csalad_id) {
      response.redirect('/csalad')
      return
    }

    user.csalad_id = null
    yield user.save()
    response.redirect('/csalad')
  }

  * create(request, response) {
    yield response.sendView('csaladCreate')
  }

  * jogosultsag (request, response) {

    var user_id = request.input('modal_user_id')
    console.log(user_id)
    const user = yield User.findBy('id', user_id)

    if(user.csalad_id != request.currentUser.csalad_id) {
      response.redirect('/csalad')
      return
    }

    response.redirect('/csalad')
  }

  * createFeldolgozas (request, response) {
    const csaladData = request.except('_csrf');

    const rules = {
      nev: 'required|alpha|min:3|max:20'
    };

    const validation = yield Validator.validateAll(csaladData, rules)

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({errors: validation.messages()})
        .flash()
      response.redirect('back')
      return
    }
    csaladData.reg_link = this.generateLink()

    const csalad = yield Csalad.create(csaladData)
    request.currentUser.csalad_id = csalad.id
    yield request.currentUser.save()

    response.redirect('/csalad')
  }

}


module.exports = CsaladController
