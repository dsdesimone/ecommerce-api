const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const Purchase = require("./Purchase");
const User = require("./User");

//Product -> //categoryId
Product.belongsTo(Category)
Category.hasMany(Product)

//Cart -> //userId
Cart.belongsTo(User)
User.hasOne(Cart)

//Cart -> //productId
Cart.belongsTo(Product)
Product.hasMany(Cart)

//Purchase -> //productId
Purchase.belongsTo(User)
User.hasMany(Purchase)

//Purchase -> //userId
Purchase.belongsTo(User)
User.hasMany(Purchase)