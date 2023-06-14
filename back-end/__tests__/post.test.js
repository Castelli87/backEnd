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

describe("/users", () => {
    test("POST - STATUS: 201 - to post a new user object to the data base", () => {
        return request(app)
            .post("/users")
            .send({
                username: "username61",
                password: "password6",
                location: {
                    region: "york",
                    postcode: "yo231ex",
                },
                firstName: "davide",
                lastName: "Holls",
                email: "davideholls61.ut@outlook.org",
                phoneNumber: "07396650001",
                img:
                    "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg",
            })
            .expect(201)
            .then((response) => {
                const { username, password, location, firstName, lastName, email, phoneNumber, img } = response.body.newUser;
                expect(username).toBe("username61")
                expect(password).toBe("password6")
                expect(location).toEqual({
                    region: "york",
                    postcode: "yo231ex",
                })
                expect(firstName).toBe("davide")
                expect(lastName).toBe("Holls")
                expect(email).toBe("davideholls61.ut@outlook.org")
                expect(phoneNumber).toBe("07396650001")
                expect(img).toBe("https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg")

            })
    })
    test('to GET status 400 if try to post an empty user object', () => {
        return request(app)
            .post("/users")
            .send({})
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual('invalid request')
            })
    })
    test("GET - status: 404 respond with correct error message if end point is not valid", () => {
        return request(app)
            .post("/nonsense")
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe("request not found");
            });
    });
})