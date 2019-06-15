const express = require('express')
const router = express.Router()
const axios = require('axios')
const Price = require('../../models/prices')

router.get('/',  (req, res) => {
    const prices = getPrices()

    prices.then( data => {
        console.log("full data", data)

        const price = new Price({
            BTCNGN: data.BTCNGN,
            BTCUSD: data.BTCUSD,
            USDNGN: 360,
            timestamp: data.timestamp
        })
        price.save()
        .then(price => res.json(price))
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

        console.log("luno data", lunoData);
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
                timestamp: Date.now()
            }
        })
    })

    .catch(err => console.log(err))
}

router.get('/luno', (req,res) => {
    const lunoPair = 'XBTNGN'
    const lunoServer = 'https://api.mybitx.com/api/1/ticker?pair=XBTNGN'
    var lunoData

    return axios.get(lunoServer)
        .then(res => {
            lunoData = {
                pair: 'BTCNGN',
                date : res.data.timestamp,
                price : res.data.last_trade,
                bid: res.data.bid,
                ask: res.data.ask
            } 
            return lunoData
            })    
        //.then(lunoData => res.json(lunoData))
        .then(lunoData => res.send(lunoData))
        .catch(err => console.log(err))
    })

router.get('/kraken', (req,res) => {
    const krakenPair = 'XXBTZUSD'
    const krakenServer = 'https://api.kraken.com/0/public/Ticker?pair=XXBTZUSD'

    var krakenData

    return axios.get(krakenServer)
        .then(res => {
            krakenData = {
                pair: 'BTCUSD',
                date: Date.parse(res.headers.date),
                price: res.data.result.XXBTZUSD.o
            }
            return krakenData
            })
        //.then(krakenData => res.json(krakenData))
        .then(krakenData => res.send(krakenData))
        .catch(err => console.log(err))

    res.send(krakenData)
    })

    module.exports = router