exports.up = function(knex) {
    return knex.schema
        .createTable('pois', function(table) {
            table.increments().primary()
            table.string('name', 255).notNullable()
            table.integer('x').notNullable()
            table.integer('y').notNullable()
        })
}

exports.down = function(knex) {
    return knex.schema.dropTable('pois')
}