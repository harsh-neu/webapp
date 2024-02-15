const superTest = require('supertest');
const {server,app} = require('../app');
// const {db,connectDb} = require('../src/model');
const { faker } = require('@faker-js/faker');
require('dotenv').config();
const Sequelize = require("sequelize");


const db = process.env.DB || 'demoDb'
const dbUser = process.env.USER_NAME || "harsh"
const  dbPassword = process.env.PASSWORD || "harsh" 
const port = process.env.port || 3306

const sequelize =  new Sequelize(db,dbUser,dbPassword,{
    dialect :'mysql',
    logging: false
})
const user = {
    firstName :faker.person.firstName(),
    lastName : faker.person.lastName(),
    emailId: faker.internet.email(),
    password: faker.internet.password()
}
describe("test_user_apis" , ()=>{

    beforeAll(async()=>{
       await sequelize.sync({force:false});

    });
   
    it("should create user in the db, and return proper values", async()=>{
    
         const user1 = await superTest(app)
        .post('/v1/user')
        .send(user)
        .expect(201)
    })

    it("should get the user created in the db", async()=>{

        const user1 = await superTest(app)
        .get('/v1/user/self')
        .set("Authorization", "basic " +  Buffer(`${user.emailId}:${user.password}`).toString("base64"))
        .expect(200)

        expect(user1.body.emailId).toEqual(`${user.emailId}`)

    })

})

describe("test_update_apis" , ()=>{

    beforeAll(async()=>{
         sequelize.sync({force:false});
    });
    afterAll(async() => {
       
         server.close();
    })
    it("should update user in the db, and return proper values", async()=>{
        const firstName = "xyz";
         const user1 = await superTest(app)
        .put('/v1/user/self')
        .set("Authorization", "basic " +  Buffer(`${user.emailId}:${user.password}`).toString("base64"))
        .send({firstName})
        .expect(204)
        
    })

    it("should get the user updated in the db", async()=>{

        const user1 = await superTest(app)
        .get('/v1/user/self')
        .set("Authorization", "basic " +  Buffer(`${user.emailId}:${user.password}`).toString("base64"))
        .expect(200)

        expect(user1.body.firstName).toEqual('xyz')

    })

})

