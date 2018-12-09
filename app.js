var dataPoints = [];

function getDataPointsFromCSV(csv) {
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
}

$("#importBtn").on('click', clickEvent => {
    clickEvent.preventDefault();
    console.log("Import button has been clicked.");
    const csvData = $("#csvData").val();
    const dataPoints = getDataPointsFromCSV(csvData);
    console.log(csvData);

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: `MMR Gain / Loss Over ${dataPoints.length-1} Games`,
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
            dataPoints: dataPoints
        }]
    });

    chart.render();
});