const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const seedDatabase = require('../seed-data/seed')

require("dotenv").config();


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

describe('GET /api', () => {
  test('GET - STATUS:200 - respond with an json object containing a description of the end points, what queries can be made and an example response', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then((response) => {
        const epObject = response.body.endPoints["GET /users"];
        expect(typeof epObject).toEqual('object');
        expect(epObject.hasOwnProperty('description')).toBe(true);
        expect(epObject.hasOwnProperty('queries')).toBe(true);
        expect(epObject.hasOwnProperty('exampleResponse')).toBe(true);

      })
  })
})

describe("GET /users", () => {
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
  test("GET - STATUS: 404 - respond with correct error message if end point is not valid", () => {
    return request(app)
      .get("/nonsense")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("request not found");
      });
  });
});

describe("GET /users/:id", () => {
  test("GET - STATUS: 200 - respond with the specific user id", () => {
    return request(app)
      .get("/users/648733606b77da2cfea3e770")
      .expect(200)
      .then((response) => {
        const {
          location,
          username,
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          img,
        } = response.body.userById;
        //we are getting back even the vans that the owner own 
        //we are getting back even the bookings of this user 
        console.log(response.body.bookings)
        expect(location).toEqual({
          region: "barnsley",
          postcode: "s704qr",
        });
        expect(username).toBe("username1");
        expect(firstName).toBe("Ezekiel");
        expect(lastName).toBe("Hawkins");
        expect(email).toBe("magna.ut@outlook.org");
        expect(password).toBe("password1");
        expect(phoneNumber).toBe("07396650881");
        expect(img).toBe(
          "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
        );
      });
  });
  test("GET - STATUS: 400 - respond with correct error message if end point is not valid", () => {
    return request(app)
      .get("/users/nonsense")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
  test("GET - STATUS: 404 - respond with correct error message if valid id but does not exist yet ", () => {
    return request(app)
      .get("/users/648847dd474b8491a2e59d55")
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe("request not found");
      });
  });
});

describe("GET /vans", () => {
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
  test("GET - STATUS: 404 - respond with correct error message if end point is not valid", () => {
    return request(app)
      .get("/nonsense")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("request not found");
      });
  });
});

describe("GET /vans/:id", () => {
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
        expect(availabilityDates.startDate.slice(0, 10)).toBe("2023-07-01");
        expect(pricePerNight).toBe(50);
        expect(sleeps).toBe(2);
        expect(images).toEqual([
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8wKy1lKY3Wx2cPvKVs1lUWVnltoy4V2YOsw&usqp=CAU",
          "https://media.gq-magazine.co.uk/photos/5e74910306bab00008958011/16:9/pass/20200320-VW-Electric-03.jpg",
          "https://vanlifeadventure.com/wp-content/uploads/2019/06/vanlife-adventure-kepler-sixty-vw-camper-california-05.jpg",
        ]);
      });
  });
  test("GET - STATUS: 400 - respond with correct error message if end point is not valid", () => {
    return request(app)
      .get("/vans/nonsense")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
  test("GET - STATUS: 404 - respond with correct error message if valid id but does not exist yet ", () => {
    return request(app)
      .get("/vans/648847dd474b8491a2e59d55")
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe("request not found");
      });
  });
});

