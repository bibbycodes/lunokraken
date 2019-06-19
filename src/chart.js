var ctx = document.getElementById('btcChart').getContext('2d');

var dummyData1 =  [];
var dummyData2 = [];
dataLoadIncrement = 400
oneYear = 365 * 24 * 60
oneMonth = 30 * 24 * 60
oneDay = 24 * 60 //288 data points
oneHour = 60

var labels = []
//populate with dummy data
for(i=0; i < oneYear/dataLoadIncrement; i++) {
    dummyData1.push((Math.random() * (10000 - 9000)) + 9000)
    dummyData2.push((Math.random() * (10000 - 9000)) + 9000 - (Math.random() * 20))
    labels.push((i+1).toString())
}

var chart = new Chart(ctx, {
    type: 'line',
    data : {
        labels: labels,
        datasets: [
            {
            label: 'BTC NGN',
            borderColor: 'violet',
            data: dummyData1.slice()
        },
        {
            label: 'BTC USD',
            borderColor: 'blue',
            data: dummyData2
        },
    ]
    }
})

function changeRange(range) {
    var endIndex
    var startIndex

    if(range === 'hour') {
        startIndex = dummyData1.length - (oneHour/5)
        endIndex = dummyData1.length
        dataLoadIncrement = 5
    }
    if(range === 'day') {
        startIndex = dummyData1.length - (oneDay/5)
        endIndex = dummyData1.length
        dataLoadIncrement = 50
        
    }
    if(range === 'month') {
        startIndex = dummyData1.length - (oneMonth/5)
        endIndex = dummyData1.length
        dataLoadIncrement = 200
    }
    if(range === 'year') {
        startIndex = 0
        endIndex = dummyData1.length
        dataLoadIncrement = 400
    }
    chart.data.datasets[0].data = dummyData1.slice(startIndex, endIndex)
    chart.data.datasets[1].data = dummyData2.slice(startIndex, endIndex)
    console.log(chart.data.datasets[0].data)
    console.log(chart.data.datasets[1].data)
    chart.data.labels = labels.slice(startIndex,endIndex)
    chart.update()
}



