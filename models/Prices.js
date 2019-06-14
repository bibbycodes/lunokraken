const mongoose = require('mongoose')

const PricesSchema = new mongoose.Schema({
    BTCNGN: {type:Number, trim: false, default:0},
    BTCUSD: {type:Number, trim: false, default:0},
    timestamp : {type:Date, default: Date.now}
})

module.exports = Prices = mongoose.model('Prices', PricesSchema)