describe("GET /vans/:id/reviews", () => {
  test("GET - STATUS: 200 - responds with a list of reviews for van id", () => {
    return request(app)
      .get("/vans/64873c83768e970eec9aa22a/reviews")
      .expect(200)
      .then((response) => {
        const reviews = response.body.reviews;
        reviews.forEach(({ userId, vanId, rating, comment, createdAt }) => {
          expect(typeof userId).toBe("object");
          expect(typeof vanId).toBe("string");
          expect(typeof rating).toBe("number");
          expect(typeof createdAt).toBe("string");
          if (comment) {
            expect(typeof comment).toBe("string");
          }
        });
      });
  });
  test("GET - STATUS: 200 - reviews sorted by newest first, responds with correct review", () => {
    return request(app)
      .get("/vans/64873c83768e970eec9aa22a/reviews")
      .expect(200)
      .then((response) => {
        const reviews = response.body.reviews;
        const oldestReview = reviews[reviews.length - 1];
        const { userId, vanId, rating, comment } = oldestReview;

        expect(userId._id).toBe("648733606b77da2cfea3e774");
        expect(vanId).toBe("64873c83768e970eec9aa22a");
        expect(rating).toBe(10);
        expect(comment).toBe(
          "Absolutely loved our experience with the Volkswagen California campervan! It was spacious, comfortable, and had all the amenities we needed for our road trip. The pop-up roof provided extra headroom, and the fully equipped kitchenette made cooking on the go a breeze. The campervan was in excellent condition, and the rental process was smooth. Highly recommend this campervan for anyone seeking adventure and comfort!"
        );
      });
  });
  test("GET - STATUS: 400 - respond with correct error message if end point is not valid", () => {
    return request(app)
      .get("/vans/nonsense/reviews")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
  test("GET - STATUS: 404 - respond with correct error message if valid id but does not exist yet ", () => {
    return request(app)
      .get("/vans/648847dd474b8491a2e59d55/reviews")
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe("request not found");
      });
  });
  test("GET - STATUS: 200 - responds with an empty array ", () => {
    return request(app)
      .get("/vans/64873c83768e970eec9aa22c/reviews")
      .expect(200)
      .then((response) => {

        expect(response.body.reviews).toEqual([]);
      });
  })
});

describe("GET /bookings", () => {
  test("GET - STATUS: 200 - responds with a list of bookings with required properties", () => {
    return request(app).get("/bookings").then(({ body }) => {
      body.bookings.forEach(({ userId, vanId, startDate, endDate, totalCost, paymentDetails }) => {
        expect(typeof userId).toBe("string");
        expect(typeof vanId).toBe("string");
        expect(typeof startDate).toBe("string");
        expect(typeof endDate).toBe("string");
        expect(typeof totalCost).toBe("number");
        expect(typeof paymentDetails).toBe("string");
      })
    })
  })
})

describe("GET /bookings/:booking_id", () => {
  test("GET - STATUS: 200 - and expect booking values to be as expected.", () => {
    return request(app).get("/bookings/648b2d2cbd34fabd752b0b05").expect(200).then(({ body }) => {
      const { userId, vanId, startDate, endDate, totalCost, paymentDetails } = body.booking;

      expect(userId).toBe("648733606b77da2cfea3e774")
      expect(vanId).toBe("64873c83768e970eec9aa22a")
      expect(startDate.slice(0, 10)).toBe("2023-08-01")
      expect(endDate.slice(0, 10)).toBe("2023-08-03")
      expect(totalCost).toBe(100)
      expect(paymentDetails).toBe("unpaid")
    })
  })
  test("GET - STATUS: 400 - bad request if the id is not a valid string", () => {
    return request(app).get("/bookings/648b19").expect(400).then(({ body }) => {
      expect(body.msg).toBe("bad request");
    })
  })
  test("GET - STATUS: 400 - Not Found error if the id does not exist in the database", () => {
    return request(app).get("/bookings/648b19c7b62d2ba61de8a6f7").expect(404).then(({ body }) => {
      expect(body.msg).toBe("request not found")
    })
  })
  test("GET - STATUS: 404 - respond with correct error message if end point is not valid", () => {
    return request(app)
      .get("/nonsense")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("request not found");
      });
  });
})

describe("POST /users", () => {
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
  test('POST - STATUS: 400 - if try to post an empty user object', () => {
    return request(app)
      .post("/users")
      .send({})
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('invalid request')
      })
  })
  test("POST - STATUS: 404 - respond with correct error message if end point is not valid", () => {
    return request(app)
      .post("/nonsense")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("request not found");
      });
  });
})

