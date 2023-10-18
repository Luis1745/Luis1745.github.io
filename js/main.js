

var chiSquareValue = 0;

function validateInput(input) {
    // Reemplazar múltiples espacios seguidos por un solo espacio
    input.value = input.value.replace(/[^0-9,\s]/g, '');

    // Contar el número de espacios en el texto
    var espacios = (input.value.match(/\s/g) || []).length;

    // Si hay más de 7 espacios, eliminar los espacios adicionales
    if (espacios > 6) {
        input.value = input.value.replace(/\s/g, function (match, offset) {
            return offset < 6 ? match : '';
        });
    }
}

function generateTableAndCalculateChiSquare() {
    var dataInput = document.getElementById("dataInput").value;
    var rows = dataInput.split("\n");
    var table = [];
    var totalRow = [];
    var totalColumn = [];

    for (var i = 0; i < rows.length; i++) {
        var rowData = rows[i].split(",");
        table.push(rowData.map(Number));

        for (var j = 0; j < rowData.length; j++) {
            if (!totalRow[i]) {
                totalRow[i] = 0;
            }
            if (!totalColumn[j]) {
                totalColumn[j] = 0;
            }
            totalRow[i] += table[i][j];
            totalColumn[j] += table[i][j];
        }
    }

    var totalSum = totalRow.reduce((acc, val) => acc + val, 0);

    var expectedTable = [];
    for (var i = 0; i < rows.length; i++) {
        expectedTable.push([]);
        for (var j = 0; j < table[i].length; j++) {
            expectedTable[i].push((totalRow[i] * totalColumn[j]) / totalSum);
        }
    }

    chiSquareValue = 0;
    for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < table[i].length; j++) {
            chiSquareValue += Math.pow((table[i][j] - expectedTable[i][j]), 2) / expectedTable[i][j];
        }
    }

    chiSquareValue = chiSquareValue.toFixed(2);
    
    document.getElementById("table").innerHTML = generateHtmlTable(table);
    document.getElementById("chiSquare").innerHTML = "Chi-Cuadrada: " + chiSquareValue;
    
}

function graphic() {
    // Redirige a la otra página y pasa el valor de chiSquare en la URL
    window.location.href = "grafico_distribucion.html?chiSquare=" + chiSquareValue;
}


function generateHtmlTable(data) {
    var columnNames = prompt("Ingresa los nombres de las columnas separados por comas").split(',');
    var rowNames = prompt("Ingresa los nombres de las filas separados por comas").split(',');

    var html = "<table border='1'><tr><th></th>";

    for (var i = 0; i < columnNames.length; i++) {
        html += "<th>" + columnNames[i] + "</th>";
    }

    html += "</tr>";

    for (var i = 0; i < data.length; i++) {
        html += "<tr><th>" + rowNames[i] + "</th>";

        for (var j = 0; j < data[i].length; j++) {
            html += "<td>" + data[i][j] + "</td>";
        }

        html += "</tr>";
    }

    html += "</table";

    return html;
}

// Ejemplo de uso
var data = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

var table = generateHtmlTable(data);
document.getElementById("table-container").innerHTML = table;  // Asegúrate de tener un elemento con el ID "table-container" en tu HTML donde se mostrará la tabla.
