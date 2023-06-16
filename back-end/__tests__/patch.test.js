const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});
afterAll(async () => {
    await mongoose.connection.close();
});


describe("/users/:id", () => {
    test("PATCH- STATUS: 200 - to patch an existing user in the data base ", () => {
        return request(app)
            .patch("/users/648733606b77da2cfea3e774")
            .send({ username: "changed" })
            .then((response) => {
                const {username, password, location, firstName, lastName, email, phoneNumber, img } = response.body.updatedUser;
                expect(username).toBe("changed")
                expect(password).toBe("password5")
                expect(location).toEqual( {
                    region: "liverpool",
                    postcode: "l189tn",
                  })
                expect(firstName).toBe("Kirestin")
                expect(lastName).toBe("Frank")
                expect(email).toBe("lorem.ipsum@icloud.com")
                expect(phoneNumber).toBe("07396904444")
                expect(img).toBe("https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg")
            })
    })
    test('to GET status 400 if try and update with an empty object', () => {
        return request(app)
            .patch("/users/648ae6c925d5f38a3d67dc67")
            .send({})
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual('missing required fields')
            })
    })
    test("GET - status: 400 respond with correct error message if end point is not valid", () => {
        return request(app)
            .patch("/users/nonsense")
            .send({ username: "changedd" })
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("bad request");
            });
    });
    test("GET - status: 404 respond with correct error message if valid id but does not exist yet ", () => {
        return request(app)
          .patch("/users/648847dd474b8491a2e59d55")
          .send({ username: "changedd" })
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe("request not found");
          });
      });
    test.only('to GET status 400 if try and update with an wrong invalid value', () => {
        return request(app)
            .patch("/users/648ae6c925d5f38a3d67dc67")
            .send({firstName:4})
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe('invalid request');
            })
    })
})