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

var dataPointsX = [];

let mapWL = {};

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

// let config = {};

window.onload = function () {
    var MMRLineDiv = document.getElementById('MMR').getContext('2d');
    var mapWLDiv = document.getElementById('MapWL').getContext('2d');
    // window.myLine = new Chart(ctx, config);


    var colorNames = Object.keys(window.chartColors);

    $("#importBtn").on('click', clickEvent => {
        clickEvent.preventDefault();
        resetDefaults();
        const csvData = $("#csvData").val();
        parseMapWL(csvData);
        generateMapBarChart();
        generateMMRLineChart(csvData);
    });

    generateMapBarChart = (csv) => {
        let data = parseMapDataFromCSV(csv);
        let stackedBar = new Chart(mapWLDiv, {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true
                    }]
                }
            }
        });
    };

    generateMMRLineChart = (csv) => {
        let config = {
            type: 'line',
            data: {
                labels: getLabels(parseYDataPoints(csv)).reverse(),
                datasets: [{
                    label: 'Your Team\'s MMR',
                    backgroundColor: window.chartColors.blue,
                    borderColor: window.chartColors.blue,
                    data: parseUserMMRDataPoints(csv).reverse(),
                    fill: false,
                }, {
                    label: 'Enemy Team\'s MMR',
                    fill: false,
                    backgroundColor: window.chartColors.orange,
                    borderColor: window.chartColors.orange,
                    data: parseEnemyMMRDataPoints(csv).reverse(),
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'MMR Gain / Loss'
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
        window.myLine = new Chart(MMRLineDiv, config);
    };

    // async function getMMRDataPointsFromCSV(csv) {
    //     try {
    //         let dataPoints = await parseCSVdata(csv);
    //         let myLineChart = await new Chart(ctx, {
    //             type: 'line',
    //             data: dataPoints,
    //             options: options
    //         });
    //     } catch (err) {
    //         // catches errors both in fetch and response.json
    //         console.error(`The following error: ${err}`);
    //     }
    // };

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

    parseUserMMRDataPoints = (csv) => {
        // console.log(csv);
        let dataPoints = csvLines = points = [];
        csvLines = csv.split(/[\r?\n|\r|\n]+/);

        for (let i = 0; i < csvLines.length; i++)
            if (csvLines[i].length > 0) {
                points = csvLines[i].split(";");
                dataPoints.push(parseFloat(points[12]));
            }
        // console.log(dataPoints);
        return dataPoints
    };

    parseYDataPoints = (csv) => {
        let dataPoints = csvLines = points = [];
        csvLines = csv.split(/[\r?\n|\r|\n]+/);

        for (let i = 0; i < csvLines.length; i++)
            if (csvLines[i].length > 0) {
                points = csvLines[i].split(";");
                dataPoints.push(parseFloat(points[0]));
            }
        return dataPoints
    };

    parseEnemyMMRDataPoints = (csv) => {
        let dataPoints = csvLines = points = [];
        csvLines = csv.split(/[\r?\n|\r|\n]+/);

        for (let i = 0; i < csvLines.length; i++)
            if (csvLines[i].length > 0) {
                points = csvLines[i].split(";");
                dataPoints.push(parseFloat(points[13]));
            }
        return dataPoints
    };

    parseEnemyMMRDataPoints = (csv) => {
        let dataPoints = csvLines = points = [];
        csvLines = csv.split(/[\r?\n|\r|\n]+/);

        for (let i = 0; i < csvLines.length; i++)
            if (csvLines[i].length > 0) {
                points = csvLines[i].split(";");
                dataPoints.push(parseFloat(points[13]));
            }
        return dataPoints
    };

    parseMapWL = (csv) => {
        let dataPoints = csvLines = points = [];
        csvLines = csv.split(/[\r?\n|\r|\n]+/);

        for (let i = 0; i < csvLines.length; i++)
            if (csvLines[i].length > 0) {
                points = csvLines[i].split(";");
                mapWL.game.played++;
                let win = (points[6] == 'true');
                switch (points[1]) {
                    case '572':
                        console.log(`Entered RoL case: ${points[6]}`);
                        // code for RoL
                        win ? mapWL.RoL.win++ : mapWL.RoL.loss++
                        win ? mapWL.game.win++ : mapWL.game.loss++
                        break;
                    case '617':
                        console.log(`Entered DS case: ${points[6]}`);
                        // code for DS
                        win ? mapWL.DS.win++ : mapWL.DS.loss++
                        win ? mapWL.game.win++ : mapWL.game.loss++
                        break;
                    case '980':
                        console.log(`Entered TA case: ${points[6]}`);
                        // code for TA
                        win ? mapWL.TA.win++ : mapWL.TA.loss++
                        win ? mapWL.game.win++ : mapWL.game.loss++
                        break;
                    case '1134':
                    console.log(`Entered TTP case: ${points[6]}`);
                        // code for TTP
                        win ? mapWL.TTP.win++ : mapWL.TTP.loss++
                        win ? mapWL.game.win++ : mapWL.game.loss++
                        break;
                    case '1504':
                    console.log(`Entered BRHA case: ${points[6]}`);
                        // code for BRHA
                        win ? mapWL.BRHA.win++ : mapWL.BRHA.loss++
                        win ? mapWL.game.win++ : mapWL.game.loss++
                        break;
                    case '1505':
                    console.log(`Entered NA case: ${points[6]}`);
                        // code for NA
                        win ? mapWL.NA.win++ : mapWL.NA.loss++
                        win ? mapWL.game.win++ : mapWL.game.loss++
                        break;
                    case '1552':
                    console.log(`Entered AF case: ${points[6]}`);
                        // code for AF
                        win ? mapWL.AF.win++ : mapWL.AF.loss++
                        win ? mapWL.game.win++ : mapWL.game.loss++
                        break;
                    case '1672':
                    console.log(`Entered BEA case: ${points[6]}`);
                        // code for BEA
                        win ? mapWL.BEA.win++ : mapWL.BEA.loss++
                        win ? mapWL.game.win++ : mapWL.game.loss++
                        break;
                    case '1825':
                    console.log(`Entered HP case: ${points[6]}`);
                        // code for HP
                        win ? mapWL.HP.win++ : mapWL.HP.loss++
                        win ? mapWL.game.win++ : mapWL.game.loss++
                        break;
                    case '1911':
                    console.log(`Entered M case: ${points[6]}`);
                        // code for M
                        win ? mapWL.M.win++ : mapWL.M.loss++
                        win ? mapWL.game.win++ : mapWL.game.loss++
                        break;
                }
                dataPoints.push(parseFloat(points[13]));
            }
        console.log(`Total Games Played: ${mapWL.game.played}`);
        console.log(`Total Wins: ${mapWL.game.win}`);
        console.log(`Total Losses: ${mapWL.game.loss}`);
    };

    resetDefaults = () => {
        mapWL = {
            game: {
                played: 0,
                win: 0,
                loss: 0
            },
            RoL: {
                id: 572,
                win: 0,
                loss: 0,
            },
            DS: {
                id: 617,
                win: 0,
                loss: 0,
            },
            TA: {
                id: 980,
                win: 0,
                loss: 0,
            },
            TTP: {
                id: 1134,
                win: 0,
                loss: 0,
            },
            BRHA: {
                id: 1504,
                win: 0,
                loss: 0,
            },
            NA: {
                id: 1505,
                win: 0,
                loss: 0,
            },
            AF: {
                id: 1552,
                win: 0,
                loss: 0,
            },
            BEA: {
                id: 1672,
                win: 0,
                loss: 0,
            },
            HP: {
                id: 1825,
                win: 0,
                loss: 0,
            },
            M: {
                id: 1911,
                win: 0,
                loss: 0,
            },
        }
    };

    // 572 - RoL (Ruins of Lordaeron)
    // 617 - DS (Dalaran Sewers)
    // 980 - TA (Tol'Viron Arena)
    // 1134 - TTP (Tiger's Peak)
    // 1504 - BRHA (Black Rook Hold)
    // 1505 - NA (Nagrand Arena)
    // 1552 - AF (Ashamane's Fall)
    // 1672 - BEA (Blade's Edge Arena)
    // 1825 - HP (Hook Point)
    // 1911 - M (Mugambala)

    parseMapDataFromCSV = (csv) => {
        return barChartData = {
            labels: ['Ruins of Lordaeron', 'Dalaran Sewers', 'Tol\'Viron Arena', 'Tiger\'s Peak', 'Black Rook Hold', 'Nagrand Arena', 'Ashamane\'s Fall', 'Blade\'s Edge Arena', 'Hook Point', 'Mugambala'],
            datasets: [{
                label: 'Losses',
                backgroundColor: window.chartColors.orange,
                data: [
                    mapWL.RoL.loss,
                    mapWL.DS.loss,
                    mapWL.TA.loss,
                    mapWL.TTP.loss,
                    mapWL.BRHA.loss,
                    mapWL.NA.loss,
                    mapWL.AF.loss,
                    mapWL.BEA.loss,
                    mapWL.HP.loss,
                    mapWL.M.loss
                ]
            }, {
                label: 'Wins',
                backgroundColor: window.chartColors.blue,
                data: [
                    mapWL.RoL.win,
                    mapWL.DS.win,
                    mapWL.TA.win,
                    mapWL.TTP.win,
                    mapWL.BRHA.win,
                    mapWL.NA.win,
                    mapWL.AF.win,
                    mapWL.BEA.win,
                    mapWL.HP.win,
                    mapWL.M.win
                ]
            }]

        };
    };
};