const User = require('../../models/User')

const user = async()=>{

    const userCreate = {
       firstName:"Daniela",
       lastName:"De Simone",
       email:"dsdesimone8@gmail.com",
       password:"daniela1234",
       phone:"1164351302" 
    }

    await User.create(userCreate)

}

module.exports = user