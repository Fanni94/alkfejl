'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }
  csalad () {
    return this.belongsTo('App/Model/Csalad')
  }

  koltsegek () {
    return this.hasMany('App/Model/Koltseg')
  }

  jogosultsagok () {
    return this.belongsToMany('App/Model/Jogosultsag')
  }
}

module.exports = User
