
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pois')
  .del()
  .then(function () {
      // Inserts seed entries
      return knex('pois').insert([
        {name: "First poi", x: 10, y: 15},
        {name: "Second poi", x: 15, y: 13},
        {name: "Third poi", x: 17, y: 14},
      ]);
    });
};
