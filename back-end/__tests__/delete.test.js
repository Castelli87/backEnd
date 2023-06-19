const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const seedDatabase = require('../seed-data/seed')

require("dotenv").config();

/* Connecting to the database before each test. */
beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    /*  await seedDatabase()  */
});
afterAll(async () => {
    await mongoose.connection.close();
});


describe.only("/vans/:id", () => {
    test("DELETE- STATUS: 200 - to patch an existing van in the data base ", () => {
        return request(app)
            .delete("/vans/64873c83768e970eec9aa22c")
            .send({ description: "changed" })
            .expect(200)
            .then((response) => { 

            })
    })
})