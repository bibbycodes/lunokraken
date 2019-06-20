var ctx = document.getElementById('btcChart').getContext('2d');

var dummyDataLuno =  [];
var dummyDataKraken = [];
var dataLoadIncrement = 5
const oneYear = 365 * 24 * 60
const oneMonth = 30 * 24 * 60
const oneDay = 24 * 60 //288 data points
const oneHour = 60

var labels = []
var initialDataLuno = []
var initialDataKraken = []

//make with dummy data
for(i=0; i < oneYear/dataLoadIncrement; i++) {
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1
    value = (Math.random() * (1000)) + 9000

    dummyDataLuno.push(value)
    dummyDataKraken.push(value + plusOrMinus * 100)

    if (i % 365 == 0) {
        initialDataLuno.push(dummyDataLuno[i])
        initialDataKraken.push(dummyDataKraken[i])
        labels.push((i+1).toString())
    }
    
}

var chart = new Chart(ctx, {
    type: 'line',
    data : {
        labels: labels,
        datasets: [
            {
            label: 'BTC NGN',
            borderColor: 'violet',
            data: initialDataLuno
        },
        {
            label: 'BTC USD',
            borderColor: 'blue',
            data: initialDataKraken
        },
    ]
    }
})

function changeRange(range) {
    var endIndex
    var startIndex

    if(range === 'hour') {
        startIndex = dummyDataLuno.length - (oneHour/dataLoadIncrement)
        endIndex = dummyDataLuno.length
        chart.data.datasets[0].data = dummyDataLuno.slice(startIndex, endIndex)
        chart.data.datasets[1].data = dummyDataKraken.slice(startIndex, endIndex)
        chart.data.labels = [1,2,3,4,5,6,7,8,9,10,11,12]
    }

    if(range === 'day') {
        startIndex = dummyDataLuno.length - (oneDay/dataLoadIncrement)
        endIndex = dummyDataLuno.length
        chart.data.datasets[0].data = dummyDataLuno.slice(startIndex, endIndex)
        chart.data.datasets[1].data = dummyDataKraken.slice(startIndex, endIndex)   
    }

    if(range === 'month') {
        startIndex = dummyDataLuno.length - (oneMonth/dataLoadIncrement)
        endIndex = dummyDataLuno.length
        var tempMonthDataLuno = dummyDataLuno.slice(startIndex,endIndex)
        var tempMonthDataKraken = dummyDataKraken.slice(startIndex,endIndex)
        var monthDataKraken = []
        var monthDataLuno = []
        var monthLabels = []

        for(i = 0; i < tempMonthDataKraken.length; i++){
            if (i % 30 == 0) {
                monthDataLuno.push(tempMonthDataLuno[i])
                monthDataKraken.push(tempMonthDataKraken[i])
                monthLabels.push(i.toString())
            }
        }

        console.log(monthDataKraken)
        chart.data.datasets[0].data = monthDataLuno
        chart.data.datasets[1].data = monthDataKraken
        chart.data.labels = monthLabels
    }

    if(range === 'year') {
        var yearDataLuno = []
        var yearDataKraken = []
        //chart.data.labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

        for(i = 0; i < dummyDataLuno.length; i++){
            if (i % 365 == 0) {
                yearDataLuno.push(dummyDataLuno[i])
                yearDataKraken.push(dummyDataKraken[i])

            }
        }
        chart.data.datasets[0].data = yearDataLuno
        chart.data.datasets[1].data = yearDataKraken
    }
    
    console.log(chart.data.datasets[0].data)
    console.log(chart.data.datasets[1].data)
    //chart.data.labels = labels.slice(startIndex,endIndex)
    chart.update()
}



