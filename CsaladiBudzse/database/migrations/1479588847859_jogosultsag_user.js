'use strict'

const Schema = use('Schema')

class JogosultsagUserTableSchema extends Schema {

  up () {
    this.create('jogosultsag_user', (table) => {
      table.increments()
      table.integer('jogosultsag_id').unsigned().references('id').inTable('jogosultsagok')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('jogosultsag_user')
  }

}

module.exports = JogosultsagUserTableSchema
