'use strict'

const Schema = use('Schema')

class KoltsegekTableSchema extends Schema {

  up () {
    this.create('koltsegek', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('mire')
      table.timestamp('idopont')
      table.integer('osszeg')
      table.timestamps()
    })
  }

  down () {
    this.drop('koltsegek')
  }

}

module.exports = KoltsegekTableSchema
