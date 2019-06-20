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
    let monthData = []

    for (i = 0; i < data.data.length; i++) {
        let entryTime = new Date(data.data[i].timestamp).getTime()
        if (currentTimestamp - entryTime < oneDay ) {
            dayData.push(data.data[i])
        }
        if (currentTimestamp - entryTime < oneWeek ) {
            weekData.push(data.data[i])
        }
        if (currentTimestamp - entryTime < oneMonth ) {
            monthData.push(data.data[i])
        }
    }

    // almost working....
    let splitDay = []

    //for each hour of the day
    for (i = 0; i < 24; i ++) {
        
        // init segment
        let segment = {
            AverageLuno : 0,
            AverageKraken : 0
        }
        
        //init counter
        let counter = 0

        //for each data point
        for (j = 0; j < dayData.length; j++ ) {

            let iterationTime = new Date(dayData[j].timestamp).getTime()

            //first hour
            if (i == 0 && currentTimestamp - iterationTime <= oneHour) {
                segment.AverageLuno += dayData[j].LunoPrice
                segment.AverageKraken += dayData[j].KrakenPrice
                counter ++
                
            }
            //second hour
            if (i == 1 && currentTimestamp -iterationTime <= (oneHour * (2)) && (currentTimestamp - iterationTime) >= oneHour) {
                segment.AverageLuno += dayData[j].LunoPrice
                segment.AverageKraken += dayData[j].KrakenPrice
                counter ++
            }
            //third hour to 24th hour
            if (i > 1 && currentTimestamp - iterationTime <= (oneHour * (i+1)) && (currentTimestamp - iterationTime >= oneHour * (i-1))){
                segment.AverageLuno += dayData[j].LunoPrice
                segment.AverageKraken += dayData[j].KrakenPrice
                counter ++
            }       
        }

        //push to array average of vals
        splitDay.push({
            LunoPrice : (segment.AverageLuno) / counter,
            KrakenPrice : (segment.AverageKraken) / counter
        })

    }

    console.log(splitDay)

                                            //splitting week into days
    // let splitWeek = []

    // for (i=0; i < weekData.length; i++) {
        

    //     if (currentTimestamp - weekData[i].timestamp <= oneDay) {
    //         splitWeek.dayOne.push(weekData[i])
    //     }
    //     if ((currentTimestamp - weekData[i].timestamp) <= (oneDay * 2) && (currentTimestamp - weekData[i].timestamp) >= oneDay ){
    //         splitWeek.dayTwo.push(weekData[i])
    //     }
    //     if ((currentTimestamp - weekData[i].timestamp) <= (oneDay * 3) && (currentTimestamp - weekData[i].timestamp) >= (oneDay * 2) ){
    //         splitWeek.dayTwo.push(weekData[i])
    //     }
    //     if ((currentTimestamp - weekData[i].timestamp) <= (oneDay * 4) && (currentTimestamp - weekData[i].timestamp) >= (oneDay * 3) ){
    //         splitWeek.dayTwo.push(weekData[i])
    //     }
    //     if ((currentTimestamp - weekData[i].timestamp) <= (oneDay * 5) && (currentTimestamp - weekData[i].timestamp) >= (oneDay * 4) ){
    //         splitWeek.dayTwo.push(weekData[i])
    //     }
    //     if ((currentTimestamp - weekData[i].timestamp) <= (oneDay * 6) && (currentTimestamp - weekData[i].timestamp) >= (oneDay * 5) ){
    //         splitWeek.dayTwo.push(weekData[i])
    //     }
    //     if ((currentTimestamp - weekData[i].timestamp) <= (oneDay * 7) && (currentTimestamp - weekData[i].timestamp) >= (oneDay * 6) ){
    //         splitWeek.dayTwo.push(weekData[i])
    //     }
    // }









    // for (i = 0; i < dayData.length; i++ ) {

    //     if (currentTimestamp - dayData[i].timestamp <= oneHour) {
    //         splitDay.One.push(dayData[i])
    //     }
    //     if ((currentTimestamp - dayData[i].timestamp) <= (oneHour * 2) && (currentTimestamp - weekData[i].timestamp) >= oneHour ){
    //         splitHour.One.push(dayData[i])
    //     }
    //     if ((currentTimestamp - dayData[i].timestamp) <= (oneHour * 3) && (currentTimestamp - weekData[i].timestamp) >= (oneHour * 2) ){
    //         splitHour.Two.push(dayData[i])
    //     }
    //     if ((currentTimestamp - dayData[i].timestamp) <= (oneHour * 4) && (currentTimestamp - weekData[i].timestamp) >= (oneHour * 3) ){
    //         splitHour.Three.push(dayData[i])
    //     }
    //     if ((currentTimestamp - dayData[i].timestamp) <= (oneHour * 5) && (currentTimestamp - weekData[i].timestamp) >= (oneHour * 4) ){
    //         splitHour.Four.push(dayData[i])
    //     }
    //     if ((currentTimestamp - dayData[i].timestamp) <= (oneHour * 6) && (currentTimestamp - weekData[i].timestamp) >= (oneHour * 5) ){
    //         splitHour.Five.push(dayData[i])
    //     }
    //     if ((currentTimestamp - dayData[i].timestamp) <= (oneHour * 7) && (currentTimestamp - weekData[i].timestamp) >= (oneHour * 6) ){
    //         splitHour.Six.push(dayData[i])
    //     }
    //     if ((currentTimestamp - dayData[i].timestamp) <= (oneHour * 7) && (currentTimestamp - weekData[i].timestamp) >= (oneHour * 6) ){
    //         splitHour.Seven.push(dayData[i])
    //     }
    //     if ((currentTimestamp - dayData[i].timestamp) <= (oneHour * 7) && (currentTimestamp - weekData[i].timestamp) >= (oneHour * 6) ){
    //         splitHour.Eight.push(dayData[i])
    //     }
    //     if ((currentTimestamp - dayData[i].timestamp) <= (oneHour * 7) && (currentTimestamp - weekData[i].timestamp) >= (oneHour * 6) ){
    //         splitHour.Nine.push(dayData[i])
    //     }
    //     if ((currentTimestamp - dayData[i].timestamp) <= (oneHour * 7) && (currentTimestamp - weekData[i].timestamp) >= (oneHour * 6) ){
    //         splitHour.Ten.push(dayData[i])
    //     }
    //     if ((currentTimestamp - dayData[i].timestamp) <= (oneHour * 7) && (currentTimestamp - weekData[i].timestamp) >= (oneHour * 6) ){
    //         splitHour.Eleven.push(dayData[i])
    //     }
    //     if ((currentTimestamp - dayData[i].timestamp) <= (oneHour * 7) && (currentTimestamp - weekData[i].timestamp) >= (oneHour * 6) ){
    //         splitHour.Twelve.push(dayData[i])
    //     }
    //     if ((currentTimestamp - dayData[i].timestamp) <= (oneHour * 7) && (currentTimestamp - weekData[i].timestamp) >= (oneHour * 6) ){
    //         splitHour.Thirteen.push(dayData[i])
    //     }        
    //     if ((currentTimestamp - dayData[i].timestamp) <= (oneHour * 7) && (currentTimestamp - weekData[i].timestamp) >= (oneHour * 6) ){
    //         splitHour.Fourteen.push(dayData[i])
    //     }
    //     if ((currentTimestamp - dayData[i].timestamp) <= (oneHour * 7) && (currentTimestamp - weekData[i].timestamp) >= (oneHour * 6) ){
    //         splitHour.Sixteen.push(dayData[i])
    //     }
    //     if ((currentTimestamp - dayData[i].timestamp) <= (oneHour * 7) && (currentTimestamp - weekData[i].timestamp) >= (oneHour * 6) ){
    //         splitHour.Eighteen.push(dayData[i])
    //     }
    //     if ((currentTimestamp - dayData[i].timestamp) <= (oneHour * 7) && (currentTimestamp - weekData[i].timestamp) >= (oneHour * 6) ){
    //         splitHour.Nineteen.push(dayData[i])
    //     }
    //     if ((currentTimestamp - dayData[i].timestamp) <= (oneHour * 7) && (currentTimestamp - weekData[i].timestamp) >= (oneHour * 6) ){
    //         splitHour.Twenty.push(dayData[i])
    //     }
    //     if ((currentTimestamp - dayData[i].timestamp) <= (oneHour * 7) && (currentTimestamp - weekData[i].timestamp) >= (oneHour * 6) ){
    //         splitHour.Sixteen.push(dayData[i])
    //     }
    //     if ((currentTimestamp - dayData[i].timestamp) <= (oneHour * 7) && (currentTimestamp - weekData[i].timestamp) >= (oneHour * 6) ){
    //         splitHour.Seventeen.push(dayData[i])
    //     }
    // }

    // console.log(splitDay)
    // timeTaken = (Date.now() - beginTime)
    // console.log(timeTaken/1000)
    // console.log(hourData)
})