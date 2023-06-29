const request = require("supertest")
const app = require("../app")
require("../models")
const Category = require("../models/Category")

const BASE_URL_USERS = '/api/v1/users/login'
let TOKEN
const BASE_URL = '/api/v1/products'

let category
let productId

beforeAll(async()=>{
    const user = {
        email : "dsdesimone8@gmail.com",
        password : "daniela1234"
    }

    const res = await request(app)
        .post(BASE_URL_USERS)
        .send(user)

    TOKEN = res.body.token
})

test("POST -> 'BASE_URL' should return status code 201 and res.body.title === body.title", async()=>{

    const categoryBody = {
        name:"Tech"
    }

    category = await Category.create(categoryBody)

    const product = {
        title:"xiaomi 12",
        description:"lorem10",
        price:"189.98",
        categoryId: category.id
    }

    const res = await request(app)
        .post(BASE_URL)
        .send(product)
        .set("Authorization", `Bearer ${TOKEN}`)

    productId = res.body.id

    console.log(res.body)

    expect(res.status).toBe(201)
    expect(res.body.title).toBe(product.title)

})

// test("GET -> 'BASE_URL' should return status code 200 and res.body.length === xiaomi 12", async()=>{
//     const res = await request(app)
//         .get(BASE_URL)

//     expect(res.status).toBe(200)
//     expect(res.body.title).toHaveLength(1)
//     expect(res.body[0]).toBeDefined()
// })

// test("GET ONE -> 'BASE_URL/:id' should return status code 200 and res.body.length === xiaomi 12", async()=>{
//     const res = await request(app)
//         .get(`${BASE_URL}/${productId}`)
        
//     expect(res.status).toBe(200)
//     expect(res.body.title).toBe("xiaomi 12")
// })

// test("PUT -> 'BASE_URL/:id' should status code 204", async()=>{
//     const product = {
//         title:"Iphone 12"
//     }

//     const res = await request(app)
//         .put(`${BASE_URL}/${productId}`)
//         .send(product)
//         .set("Authorization", `Bearer ${TOKEN}`)

//     expect(res.status).toBe(200)
//     expect(res.body.title).toBe(product.title)
// })

// test("DELETE -> 'BASE_URL/:id' should return status code 204", async()=>{
//     const res = await request(app)
//         .delete(`${BASE_URL}/${productId}`)
//         .set("Authorization", `Bearer ${TOKEN}`)
            
    
//     expect(res.status).toBe(204)

//     await category.destroy()
// })