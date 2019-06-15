const prices = require('./routes/api/prices.js')
const axios = require('axios')

function addEntry() {
    data = axios.get('http://localhost:5000/api/prices/add')
    .then(data => console.log(data.data))
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

//setInterval(updatePrices, 300000)
function updatePricesPeriodically(lastUpdateTimestamp = 0) {
    fiveMinutes = 1000 * 60 //* 5
    currentTime = Date.now()
    timeSinceLastUpdate = currentTime - lastUpdateTimestamp

        if (timeSinceLastUpdate >= fiveMinutes) {
            console.log(`last update more than 5 minutes ago, time since last update: ${timeSinceLastUpdate} `)
            console.log("Updating DB")

            axios.get('http://localhost:5000/api/prices/last')
            .then((res) => {
                console.log(res.data[0])
                lastUpdateTimestamp = Date.now()
                console.log(lastUpdateTimestamp)
                return lastUpdateTimestamp})
            .then((lastUpdate) => { 
                console.log("last update took place at: ")
                console.log(lastUpdate)
                addEntry()
                updatePricesPeriodically(lastUpdate)
            })
        } else {
            timeSinceLastUpdate = (Date.now() - lastUpdateTimestamp) / (1000 * 60)
            console.log(`time since last update less than 5 minutes: ${timeSinceLastUpdate}`)
            console.log(`Sleeping for : ${fiveMinutes - timeSinceLastUpdate}`)
            
            sleep(fiveMinutes - timeSinceLastUpdate).then(() => {
                updatePricesPeriodically(lastUpdateTimestamp)
              })
        }
}


/*
function updatePricesPeriodically(lastUpdateTimestamp = 0) {
    currentTime = Date.now()
    return axios.get('http://localhost:5000/api/prices/last')
    .then(res => {
        lastUpdateTimestamp = Date.parse(res.data[0].timestamp)
        return lastUpdateTimestamp
        
    })
    .then(() => {
        if (currentTime - lastUpdateTimestamp >= fiveMinutes) {
            timeSinceLastUpdate = (Date.now() - lastUpdateTimestamp) / (1000 * 60)
            console.log(`time since last update: ${timeSinceLastUpdate}`)
            console.log('Adding Entry To DB')
            updatePrices().then(() => {
                updatePricesPeriodically()
            })

        } else {
            timeSinceLastUpdate = (Date.now() - lastUpdateTimestamp) / (1000 * 60)
            console.log(`time since last update: ${timeSinceLastUpdate}`)
            sleep(fiveMinutes - (currentTime - lastUpdateTimestamp)).then(() => {
                updatePricesPeriodically()
              })
        }
    })
}
*/
updatePricesPeriodically(0)