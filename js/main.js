particlesJS("particles-js", {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;

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