describe("POST /vans", () => {
  test("POST - STATUS: 201 - to post a new van object to the data base", () => {
    return request(app)
      .post("/vans")
      .send({
        vanName: "the traveller",
        owner: "648733606b77da2cfea3e770",
        description:
          "The Volkswagen California is an ideal choice for your next adventure. ",
        make: "Volkswagen",
        model: "California",
        year: 2021,
        location: {
          region: "leeds",
          postcode: "ls118lu",
        },
        pricePerNight: 30,
        amenities: ["kitchen", "sun roof", "dining area"],
        availabilityDates: {
          startDate: "2023-07-01",
          endDate: "2024-07-01",
        },
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8wKy1lKY3Wx2cPvKVs1lUWVnltoy4V2YOsw&usqp=CAU",
          "https://media.gq-magazine.co.uk/photos/5e74910306bab00008958011/16:9/pass/20200320-VW-Electric-03.jpg",
          "https://vanlifeadventure.com/wp-content/uploads/2019/06/vanlife-adventure-kepler-sixty-vw-camper-california-05.jpg",
        ],
        sleeps: 2,
      })
      .expect(201)
      .then((response) => {
        const { vanName, owner, description, make, model, year, location, pricePerNight, amenities, availabilityDates, images, sleeps } = response.body.newVan;
        expect(vanName).toBe("the traveller");
        expect(owner).toBe("648733606b77da2cfea3e770");
        expect(description).toBe("The Volkswagen California is an ideal choice for your next adventure. ");
        expect(make).toBe("Volkswagen");
        expect(model).toBe("California");
        expect(year).toBe(2021);
        expect(location).toEqual({
          region: "leeds",
          postcode: "ls118lu",
        });
        expect(pricePerNight).toBe(30);
        expect(amenities).toEqual(["kitchen", "sun roof", "dining area"]);
        expect(availabilityDates.startDate.slice(0, 10)).toEqual("2023-07-01"
        );
        expect(images).toEqual([
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8wKy1lKY3Wx2cPvKVs1lUWVnltoy4V2YOsw&usqp=CAU",
          "https://media.gq-magazine.co.uk/photos/5e74910306bab00008958011/16:9/pass/20200320-VW-Electric-03.jpg",
          "https://vanlifeadventure.com/wp-content/uploads/2019/06/vanlife-adventure-kepler-sixty-vw-camper-california-05.jpg",
        ]);
        expect(sleeps).toBe(2);

      })
  })
  test('POST - STATUS: 400 - if try to post an empty van object', () => {
    return request(app)
      .post("/vans")
      .send({})
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('invalid request')
      })
  })
  test("POST - STATUS: 404 - respond with correct error message if end point is not valid", () => {
    return request(app)
      .post("/nonsense")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("request not found");
      });
  });
})

describe("POST /:owner/vans", () => {
  test("POST - STATUS: 201 - to post a new van object to the data base", () => {
    return request(app)
      .post("/6489a266b97c6dfb06b758f1/vans")
      .send({
        vanName: "the bell bus",
        description:
          "The bell bus is a great. ",
        make: "Volkswagen",
        model: "California",
        year: 2021,
        location: {
          region: "york",
          postcode: "yo231ex",
        },
        pricePerNight: 30,
        amenities: ["kitchen", "sun roof", "dining area"],
        availabilityDates: {
          startDate: "2023-07-01",
          endDate: "2024-07-01",
        },
        images: [
          "https://vanlifeadventure.com/wp-content/uploads/2019/06/vanlife-adventure-kepler-sixty-vw-camper-california-05.jpg",
        ],
        sleeps: 2,
      })
      .then((response) => {
        const { vanName, owner, description, make, model, year, location, pricePerNight, amenities, availabilityDates, images, sleeps } = response.body.newVan;
        expect(vanName).toBe("the bell bus");
        expect(owner).toBe("6489a266b97c6dfb06b758f1");
        expect(description).toBe("The bell bus is a great. ");
        expect(make).toBe("Volkswagen");
        expect(model).toBe("California");
        expect(year).toBe(2021);
        expect(location).toEqual({
          region: "york",
          postcode: "yo231ex",
        });
        expect(pricePerNight).toBe(30);
        expect(amenities).toEqual(["kitchen", "sun roof", "dining area"]);
        expect(availabilityDates.startDate.slice(0, 10)).toEqual("2023-07-01"
        );
        expect(images).toEqual([
          "https://vanlifeadventure.com/wp-content/uploads/2019/06/vanlife-adventure-kepler-sixty-vw-camper-california-05.jpg",
        ]);
        expect(sleeps).toBe(2);

      })
  })
  test('POST - STATUS: 400 - if try to post an empty van object', () => {
    return request(app)
      .post("/6489a266b97c6dfb06b758f1/vans")
      .send({})
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('invalid request')
      })
  })
  test("POST - STATUS: 400 - respond with correct error message if the id is not valid", () => {
    return request(app)
      .post("/nonsense/vans")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("invalid request");
      });
  });
  test("POST - STATUS: 404 - respond with correct error message if end point is not valid", () => {
    return request(app)
      .post("/nonsense")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("request not found");
      });
  });
  test('POST - STATUS: 400 - if try to post a object with incorrect data types', () => {
    return request(app)
      .post("/6489a266b97c6dfb06b758f1/vans")
      .send({
        vanName: 3000,
        description:
          3000,
        make: 3000,
        model: 3000,
        year: 'string',
        location: {
          region: "york",
          postcode: "yo231ex",
        },
        pricePerNight: 'string',
        amenities: 3000,
        availabilityDates: {
          startDate: "2023-07-01",
          endDate: "2024-07-01",
        },
        images: 3000,
        sleeps: 'string',
      })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('invalid request')
      })
  })

})

