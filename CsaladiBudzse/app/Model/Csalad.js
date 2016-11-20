'use strict'

const Lucid = use('Lucid')

class Csalad extends Lucid {

  static get table () {
    return 'csaladok'
  }

  tagok () {
    return this.hasMany('App/Model/User')
  }
}

module.exports = Csalad
