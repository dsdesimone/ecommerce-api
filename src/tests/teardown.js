const sequelize = require('../utils/connection');
require("../models")

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await sequelize.close()
        console.log("Database reset successfully")
        process.exit();
    } catch(error){
        console.log(error);
    }
 }

module.exports = main