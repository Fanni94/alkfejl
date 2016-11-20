'use strict'

const Lucid = use('Lucid')

class Jogosultsag extends Lucid {
  static get table () {
    return 'jogosultsagok'
  }

  users () {
    return this.belongsToMany('App/Model/User')
  }
}

module.exports = Jogosultsag
