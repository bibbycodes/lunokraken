const axios = require('axios')
const cron = require('node-cron') 

function addEntry() {
    data = axios.get('http://localhost:5000/api/prices/add')
    .then(data => console.log(data.data))
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

function updatePricesPeriodically(lastUpdateTimestamp = 0) {
    fiveMinutes = 1000 * 60 * 5
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
            console.log(`Sleeping for : ${(fiveMinutes - timeSinceLastUpdate)/(1000 * 60)}`)

            sleep(fiveMinutes - timeSinceLastUpdate).then(() => {
                updatePricesPeriodically(lastUpdateTimestamp)
              })
        }
}

var task = cron.schedule('*/5 * * * *', () => {
    addEntry()
});
task.start()