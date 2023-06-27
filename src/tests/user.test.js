const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/users'
//let TOKEN = "DASDA"

test("GET -> 'URL_BASE', should return status code 200 and res.body to have length 1", async()=>{
    const res = await request(app)
        .get(BASE_URL)
        //.set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLEngth(1)
})