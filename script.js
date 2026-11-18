
// 1. Seleciona o Canvas na página
const canvas = document.getElementById("meuCanvas");

// 2. Obtém o contexto 2D
const ctx = canvas.getContext("2d");

let totalCliques = 0;

const contador = document.getElementById("contador");

const botaoReiniciar = document.getElementById("reiniciar");

botaoReiniciar.addEventListener("click", function() {

    totalCliques = 0;

    contador.textContent = "Formas clicadas: " + totalCliques;

});

// 3. Cria os objetos da animação
const objetos = [
    {
        x: 100,
        y: 100,
        tamanho: 30,
        velocidadeX: 3,
        velocidadeY: 2,
        cor: "red",
        tipo: "circulo"
    },

    {
        x: 300,
        y: 200,
        tamanho: 40,
        velocidadeX: 2,
        velocidadeY: 3,
        cor: "blue",
        tipo: "quadrado"
    },
    {
        x: 500,
        y: 150,
        tamanho: 25,
        velocidadeX: 4,
        velocidadeY: 2,
        cor: "green",
        tipo: "circulo"
    }
];
//4. Cria mais cinco circulos usando FOR
for (let i = 0; i < 5; i++) {

    const novoObjeto = {
        x: 30 + Math.random() * (canvas.width - 60),
        y: 30 + Math.random() * (canvas.height - 60),
        tamanho: 20,
        velocidadeX: 2 + Math.random() * 3,
        velocidadeY: 2 + Math.random() * 3,
        cor: "purple",
        tipo: "circulo"
    };

    objetos.push(novoObjeto);
}

// 5. Desenha os objetos
function desenharObjetos() {

    objetos.forEach(objeto => {

        ctx.fillStyle = objeto.cor;

        if (objeto.tipo === "circulo") {

            ctx.beginPath();
            ctx.arc(
                objeto.x,
                objeto.y,
                objeto.tamanho,
                0,
                Math.PI * 2
            );
            ctx.fill();

        } else {

            ctx.fillRect(
                objeto.x,
                objeto.y,
                objeto.tamanho * 2,
                objeto.tamanho * 2
            );
        }
    });
}

// 6. Atualiza a posição dos objetos
function atualizarObjetos() {

    objetos.forEach(objeto => {

        objeto.x += objeto.velocidadeX;
        objeto.y += objeto.velocidadeY;

        const tamanho = objeto.tamanho;
        const deslocamento = objeto.tipo === "circulo" ? tamanho : tamanho * 2;

        if (objeto.x + deslocamento > canvas.width ||
            objeto.x < (objeto.tipo === "circulo" ? tamanho : 0)) {

            objeto.velocidadeX *= -1;
        }

        if (objeto.y + deslocamento > canvas.height ||
            objeto.y < (objeto.tipo === "circulo" ? tamanho : 0)) {

            objeto.velocidadeY *= -1;
        }
    });
}

// 7. Loop da animação
function animar() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    desenharObjetos();

    atualizarObjetos();

    requestAnimationFrame(animar);
}

// 8. Detecta o clique e altera a cor
canvas.addEventListener("click", function(event) {

    const retangulo = canvas.getBoundingClientRect();

    const mouseX = (event.clientX - retangulo.left) *
        (canvas.width / retangulo.width);

    const mouseY = (event.clientY - retangulo.top) *
        (canvas.height / retangulo.height);

    objetos.forEach(objeto => {

        let clicou = false;

        if (objeto.tipo === "circulo") {

            const dx = mouseX - objeto.x;
            const dy = mouseY - objeto.y;

            clicou = Math.sqrt(dx * dx + dy * dy) <= objeto.tamanho;

        } else {

            clicou =
                mouseX >= objeto.x &&
                mouseX <= objeto.x + objeto.tamanho * 2 &&
                mouseY >= objeto.y &&
                mouseY <= objeto.y + objeto.tamanho * 2;
        }

        if (clicou) {

            const cores = [
                "purple",
                "orange",
                "pink",
                "blue",
                "green",
                "red",
                "gold"
            ];

            totalCliques++;

contador.textContent = "Formas clicadas: " + totalCliques;

            let novaCor;

            do {
                novaCor = cores[Math.floor(Math.random() * cores.length)];
            } while (novaCor === objeto.cor);

            objeto.cor = novaCor;
        }
    });
});

// 9. Inicia a animação
animar();
