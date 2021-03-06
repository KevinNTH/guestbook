const tableName = 'users'

exports.up = function (knex, Promise) {
  return knex.schema.createTable(tableName, function (table) {
    table.increments()
    table.string('email').unique()
    table.string('password')
    table.string('firstName')
    table.string('lastName')
    table.dateTime('createdAt')
    table.dateTime('updatedAt')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable(tableName)
}
