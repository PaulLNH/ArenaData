// Maps Code / Name
// 572 - RoL (Ruins of Lordaeron)
// 617 - DS (Dalaran Sewers)
// 980 - TA (Tol'Viron Arena
// 1134 - TTP (Tiger's Peak)
// 1504 - BRHA (Black Rook Hold)
// 1505 - NA (Nagrand Arena)
// 1552 - AF (Ashamane's Fall)
// 1672 - BEA (Blade's Edge Arena)
// 1825 - HP (Hook Point)
// 1911 - M (Mugambala)

let unixTimestampConverter = (timeStamp) => {
    let formattedTime = new moment.unix(timeStamp).format('YY-MM-DD HH:MM');    

    return formattedTime
};

getLabels = (points) => {
    let labels = [];
    points.forEach(point => {
        labels.push(unixTimestampConverter(point));
    });
    return labels
};

const config = {
    type: 'line',
    data: {
        labels: getLabels(pointsY),
        datasets: [{
            label: 'Your Team\'s MMR',
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: myMMR,
            fill: false,
        }
        // , {
        //     label: 'Enemy Team\'s MMR',
        //     fill: false,
        //     backgroundColor: window.chartColors.blue,
        //     borderColor: window.chartColors.blue,
        //     data: enemyMMR,
        // }
    ]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Chart.js Line Chart'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'MMR Value'
                }
            }]
        }
    }
};

window.onload = function () {
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);
};

var colorNames = Object.keys(window.chartColors);

$("#importBtn").on('click', clickEvent => {
    clickEvent.preventDefault();
    const csvData = $("#csvData").val();
    getMMRDataPointsFromCSV(csvData);
});

async function getMMRDataPointsFromCSV(csv) {
    try {
        let dataPoints = await parseCSVdata(csv);
        let myLineChart = await new Chart(ctx, {
            type: 'line',
            data: dataPoints,
            options: options
        });
    } catch (err) {
        // catches errors both in fetch and response.json
        console.error(`The following error: ${err}`);
    }
};

parseCSVdata = (csv) => {
    let dataPoints = csvLines = points = [];
    csvLines = csv.split(/[\r?\n|\r|\n]+/);

    for (let i = 0; i < csvLines.length; i++)
        if (csvLines[i].length > 0) {
            points = csvLines[i].split(";");
            dataPoints.push({
                x: parseFloat(points[0]),
                y: parseFloat(points[12])
            });
        }
    return dataPoints
};