describe("POST /bookings", () => {
  test("POST - STATUS: 201 - to post a new booking object to the data base", () => {
    return request(app)
      .post("/bookings")
      .send({
        userId: "648733606b77da2cfea3e774",
        vanId: "64873c83768e970eec9aa22a",
        startDate: "2023-09-01",
        endDate: "2023-09-03",
        totalCost: 100,
        paymentDetails: "unpaid",
      })
      .expect(201)
      .then((response) => {
        const { userId, vanId, startDate, endDate, totalCost, paymentDetails } = response.body.newBooking;
        expect(userId).toBe("648733606b77da2cfea3e774");
        expect(vanId).toBe("64873c83768e970eec9aa22a");
        expect(startDate.slice(0, 10)).toBe("2023-09-01");
        expect(endDate.slice(0, 10)).toBe("2023-09-03");
        expect(totalCost).toBe(100);
        expect(paymentDetails).toBe("unpaid");
      })
  })
  test('POST - STATUS: 400 - if try to post an empty booking object', () => {
    return request(app)
      .post("/bookings")
      .send({})
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('invalid request')
      })
  })
  test('POST - STATUS: 400 - if try to post an booking object with incorrect data types', () => {
    return request(app)
      .post("/bookings")
      .send({
        userId: "648733606b77da2cfea3e774",
        vanId: "64873c83768e970eec9aa22a",
        startDate: 3000,
        endDate: 3000,
        totalCost: 'one hundred',
        paymentDetails: 3000,
      })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('invalid request')
      })
  })
  test("POST - STATUS: 404 - respond with correct error message if end point is not valid", () => {
    return request(app)
      .post("/nonsense")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("request not found");
      });
  });
})

describe("POST /reviews", () => {
  test("POST - STATUS: 201 - to post a new review object to the data base", () => {
    return request(app)
      .post("/vans/64873c83768e970eec9aa22a/reviews")
      .send({
        userId: "648733606b77da2cfea3e774",
        rating: 1,
        comment: 'rubbish'
      })
      .expect(201)
      .then((response) => {
        const { userId, vanId, rating, comment } = response.body.newReview;

        expect(userId).toBe("648733606b77da2cfea3e774");
        expect(vanId).toBe("64873c83768e970eec9aa22a");
        expect(rating).toBe(1);
        expect(comment).toBe("rubbish");
      })
  })
  test('POST - STATUS: 201 - if try to post an review without a comment', () => {
    return request(app)
      .post("/vans/64873c83768e970eec9aa22a/reviews")
      .send({
        userId: "648733606b77da2cfea3e774",
        rating: 1,

      })
      .expect(201)
      .then((response) => {
        const { rating, userId } = response.body.newReview;
        expect(rating).toBe(1);
        expect(userId).toBe("648733606b77da2cfea3e774")

      })
  })
  test('POST - STATUS: 400 - if try to post an empty review object', () => {
    return request(app)
      .post("/vans/64873c83768e970eec9aa22a/reviews")
      .send({})
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('invalid request')
      })
  })
  test("POST - STATUS: 404 - respond with correct error message if end point is not valid", () => {
    return request(app)
      .post("/vans/64873c83768e970eec9aa22a/nonsense")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("request not found");
      });
  });
})

