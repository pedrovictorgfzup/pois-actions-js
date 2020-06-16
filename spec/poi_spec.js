
const PoiInteractor = new require('../poi_interactor')

describe("Poi interactor", () => {
    var interactor = null
    var id_to_be_deleted = null

    beforeAll(() => {
        interactor = new PoiInteractor()
    }) 

    it("should retrieve all pois", (done) => {
        interactor.getAllPois().then((result) => {
            expect(result.length).toBe(4)
            done()
        })
    })

    it("should get a poi by id", (done) => {
        interactor.getPoiById(1).then((result) => {
            expect(result.id).toBe(1)
            done()
        })
    })

    it("should create a new poi", (done) => {
        interactor.createNewPoi({"name":"testpoi", "x":0, y:0}).then((id) => {
            expect(id).not.toBe(null)
            id_to_be_deleted = id[0]
            done()
        })
    })

    it("should update an existing poi", (done) => {
        fields_to_be_updated = {"name":"new poi name"}
        interactor.updatePoi(id_to_be_deleted, fields_to_be_updated).then((result) => {
            expect(result[0]["name"]).toBe(fields_to_be_updated["name"])
            done()
        })
    })

    it("should delete a poi", (done) => {
        interactor.deletePoi(id_to_be_deleted).then((result) => {
            expect(result).not.toBe(null)
            done()
        })
    })
})