'use strict'

const Schema = use('Schema')

class JogosultsagokTableSchema extends Schema {

  up () {
    this.create('jogosultsagok', (table) => {
      table.increments()
      table.string('jnev')
      table.timestamps()
    })
  }

  down () {
    this.drop('jogosultsagok')
  }

}

module.exports = JogosultsagokTableSchema
