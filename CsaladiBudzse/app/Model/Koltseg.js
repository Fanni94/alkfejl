'use strict'

const Lucid = use('Lucid')

class Koltseg extends Lucid {

  static get table () {
    return 'koltsegek'
  }

  user () {
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Koltseg
