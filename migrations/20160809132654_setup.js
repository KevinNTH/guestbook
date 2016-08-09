exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments()
    table.string('email')
    table.string('password')
    table.string('first_name')
    table.string('last_name')
    table.dateTime('created_at')
    table.dateTime('updated_at')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
}
