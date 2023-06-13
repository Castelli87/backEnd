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

/* Closing database connection after each test. */

describe("/users", () => {
  test("GET - STATUS: 200 - respond with a list of users", () => {
    return request(app)
      .get("/users")
      .expect(200)
      .then((response) => {
        const users = response.body.allUsers;
        users.forEach(
          ({
            username,
            password,
            location,
            firstName,
            lastName,
            email,
            phoneNumber,
            img,
          }) => {
            expect(typeof username).toBe("string");
            expect(typeof password).toBe("string");
            expect(typeof location).toBe("object");
            expect(typeof firstName).toBe("string");
            expect(typeof lastName).toBe("string");
            expect(typeof email).toBe("string");
            expect(typeof phoneNumber).toBe("string");
            if (img) {
              expect(typeof img).toBe("string");
            }
          }
        );
      });
  });
  test("GET - status: 404 respond with correct error message if end point is not valid", () => {
    return request(app)
      .get("/nonsense")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("request not found");
      });
  });
});

describe("/users/:id", () => {
  test("GET - STATUS: 200 - respond with the specific user id", () => {
    return request(app)
      .get("/users/648847dd474b8491a2e59d4f")
      .expect(200)
      .then((response) => {
        expect(response.body.location).toEqual({
          region: "barnsley",
          postcode: "s704qr",
        });
        expect(response.body.username).toBe("username1");
        expect(response.body.firstName).toBe("Ezekiel");
        expect(response.body.lastName).toBe("Hawkins");
        expect(response.body.email).toBe("magna.ut@outlook.org");
        expect(response.body.password).toBe("password1");
        expect(response.body.phoneNumber).toBe("07396650881");
        expect(response.body.img).toBe(
          "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
        );
      });
  });
  test("GET - status: 400 respond with correct error message if end point is not valid", () => {
    return request(app)
      .get("/users/nonsense")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });

  test("GET - status: 404 respond with correct error message if valid id but does not exist yet ", () => {
    return request(app)
      .get("/users/648847dd474b8491a2e59d55")
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe("request not found");
      });
  });
});

describe("/vans", () => {
  test("GET - STATUS: 200 - respond with a list of vans", () => {
    return request(app)
      .get("/vans")
      .expect(200)
      .then((response) => {
        
        const vans = response.body.allVans;
        vans.forEach(
          ({
            vanName,
            description,
            owner,
            make,
            model,
            year,
            location,
            amenities,
            availabilityDates,
            pricePerNight,
            sleeps,
            images,
          }) => {
            expect(typeof vanName).toBe("string");
            expect(typeof description).toBe("string");
            expect(typeof owner).toBe("string");
            expect(typeof make).toBe("string");
            expect(typeof model).toBe("string");
            expect(typeof year).toBe("number");
            expect(typeof location).toBe("object");
            expect(Array.isArray(amenities)).toBe(true);
            expect(typeof availabilityDates).toBe("object");
            expect(typeof pricePerNight).toBe("number");
            expect(typeof sleeps).toBe("number");
            expect(Array.isArray(images)).toBe(true);
          }
        );
      });
  });
  test("GET - status: 404 respond with correct error message if end point is not valid", () => {
    return request(app)
      .get("/nonsense")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("request not found");
      });
  });
});

describe("/vans/:id", () => {
  test("GET - STATUS: 200 - respond with a list of vans", () => {
    return request(app)
      .get("/vans/64873c83768e970eec9aa22a")
      .expect(200)
      .then((response) => {
        const {
          vanName,
          description,
          owner,
          make,
          model,
          year,
          location,
          amenities,
          availabilityDates,
          pricePerNight,
          sleeps,
          images,
        } = response.body;

        expect(vanName).toBe("The Voyager");
        expect(description).toBe(
          "The Volkswagen California is a versatile and comfortable campervan that offers a perfect blend of functionality and style. It is an ideal choice for your next adventure. "
        );
        expect(owner).toBe("648733606b77da2cfea3e770");
        expect(make).toBe("Volkswagen");
        expect(model).toBe("California");
        expect(year).toBe(2022);
        expect(location.region).toBe("barnsley");
        expect(amenities[1]).toBe("sun roof");
        expect(availabilityDates.startDate.slice(0,10)).toBe("2023-07-01");
        expect(pricePerNight).toBe(50);
        expect(sleeps).toBe(2);
        expect(images).toEqual([
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8wKy1lKY3Wx2cPvKVs1lUWVnltoy4V2YOsw&usqp=CAU",
          "https://media.gq-magazine.co.uk/photos/5e74910306bab00008958011/16:9/pass/20200320-VW-Electric-03.jpg",
          "https://vanlifeadventure.com/wp-content/uploads/2019/06/vanlife-adventure-kepler-sixty-vw-camper-california-05.jpg",
        ]);
      });
  });
  test("GET - status: 400 respond with correct error message if end point is not valid", () => {
    return request(app)
      .get("/vans/nonsense")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
  test("GET - status: 404 respond with correct error message if valid id but does not exist yet ", () => {
    return request(app)
      .get("/vans/648847dd474b8491a2e59d55")
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe("request not found");
      });
  });
});
//--detectOpenHandles