describe("PATCH /users/:id", () => {
  test("PATCH- STATUS: 200 - to patch an existing user in the data base ", () => {
    return request(app)
      .patch("/users/648733606b77da2cfea3e774")
      .send({ username: "changed" })
      .expect(200)
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
  test('PATCH- STATUS: 400 - if try and update with an empty object', () => {
    return request(app)
      .patch("/users/648733606b77da2cfea3e774")
      .send({})
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('missing required fields')
      })
  })
  test("PATCH- STATUS: 400 - respond with correct error message if end point is not valid", () => {
    return request(app)
      .patch("/users/nonsense")
      .send({ username: "changed" })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
  test("PATCH- STATUS: 404 - respond with correct error message if valid id but does not exist yet ", () => {
    return request(app)
      .patch("/users/648733606b77da2cfea3e776")
      .send({ username: "changed" })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("request not found");
      });
  });
  test('PATCH- STATUS: 400 - if try and update with an wrong invalid value', () => {
    return request(app)
      .patch("/users/648733606b77da2cfea3e774")
      .send({ firstName: [] })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('invalid request');
      })
  })
})

describe("PATCH /vans/:id", () => {
  test("PATCH- STATUS: 200 - to patch an existing van in the data base ", () => {
    return request(app)
      .patch("/vans/64873c83768e970eec9aa22c")
      .send({ description: "changed" })
      .expect(200)
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
        expect(amenities).toEqual(["kitchen", "sun roof", "dining area", "air conditioning",
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
  test('PATCH- STATUS: 400 - if try and update with an empty object', () => {
    return request(app)
      .patch("/vans/64873c83768e970eec9aa22c")
      .send({})
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('missing required fields')
      })
  })
  test("PATCH- STATUS: 400 - respond with correct error message if end point is not valid", () => {
    return request(app)
      .patch("/vans/nonsense")
      .send({ description: "changed" })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
  test("PATCH- STATUS: 404 - respond with correct error message if valid id but does not exist yet ", () => {
    return request(app)
      .patch("/vans/64873c83768e970eec9aa22d")
      .send({ description: "changed" })
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("request not found");
      });
  });
  test('PATCH- STATUS: 400 - if try and update with an wrong invalid value', () => {
    return request(app)
      .patch("/vans/64873c83768e970eec9aa22c")
      .send({ availabilityDates: 'string' })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('invalid request');
      })
  })
})



