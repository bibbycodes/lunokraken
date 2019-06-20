const mongoose = require('mongoose')

const PricesSchema = new mongoose.Schema({
    LunoPrice: {type:Number, trim: false, default:0},
    KrakenPrice: {type:Number, trim: false, default:0},
    timestamp : {type:Date, default: Date.now}
})

// const YearSchema = new mongoose.Schema({
//     LunoMonthAverage: {type:Number, trim: false, default:0},
//     KrakenMonthAverage: {type:Number, trim: false, default:0},
//     timestamp : {type:Date, default: Date.now}
// })

// const MonthSchema = new mongoose.Schema({
//     LunoWeekAverage: {type:Number, trim: false, default:0},
//     KrakenWeekAverage: {type:Number, trim: false, default:0},
//     timestamp : {type:Date, default: Date.now}
// })

// const WeekSchema = new mongoose.Schema({
//     LunoDayAverage: {type:Number, trim: false, default:0},
//     KrakenDayAverage: {type:Number, trim: false, default:0},
//     timestamp : {type:Date, default: Date.now}
// })

// const DaySchema = new mongoose.Schema({
//     LunoHourkAverage: {type:Number, trim: false, default:0},
//     KrakenHourAverage: {type:Number, trim: false, default:0},
//     timestamp : {type:Date, default: Date.now}
// })

module.exports = Prices = mongoose.model('Prices', PricesSchema)