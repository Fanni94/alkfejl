'use strict'

const Validator = use('Validator')
const Koltseg = use('App/Model/Koltseg')

class BudzseController {

  * index(request, response) {
    const isLoggedIn = yield request.auth.check()
    if (isLoggedIn) {
      response.redirect('/egyenleg')
    }
    else {
      yield response.sendView('login')
    }

  }

  * egyenleg(request, response) {
    const koltseg = yield Koltseg.query().where('user_id', request.currentUser.id);
    yield response.sendView('egyenleg', {
      koltsegek : koltseg
    })
  }
  * ajaxDeleteKoltseg(request, response) {

    const id = request.param('id');
    const koltseg = yield Koltseg.find(id);

    if(koltseg) {
      if (request.currentUser.id !== koltseg.user_id) {
        response.unauthorized('Access denied.')
        return
      }

    yield koltseg.delete()
      response.ok({
        success: true
      })
      return
    }
    response.notFound('Nincs ilyen költség')
  }
  * deleteKoltseg (request, response) {
    const id = request.param('id');
    const koltseg = yield Koltseg.find(id);

    if (request.currentUser.id !== koltseg.user_id) {
      response.unauthorized('Access denied.')
      return
    }

    yield koltseg.delete()
    response.redirect('/egyenleg')
  }

  * ajaxSearchKoltseg (request, response) {
    var mire_darab = request.param('mire')

    const koltsegek = yield Koltseg.query()
      .where('mire', 'LIKE', `%${mire_darab}%`).fetch()

    response.ok({
      mire_items: koltsegek.toJSON().map(function (el) {
        return {
          name : el.mire
        }
      })
    })
  }

  * koltsegFeldolgozas(request, response) {
    const koltsegData = request.except('_csrf', 'kiadas', 'bevetel');
    var isKiadas = request.input('kiadas', "Nincs")

    if (isKiadas != "Nincs") {
      koltsegData.osszeg = -koltsegData.osszeg
    }

    const rules = {
      mire: 'required',
      osszeg: 'required',
      idopont: 'required|date'
    };

    const validation = yield Validator.validateAll(koltsegData, rules)



    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({errors: validation.messages()})
        .flash()
      response.redirect('back')
      return
    }

    koltsegData.user_id = request.currentUser.id
    const koltseg = yield Koltseg.create(koltsegData)
    //response.send(koltseg.toJSON())
    response.redirect('egyenleg')
  }
}

module.exports = BudzseController
