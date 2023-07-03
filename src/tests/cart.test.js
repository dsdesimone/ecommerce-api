const request = require("supertest")
const app = require('../app')
const Product = require("../models/Product")
require("../models")


const BASE_URL_USER = '/api/v1/users/login'
const URL_BASE_CART = '/api/v1/cart'
let TOKEN
let userId
let cartId
let product


beforeAll(async()=>{
    const user = {
        email: "dsdesimone8@gmail.com",
        password: "daniela1234"
    }

    const res = await request(app)
        .post(BASE_URL_USER)
        .send(user)

    TOKEN = res.body.token
    userId = res.body.user.id
})

test("POST -> 'BASE_URL_USER', should return status code 201 and res.body.quantity === body.quantity", async()=>{

    const productBody = {
        title: "Xiaomi 12",
        description: "lorem10",
        price: "189.99"
    }

    product = await Product.create(productBody)

    const cartBody = {
        quantity: 1,
        userId,
        productId:product.id
    }

    const res = await request(app)
        .post(URL_BASE_CART)
        .send(cartBody)
        .set("Authorization", `Bearer ${TOKEN}`)

    cartId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.quantity).toBe(cartBody.quantity)
})

test("GET -> 'URL_BASE_CART', should return status code 200 and res.body.length === 1", async()=>{
    const res = await request(app)
        .get(URL_BASE_CART)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(2)
})

test("PUT -> 'BASE_URL_USER/:id', should return status code 200 and res.body.quantity === body.quantity", async()=>{

    const cartBody = {
        quantity: 2
    }

    const res = await request(app)
        .put(`${URL_BASE_CART}/${cartId}`)
        .send(cartBody)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body.quantity).toBe(cartBody.quantity)
})


test("DELETE -> 'BASE_URL_USER/:id', should return status code 204", async()=>{

    const res = await request(app)
        .delete(`${URL_BASE_CART}/${cartId}`)
        .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)

    await product.destroy()
})