
const knex = require('./db/knex')

class PoiInteractor {

    constructor() {

    }

    getAllPois() {
        return knex.from("pois").select("*").then((pois) => {
            return pois
          })
    }

    getPoiById(poi_id) {
        return knex.from("pois").select("*").where('id', '=', poi_id)
        .then((poi) => {
          return poi[0]
        })
    }

    createNewPoi(new_poi) {
        return knex.from('pois').insert(new_poi).returning('id').then((id) => {
            return id
        })
    }

    updatePoi(poi_id, fields_to_be_updated) {
        return knex.from('pois').where('id', '=', poi_id).update(fields_to_be_updated, Object.keys(fields_to_be_updated)).then((fields_updated) => {
            return fields_updated
          })
    }

    deletePoi(poi_id) {
        return knex.from('pois').select('*').where('id', '=', poi_id).del().then((number_of_rows_affected) => {
            console.log(number_of_rows_affected)
            return "success"
          }).catch((err) => { console.log( err); throw err })
    }

    findPoisInsideRadius(x, y) {

    }
}

module.exports = PoiInteractor