describe("GET /vans queries", () => {
  test("GET - STATUS: 200 - and filters van by make query", () => {
    return request(app).get("/vans?make=Volkswagen").expect(200).then(response => {
      const vans = response.body.allVans;
      vans.forEach(van => expect(van.make).toBe("Volkswagen"));
    })
  })
  
  test("GET - STATUS: 200 - and filters van by model", () => {
    return request(app).get("/vans?model=Sprinter").expect(200).then(response => {
      const vans = response.body.allVans;
      
      vans.forEach((van) => {
        expect(van.model).toBe("Sprinter");
      })
    })
  })
  
  test("GET - STATUS: 200 - filters location by region", () => {
    return request(app).get("/vans?region=Portsmouth").expect(200).then(response => {
      const vans = response.body.allVans;
      
      vans.forEach(van => {
        expect(van.location.region).toBe("Portsmouth");
      })
    })
  })
  
  test("GET - STATUS: 200 - filters location by postcode", () => {
    return request(app).get("/vans?postcode=b929ed").expect(200).then(response => {
      const vans = response.body.allVans;
      
      vans.forEach(van => {
        expect(van.location.postcode).toBe("b929ed");
      })
    })
  })
  
  test("GET - STATUS: 200 - filters by beds / sleeps", () => {
    return request(app).get("/vans?sleeps=3").expect(200).then(response => {
      const vans = response.body.allVans;
      
      vans.forEach(van => {
        expect(van.sleeps).toBe(3);
      })
    })
  })
  
  test("GET - STATUS: 200 - filters price per night gt or equal to 50", () => {
    return request(app).get("/vans?pricePerNightgte=50").expect(200).then(response => {
      const vans = response.body.allVans;
      
      vans.forEach(van => {
        expect(van.pricePerNight >= 50).toBe(true);
      })
    })
  })
  
  test("GET - STATUS: 200 - filters price per night lt or equal to 50", () => {
    return request(app).get("/vans?pricePerNightlte=50").expect(200).then(response => {
      const vans = response.body.allVans;
      
      vans.forEach(van => {
        expect(van.pricePerNight <= 50).toBe(true);
      })
    })
  })
  
  test("GET - STATUS: 200 - works with 2 filters", () => {
    return request(app).get("/vans?pricePerNightgte=50&region=birmingham").expect(200).then(response => {
      const vans = response.body.allVans;
      
      vans.forEach(van => {
        expect(van.pricePerNight <= 50).toBe(true);
        expect(van.region).toBe("birmingham");
        })
      })
    })
  })
  describe("POST /login", () => {
    test('POST - STATUS: 201 - if correct username and password is used', () => {
      return request(app)
        .post("/login")
        .send({ username: 'username1', password: 'password1' })
        .expect(200)
        .then((response) => {
          const {
            location,
            username,
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            img,
          } = response.body.user;
          const message = response.body.message;
          expect(message).toBe('Login successful')
          expect(location).toEqual({
            region: "barnsley",
            postcode: "s704qr",
          });
          expect(username).toBe("username1");
          expect(firstName).toBe("Ezekiel");
          expect(lastName).toBe("Hawkins");
          expect(email).toBe("magna.ut@outlook.org");
          expect(password).toBe("password1");
          expect(phoneNumber).toBe("07396650881");
          expect(img).toBe(
            "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
          );
        });
      });
      test('POST - STATUS: 401 - if incorrect username or password is used return correct error message ', () => {
        return request(app)
        .post("/login")
        .send({ username: 'username1', password: 'password2' })
        .expect(401)
        .then((response) => {
          const message = response.body.message;
          expect(message).toBe('Invalid credentials')
        })
    })
    test('POST - STATUS: 401 - if the user does not exist return correct error message', () => {
      return request(app)
      .post("/login")
      .send({ username: 'invalid', password: 'password2' })
      .expect(401)
      .then((response) => {
        const message = response.body.message;
        expect(message).toBe('Invalid credentials')
      })
    })
  })
  describe("/vans/:id", () => {
    test("DELETE - STATUS: 200 - to delete an existing van in the data base ", () => {
        return request(app)
            .delete("/vans/64873c83768e970eec9aa22a")
            .expect(200)
            .then((response) => { 
            const {message}= response.body;
            expect(message).toBe('van deleted')
            })
    })
    test("DELETE - STATUS: 400 - respond with correct error message if end point is not valid", () => {
      return request(app)
        .delete("/vans/nonsense")
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("bad request");
        });
    });
    test("DELETE - STATUS: 404 - respond with correct error message if valid id but does not exist yet ", () => {
      return request(app)
        .delete("/vans/648847dd474b8491a2e59d55")
        .expect(404)
        .then((response) => {
          expect(response.body.error).toBe("request not found");
        });
      })
  })
  // test("GET - STATUS: 200 - works with 2 gte and lte for value", () => {
  //   return request(app).get("/vans").expect(200).then( response => {
    //     const vans = response.body.allVans;
    
    //     vans.forEach( van => {
      //       expect(van.pricePerNight <= 60).toBe(true);
      //       expect(van.pricePerNight >= 50).toBe(true);
      //     })
      //   })
      // })
      // })
      
      