const express = require('express')
const router = express.Router()
const axios = require('axios')
const Price = require('../../models/prices')

router.post('/latest',  (req, res) => {
    const data = getPrices()
    const price = new Price({
        BTCNGN: data.BTCNGN,
        BTCUSD: data.BTCUSD,
        timestamp: data.timestamp
    })
    price.save()
    .then(price => res.json(price))
})

function getPrices() {
    const lunoPair = 'XBTNGN'
    const lunoServer = 'https://api.mybitx.com/api/1/ticker?pair=XBTNGN'
    const krakenPair = 'XXBTZUSD'
    const krakenServer = 'https://api.kraken.com/0/public/Ticker?pair=XXBTZUSD'
    var lunoData
    var krakenData

    axios.get("https://api.mybitx.com/api/1/ticker?pair=XBTNGN")
    .then(res => {
        lunoData = {
            pair: 'BTCNGN',
            date : res.data.timestamp,
            price : res.data.last_trade,
            bid: res.data.bid,
            ask: res.data.ask
        } 
        console.log(lunoData)
        })
    .catch(err => console.log(err))

    axios.get(krakenServer)
    .then(res => {
        krakenData = {
            pair: 'BTCUSD',
            date: Date.parse(res.headers.date),
            price: res.data.result.XXBTZUSD.o
        }
        console.log(krakenData)
        })
    .catch(err => console.log(err))

    return {
        BTCNGN: lunoData.price,
        BTCUSD: krakenData.price,
        timestamp: Date.now()
    }
}

router.get('/luno', (req,res) => {
    const lunoPair = 'XBTNGN'
    const lunoServer = 'https://api.mybitx.com/api/1/ticker?pair=XBTNGN'
    var lunoData

    axios.get("https://api.mybitx.com/api/1/ticker?pair=XBTNGN")
        .then(res => {
            lunoData = {
                pair: 'BTCNGN',
                date : res.data.timestamp,
                price : res.data.last_trade,
                bid: res.data.bid,
                ask: res.data.ask
            } 
            console.log(lunoData)
            })
        .catch(err => console.log(err))

    res.send(lunoData)
    })

router.get('/kraken', (req,res) => {
    const krakenPair = 'XXBTZUSD'
    const krakenServer = 'https://api.kraken.com/0/public/Ticker?pair=XXBTZUSD'

    var krakenData

    axios.get(krakenServer)
        .then(res => {
            krakenData = {
                pair: 'BTCUSD',
                date: Date.parse(res.headers.date),
                price: res.data.result.XXBTZUSD.o
            }
            console.log(krakenData)
            })
        .catch(err => console.log(err))

    res.send(krakenData)
    })

    module.exports = router
    console.log(getPrices())