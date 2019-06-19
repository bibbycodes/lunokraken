const express = require('express')
const router = express.Router()
const axios = require('axios')
const Price = require('../../models/prices')

// @route prices api/prices/add
// @desc get latest price from luno and kraken apis, save to database
// @access public
router.get('/add',  (req, res) => {
    const prices = getPrices()
    prices.then( data => {
        const price = new Price({
            BTCNGN: data.BTCNGN,
            BTCUSD: data.BTCUSD,
            USDNGN: 360,
            timestamp: data.timestamp
        })
        console.log("adding all data to db:", data)
        price.save()
        //.then(price => res.json(price))
        .then(price => res.send(price))
    })
})

function getPrices() {
    const lunoPair = 'XBTNGN'
    const lunoServer = 'https://api.mybitx.com/api/1/ticker?pair=XBTNGN'
    const krakenPair = 'XXBTZUSD'
    const krakenServer = 'https://api.kraken.com/0/public/Ticker?pair=XXBTZUSD'
    var lunoData
    var krakenData

    return axios.get("https://api.mybitx.com/api/1/ticker?pair=XBTNGN")
    .then(res => {
        lunoData = {
            pair: 'BTCNGN',
            date : res.data.timestamp,
            price : res.data.last_trade,
            bid: res.data.bid,
            ask: res.data.ask
        } 
        return lunoData;
    })
    .then( (lunoData) => {
        return axios.get(krakenServer)
        .then(res => {
            krakenData = {
                pair: 'BTCUSD',
                date: Date.parse(res.headers.date),
                price: res.data.result.XXBTZUSD.o
            }
            return {
                BTCNGN: lunoData.price,
                BTCUSD: krakenData.price,
                USDNGN: 360,
                timestamp: Date.now()
            }
        })
    })

    .catch(err => console.log(err))
}
// @route prices api/prices/luno
// @desc get latest price from luno api
// @access public

router.get('/luno', (req,res) => {
    const lunoPair = 'XBTNGN'
    const lunoServer = 'https://api.mybitx.com/api/1/ticker?pair=XBTNGN'
    var lunoData

    return axios.get(lunoServer)
        .then(res => {
            lunoData = {
                pair: 'BTCNGN',
                timestamp : res.data.timestamp,
                price : res.data.last_trade,
                bid: res.data.bid,
                ask: res.data.ask
            } 
            console.log(lunoData)
            return lunoData
            })    
        //.then(lunoData => res.json(lunoData))
        .then(lunoData => res.send(lunoData))
        .catch(err => console.log(err))
    })
// @route prices api/prices/kraken
// @desc get latest price from kraken api
// @access public

router.get('/kraken', (req,res) => {
    const krakenPair = 'XXBTZUSD'
    const krakenServer = 'https://api.kraken.com/0/public/Ticker?pair=XXBTZUSD'
    var krakenData

    return axios.get(krakenServer)
        .then(res => {
            krakenData = {
                pair: 'BTCUSD',
                timestamp: Date.parse(res.headers.date),
                price: res.data.result.XXBTZUSD.o
            }
            console.log(krakenData)
            return krakenData
            })
        //.then(krakenData => res.json(krakenData))
        .then(krakenData => res.send(krakenData))
        .catch(err => console.log(err))
    })
// @route prices api/prices/all
// @desc Get All Prices
// @access Public
router.get('/all', (req,res)=> {
    Price.find()
    .sort({ timestamp: -1})
    .then(prices => res.json(prices))
})

router.get('/last', (req, res) => {
    Price.find()
    .limit(1)
    .sort({$natural:-1})
    .then(lastPrice => res.json(lastPrice))
})

module.exports = router

