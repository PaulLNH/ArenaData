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

var dataPoints = [];

$("#importBtn").on('click', clickEvent => {
    clickEvent.preventDefault();
    console.log("Import button has been clicked.");
    const csvData = $("#csvData").val();
    const MMRdataPoints = getMMRDataPointsFromCSV(csvData);
    console.log(MMRdataPoints);
    renderMMRCandlestick(MMRdataPoints);
    // renderMap(RoL, DS, TA, TTP, BRHA, NA, AF, BEA, HP, M);
});

function getMMRDataPointsFromCSV(csv) {
    var dataPoints = csvLines = points = [];
    csvLines = csv.split(/[\r?\n|\r|\n]+/);

    for (var i = 0; i < csvLines.length; i++)
        if (csvLines[i].length > 0) {
            points = csvLines[i].split(";");
            dataPoints.push({
                x: parseFloat(points[0]),
                y: parseFloat(points[12])
            });
        }
    return dataPoints;
};

function renderMMR(data) {
    var chart = new CanvasJS.Chart("MMRChartContainer", {
        animationEnabled: true,
        title: {
            text: `MMR Gain / Loss Over ${data.length-1} Games`,
        },
        axisX: {
            title: "Time"
        },
        axisY: {
            title: "MMR"
        },
        data: [{
            type: "line",
            xValueType: "dateTime",
            xValueFormatString: "DD MMM hh:mm TT",
            yValueFormatString: "####",
            dataPoints: data
        }]
    });

    chart.render();
};

function renderMMRCandlestick(data) {
    var chart = new CanvasJS.Chart("MMRChartContainer", {
        animationEnabled: true,
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        title: {
            text: "Netflix Stock Price in 2016"
        },
        subtitles: [{
            text: "Weekly Averages"
        }],
        axisX: {
            interval: 1,
            valueFormatString: "MMM"
        },
        axisY: {
            includeZero: false,
            prefix: "$",
            title: "Price"
        },
        toolTip: {
            content: "Date: {x}<br /><strong>Price:</strong><br />Open: {y[0]}, Close: {y[3]}<br />High: {y[1]}, Low: {y[2]}"
        },
        data: [{
            type: "candlestick",
            yValueFormatString: "$##0.00",
            dataPoints: data
        }]
    });

    chart.render();
};

function renderMap(data) {
    var chart = new CanvasJS.Chart("MapChartContainer", {
        animationEnabled: true,
        title: {
            text: "Maps",
            fontFamily: "arial black",
            fontColor: "#695A42"
        },
        axisX: {
            interval: 1,
            intervalType: "year"
        },
        axisY: {
            valueFormatString: "$#0bn",
            gridColor: "#B6B1A8",
            tickColor: "#B6B1A8"
        },
        toolTip: {
            shared: true,
            content: toolTipContent
        },
        data: [{
                type: "stackedColumn",
                showInLegend: true,
                color: "#696661",
                name: "Q1",
                dataPoints: [{
                        y: 6.75,
                        x: new Date(2010, 0)
                    },
                    {
                        y: 8.57,
                        x: new Date(2011, 0)
                    },
                    {
                        y: 10.64,
                        x: new Date(2012, 0)
                    },
                    {
                        y: 13.97,
                        x: new Date(2013, 0)
                    },
                    {
                        y: 15.42,
                        x: new Date(2014, 0)
                    },
                    {
                        y: 17.26,
                        x: new Date(2015, 0)
                    },
                    {
                        y: 20.26,
                        x: new Date(2016, 0)
                    }
                ]
            },
            {
                type: "stackedColumn",
                showInLegend: true,
                name: "Q2",
                color: "#EDCA93",
                dataPoints: [{
                        y: 6.82,
                        x: new Date(2010, 0)
                    },
                    {
                        y: 9.02,
                        x: new Date(2011, 0)
                    },
                    {
                        y: 11.80,
                        x: new Date(2012, 0)
                    },
                    {
                        y: 14.11,
                        x: new Date(2013, 0)
                    },
                    {
                        y: 15.96,
                        x: new Date(2014, 0)
                    },
                    {
                        y: 17.73,
                        x: new Date(2015, 0)
                    },
                    {
                        y: 21.5,
                        x: new Date(2016, 0)
                    }
                ]
            },
            {
                type: "stackedColumn",
                showInLegend: true,
                name: "Q3",
                color: "#695A42",
                dataPoints: [{
                        y: 7.28,
                        x: new Date(2010, 0)
                    },
                    {
                        y: 9.72,
                        x: new Date(2011, 0)
                    },
                    {
                        y: 13.30,
                        x: new Date(2012, 0)
                    },
                    {
                        y: 14.9,
                        x: new Date(2013, 0)
                    },
                    {
                        y: 18.10,
                        x: new Date(2014, 0)
                    },
                    {
                        y: 18.68,
                        x: new Date(2015, 0)
                    },
                    {
                        y: 22.45,
                        x: new Date(2016, 0)
                    }
                ]
            },
            {
                type: "stackedColumn",
                showInLegend: true,
                name: "Q4",
                color: "#B6B1A8",
                dataPoints: [{
                        y: 8.44,
                        x: new Date(2010, 0)
                    },
                    {
                        y: 10.58,
                        x: new Date(2011, 0)
                    },
                    {
                        y: 14.41,
                        x: new Date(2012, 0)
                    },
                    {
                        y: 16.86,
                        x: new Date(2013, 0)
                    },
                    {
                        y: 10.64,
                        x: new Date(2014, 0)
                    },
                    {
                        y: 21.32,
                        x: new Date(2015, 0)
                    },
                    {
                        y: 26.06,
                        x: new Date(2016, 0)
                    }
                ]
            }
        ]
    });
    chart.render();
};

function toolTipContent(e) {
    var str = "";
    var total = 0;
    var str2, str3;
    for (var i = 0; i < e.entries.length; i++) {
        var str1 = "<span style= \"color:" + e.entries[i].dataSeries.color + "\"> " + e.entries[i].dataSeries.name + "</span>: $<strong>" + e.entries[i].dataPoint.y + "</strong>bn<br/>";
        total = e.entries[i].dataPoint.y + total;
        str = str.concat(str1);
    }
    str2 = "<span style = \"color:DodgerBlue;\"><strong>" + (e.entries[0].dataPoint.x).getFullYear() + "</strong></span><br/>";
    total = Math.round(total * 100) / 100;
    str3 = "<span style = \"color:Tomato\">Total:</span><strong> $" + total + "</strong>bn<br/>";
    return (str2.concat(str)).concat(str3);
}