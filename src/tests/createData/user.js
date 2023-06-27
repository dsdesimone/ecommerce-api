const user = async()=>{

    const userCreate = {
       firstName:"Daniela",
       lastName:"De Simone",
       email:"dsdesimone8@gmail.com",
       password:"daniela1234",
       phone:"1164351302" 
    }

    await user.create(userCreate)

}

module.exports = user