
const pantalla = document.getElementById('resultado');
const numeros = document.querySelectorAll('.numericos');
const operadores = document.querySelectorAll('.operador');

let current = "0";   
pantalla.value = current;

numeros.forEach(boton => {
    boton.addEventListener('click', () => {
        let value = boton.textContent;

        
        if (value === ".") {
            let partes = current.split(/[\+\-\x\/]/); 
            let ultimaParte = partes[partes.length - 1];

            if (ultimaParte.includes(".")) return;
        }

        
        if (current === "0" && value !== ".") {
            current = value;
        } else if (current === "0" && value === ".") {
            current = "0.";
        } else {
            current += value;
        }

        pantalla.value = current;
    });
});


operadores.forEach(boton => {
    boton.addEventListener('click', () => {
        let op = boton.textContent;

       
        if (op === "C") {
            ClearALL();
            return;
        }

        
        if (op === "←") {
            DeleteLast();
            return;
        }

        if (op === "=") {
            try {
                evaluarExpresion();
            } catch (error) {
                pantalla.value = "Error";
            }
            return;
        }

        
        if (current === "0" || current === "") {
            alert("El formato usado no es válido!");
            return;
        }

        if (["+", "-", "x", "/","%"].includes(op)) {
            if (["+", "-", "x", "/", "%"].includes(current.slice(-1))) {
                alert("error!!!");
                return;
            }
            current += op;
            pantalla.value = current;
        }
    });
});

function ClearALL() {
    current = "0";
    pantalla.value = current;
}


function DeleteLast() {
    if (current.length === 1) {
        current = "0";
    } else {
        current = current.slice(0, -1); 
    }
    pantalla.value = current;
}

function evaluarExpresion() {

    let expresion = current.replace(/x/g, "*");

    setTimeout(() => {
            ClearALL();
        }, 4000);

    try {
        
        if (expresion.includes("/0")) {
            throw new Error("Division por cero");
        }
        if (expresion.includes ("%")) {
            try {
                let numero = parseFloat(current);
                if (isNaN(numero)) throw new Error("Expresión inválida");
                current = (numero / 100).toString();
                pantalla.value = current;
            } catch (error) {
                pantalla.value = "Error";
            }
            return;
        }

        let resultado = eval(expresion); 

        if (!isFinite(resultado)) 
            throw new Error("Infinito");
        if (isNaN(resultado)) 
            throw new Error("Valor no válido");

        pantalla.value = resultado;
        current = resultado.toString();
        setTimeout(() => {
            ClearALL();
        }, 4000);

    } catch (error) {
        pantalla.value = "Error";
        current = "0";
    }
}


