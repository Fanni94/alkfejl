'use strict'

const Schema = use('Schema')

class CsaladokTableSchema extends Schema {

  up () {
    this.create('csaladok', (table) => {
      table.increments()
      table.string('nev')
      table.string('reg_link')
      table.timestamps()
    })
  }

  down () {
    this.drop('csaladok')
  }

}

module.exports = CsaladokTableSchema
