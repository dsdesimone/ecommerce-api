const Product = require("./Product");

//Product -> //categoryId
Product.belongsTo(Category)
Category.hasMany(Product)