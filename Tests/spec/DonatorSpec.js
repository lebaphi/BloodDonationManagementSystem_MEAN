var Client = require('node-rest-client').Client;
var client = new Client();

var baseURL = "http://localhost:3000";
var donatorId;
var args = {
    data:  {firstname:"First", lastname:"Last",phone:"+840000000000",email:"test@email.com",bloodGroup:"O",
        coordinates: {lat:10.8042183, lng:106.6836485}, address: "5 Thích Quảng Đức, phường 4, Phú Nhuận, Hồ Chí Minh, Vietnam"},
    headers: { "Content-Type": "application/json" }
};


describe('Test Donator Funtionality', function() {

    it('should add the donator success', function(done) {
        client.post(baseURL + "/api/donators",args, function (data, response) {
            donatorId = data._id;
            expect(response.statusCode).toEqual(200);
            done();
        });
    });

    it('should get the donator success', function(done) {
        client.get(baseURL + "/api/donators/"+donatorId, function (data, response) {
            expect(response.statusCode).toEqual(200);
            expect(data.firstname).toEqual(args.data.firstname);
            expect(data.lastname).toEqual(args.data.lastname);
            expect(data.phone).toEqual(args.data.phone);
            expect(data.email).toEqual(args.data.email);
            expect(data.bloodGroup).toEqual(args.data.bloodGroup);
            expect(data.coordinates.lat).toEqual(args.data.coordinates.lat);
            expect(data.coordinates.lng).toEqual(args.data.coordinates.lng);
            done();
        });
    });

    args.data.firstname = "First Updated";
    args.data.bloodGroup = "AB";

    it('should update the donator success', function(done) {
        client.put(baseURL + "/api/donators/"+donatorId, args, function (data, response) {
            expect(response.statusCode).toEqual(200);
            expect(data.firstname).toEqual(args.data.firstname);
            expect(data.lastname).toEqual(args.data.lastname);
            expect(data.phone).toEqual(args.data.phone);
            expect(data.email).toEqual(args.data.email);
            expect(data.bloodGroup).toEqual(args.data.bloodGroup);
            expect(data.coordinates.lat).toEqual(args.data.coordinates.lat);
            expect(data.coordinates.lng).toEqual(args.data.coordinates.lng);
            done();
        });
    });

    it('should delete the donator success', function(done) {
        client.delete(baseURL + "/api/donators/"+donatorId, function (data, response) {
            expect(response.statusCode).toEqual(200);
            client.get(baseURL + "/api/donators/"+donatorId, function (data, response) {
                expect(response.statusCode).toEqual(404);
                expect(data.error).toEqual("Donator not found");
                done();
            });
        });
    });
});