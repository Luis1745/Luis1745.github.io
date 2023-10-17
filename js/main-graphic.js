google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function loadChiSquareValue() {
    var urlParams = new URLSearchParams(window.location.search);
    var urlChiSquareValue = urlParams.get("chiSquare");
    chiSquareValue = urlChiSquareValue || chiSquareValue;
    document.getElementById("chiSquareValue").value = chiSquareValue;
}


function drawChart(chiSquareValue) {
    const resultChiSquare = parseFloat(document.getElementById('chiSquareValue').value);
    const criticalValue = parseFloat(document.getElementById('criticalValue').value);

    const data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Distribución Chi-Cuadrada');
    data.addColumn('number', 'Valor Critico');
    data.addColumn('number', 'Valor Chi-Cuadrada');

    const points = [];
    for (let x = 0; x <= criticalValue + 2; x += 0.01) {
        const chiSquareDist = chiSquareDensity(x);
        points.push([x, chiSquareDist, null, null]);
    }

    // Asegúrate de usar resultChiSquare como número
    points.push([criticalValue, null, chiSquareDensity(criticalValue), null]);
    points.push([resultChiSquare, null, null, chiSquareDensity(resultChiSquare)]);

    data.addRows(points);

    const options = {
        title: 'Distribución Chi-Cuadrada',
        curveType: 'function',
        legend: { position: 'none' },
        hAxis: { title: 'X' },
        vAxis: { title: 'Density' },
        series: {
            0: { color: 'blue' },
            1: { color: 'red', pointSize: 7 }, // Critical Value
            2: { color: 'green', pointSize: 7 }, // Chi-Square Value
        }
    };

    const chart = new google.visualization.LineChart(document.getElementById('chart'));
    chart.draw(data, options);

    const resultDiv = document.getElementById('result');
    if (resultChiSquare < criticalValue) {
        resultDiv.innerHTML = 'Resultado: Aceptar (dentro de la zona de aceptación)';
        resultDiv.style.color = 'green';
    } else {
        resultDiv.innerHTML = 'Resultado: Rechazar (fuera de la zona de aceptación)';
        resultDiv.style.color = 'red';
    }

    localStorage.setItem("chiSquareValue", chiSquareValue);
}

function chiSquareDensity(x) {
    if (x <= 0) return 0;
    return Math.pow(x, 1 / 2) * Math.exp(-x / 2) / (2 * Math.pow(2, 1 / 2) * gamma(1 / 2));
}

function gamma(z) {
    if (z === 1) return 1;
    if (z === 0.5) return Math.sqrt(Math.PI);
    return (z - 1) * gamma(z - 1);
}