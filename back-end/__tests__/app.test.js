const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});
afterEach(async () => {
  await mongoose.connection.close();
});
  
  /* Closing database connection after each test. */
  
  describe("/users", () => {
    test("GET - STATUS: 200 - respond with a list of users", () => {
      return request(app)
      .get("/users")
      .expect(200)
      .then((response) => {
        const users = response.body.allUsers
       users.forEach(({username, password, location, firstName, lastName, email, phoneNumber, img})=>{
        expect(typeof username).toBe('string')
        expect(typeof password).toBe('string')
        expect(typeof location).toBe('object')
        expect(typeof firstName).toBe('string')
        expect(typeof lastName).toBe('string')
        expect(typeof email).toBe('string')
        expect(typeof phoneNumber).toBe('string')
      if(img){
        expect(typeof img).toBe('string')
      }
       })
      });
      
    });
    test('GET - status: 404 respond with correct error message if end point doesnt exist', ()=>{
      return request(app)
      .get("/nonsense")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe('request not found')
    })
  })})
  

  describe("/users/:id", () => {
    test("GET - STATUS: 200 - respond with the specific user id", () => {
      return request(app)
      .get("/users/648847dd474b8491a2e59d4f")
      .expect(200)
      .then((response) => {
        expect(response.body.location).toEqual({ region: 'barnsley', postcode: 's704qr' })
        expect(response.body.username).toBe('username1')
        expect(response.body.firstName).toBe('Ezekiel')
        expect(response.body.lastName).toBe('Hawkins')
        expect(response.body.email).toBe('magna.ut@outlook.org')
        expect(response.body.password).toBe('password1')
        expect(response.body.phoneNumber).toBe('07396650881')
        expect(response.body.img).toBe('https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg')
        
        
      
    })

  })
      test('GET - status: 400 respond with correct error message if end point does not exist', ()=>{
      return request(app)
      .get("/users/nonsense")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe('bad request')
    })
})

test.only('GET - status: 404 respond with correct error message if valid id but does not exist', ()=>{
  return request(app)
  .get("/users/648847dd474b8491a2e59d55")
  .expect(404)
  .then((response) => {
    console.log(response.body);
    expect(response.body.msg).toBe('request not found')
})
})
  
})
//--detectOpenHandles