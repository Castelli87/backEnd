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
                const { username, password, location, firstName, lastName, email, phoneNumber, img } = response.body.updatedUser;
                expect(username).toBe("changed")
                expect(password).toBe("password5")
                expect(location).toEqual({
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
            .patch("/users/648733606b77da2cfea3e774")
            .send({})
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual('missing required fields')
            })
    })
    test("GET - status: 400 respond with correct error message if end point is not valid", () => {
        return request(app)
            .patch("/users/nonsense")
            .send({ username: "changed" })
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe("bad request");
            });
    });
    test("GET - status: 404 respond with correct error message if valid id but does not exist yet ", () => {
        return request(app)
            .patch("/users/648733606b77da2cfea3e776")
            .send({ username: "changed" })
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toBe("request not found");
            });
    });
    test('to GET status 400 if try and update with an wrong invalid value', () => {
        return request(app)
            .patch("/users/648733606b77da2cfea3e774")
            .send({ firstName: [] })
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toBe('invalid request');
            })
    })
})


describe.only("/vans/:id", () => {
    test("PATCH- STATUS: 200 - to patch an existing van in the data base ", () => {
        return request(app)
            .patch("/vans/64873c83768e970eec9aa22c")
            .send({ description: "changed" })
            .then((response) => {
                const { vanName, owner, description, make, model, year, location, pricePerNight, amenities, availabilityDates, images, sleeps } = response.body.updatedVan;
                expect(vanName).toBe("Sea Change");
                expect(owner).toBe("648733606b77da2cfea3e772");
                expect(description).toBe("changed");
                expect(make).toBe("Ford");
                expect(model).toBe("Transit");
                expect(year).toBe(2023);
                expect(location).toEqual({
                    region: "birmingham",
                    postcode: "b929ed",
                  });
                expect(pricePerNight).toBe(40);
                expect(amenities).toEqual(["kitchen", "sun roof", "dining area",  "air conditioning",
                "camping chairs"]);
                expect(availabilityDates.startDate.slice(0, 10)).toEqual("2023-09-01"
                );
                expect(images).toEqual([
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8wKy1lKY3Wx2cPvKVs1lUWVnltoy4V2YOsw&usqp=CAU",
                    "https://www.woodstockcampers.co.uk/wp-content/uploads/2022/10/thumbnail_IMG_4963-scaled.jpg",
                    "https://www.knaus.com/fileadmin/media/global/open-graphs/camper-van/ktg-knaus-camper-van-uebersicht-opengraph.jpg",
                  ]);
                expect(sleeps).toBe(3);

            })
    })

test('to GET status 400 if try and update with an empty object', () => {
    return request(app)
        .patch("/vans/64873c83768e970eec9aa22c")
        .send({})
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toEqual('missing required fields')
        })
})
test("GET - status: 400 respond with correct error message if end point is not valid", () => {
    return request(app)
        .patch("/vans/nonsense")
        .send({ description: "changed" })
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe("bad request");
        });
});
test("GET - status: 404 respond with correct error message if valid id but does not exist yet ", () => {
    return request(app)
        .patch("/vans/64873c83768e970eec9aa22d")
        .send({ description: "changed" })
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe("request not found");
        });
});
test.only('to GET status 400 if try and update with an wrong invalid value', () => {
    return request(app)
        .patch("/vans/64873c83768e970eec9aa22c")
        .send({availabilityDates:'string'})
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('invalid request');
        })
})
})