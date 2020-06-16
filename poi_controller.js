'use strict';

const PoiInteractor = new require('./poi_interactor')
const interactor = new PoiInteractor()

class PoiController {

  static getPois(request, h) {
    const poi_id = request.params.poi_id ? request.params.poi_id : null

    return poi_id ? interactor.getPoiById(request.params.poi_id): interactor.getAllPois();
  }

  static createPoi(request, h) {
    return interactor.createNewPoi(request.payload)
  }

  static deletePoi(request, h) {
    return interactor.deletePoi(request.params.poi_id)
  }

  static updatePoi(request, h) {
    return interactor.updatePoi(request.params.poi_id, request.payload)
  }

}

exports.plugin = {
  name: "PoiController",
  register: async function (server, options) {

      // Create a route for example

      server.route({ method: 'GET', path: '/pois/{poi_id?}', config: { handler: PoiController.getPois }})
      server.route({ method: 'POST', path: '/pois', config: { handler: PoiController.createPoi }})
      server.route({ method: 'PUT', path: '/pois/{poi_id}', config: { handler: PoiController.updatePoi }})
      server.route({ method: 'DELETE', path: '/pois/{poi_id}', config: { handler: PoiController.deletePoi }})
  }
};