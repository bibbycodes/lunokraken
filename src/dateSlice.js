const axios = require('axios')

beginTime = Date.now()

data = axios.get('http://localhost:5000/api/prices/all').then(data => {
    currentTimestamp = Date.now()

    const oneHour = 60 * 60 * 1000
    const oneDay = 24 * oneHour
    const oneWeek = 7 * oneDay
    const oneMonth = 30 * oneDay

    let weekData = []
    let dayData = []
    let hourData = []

    for (i = 0; i < data.data.length; i++) {
        entryTime = new Date(data.data[i].timestamp).getTime()
        if (currentTimestamp - entryTime < oneDay ) {
            dayData.push(data.data[i])
        }
        if (currentTimestamp - entryTime < oneWeek ) {
            weekData.push(data.data[i])
        }
        if (currentTimestamp - entryTime < oneHour ) {
            hourData.push(data.data[i])
        }
    }

    timeTaken = (Date.now() - beginTime)
    console.log(timeTaken/1000)
    console.log(hourData.length)
    console.log(weekData.length)
})