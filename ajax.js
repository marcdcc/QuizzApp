window.onload = function() {
    openTrivia();
}

function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function openTrivia() {
    numQuestion = 0;
    correctAnswers = 0;
    results = {}; // Parte del JSON devuelto que contiene las preguntas...

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();

    ajax.open("GET", "https://opentdb.com/api.php?amount=10&category=18", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            /* Leerá la respuesta que es devuelta por el controlador: */
            results = respuesta.results;
            console.log(results);
            question();
        }
    }
    ajax.send();
}

function question() {
    var contenedor = document.getElementById('container-quiz');
    var recarga = '';
    if (numQuestion == 10) {
        recarga += '<h1>Fin del QUIZ</h1>';
        if (correctAnswers == 1) {
            recarga += '<h2>Has acertado ' + correctAnswers + ' pregunta!!!</h2>';
        } else {
            recarga += '<h2>Has acertado ' + correctAnswers + ' preguntas!!!</h2>';
        }
        recarga += '<button onclick="openTrivia()" class="btn btn-dark btn-lg btn-block">Volver a jugar</button>';
    } else {
        recarga += '<h2>QUIZ</h2>';
        recarga += '<p>' + results[numQuestion]['question'] + '</p>';
        recarga += '<button class="btn btn-primary btn-lg btn-block" name="answer" id="correct_answer" onclick="check_question(this)">' + results[numQuestion]['correct_answer'] + '</button>';
        array_incorrect = results[numQuestion]['incorrect_answers'];
        for (let i = 0; i < array_incorrect.length; i++) {
            recarga += '<button class="btn btn-primary btn-lg btn-block" name="answer" id="incorrect_answers" onclick="check_question(this)">' + array_incorrect[i] + '</button>';
        }
        recarga += '<button onclick="question()" class="btn btn-secondary btn-lg btn-block" name="nexQuestion" id="nextQuestion">Next Question</button>';
    }
    contenedor.innerHTML = recarga;
}

function check_question(a) {
    if (results[numQuestion].correct_answer == a.innerHTML) {
        correctAnswers++;
        a.classList.remove('btn-primary');
        a.classList.add('btn-success');
        desabilitar = document.getElementsByName('answer');
        for (let i = 0; i < desabilitar.length; i++) {
            desabilitar[i].disabled = true;
        }
    } else {
        a.classList.remove('btn-primary');
        a.classList.add('btn-danger');
        desabilitar = document.getElementsByName('answer');
        for (let i = 0; i < desabilitar.length; i++) {
            desabilitar[i].disabled = true;
        }
    }
    numQuestion++;
}