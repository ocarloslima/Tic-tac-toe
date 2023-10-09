let nodeList = document.querySelectorAll('.square');
let squares: HTMLDivElement[] = Array.prototype.slice.call(nodeList);
const button: HTMLButtonElement = document.querySelector('button')!;
let p: HTMLParagraphElement = document.querySelector('p')!;

// variavel de controle de vez
let i: number = 0;

let gameOver: boolean = false;

let hasWinner = () => {
    // combinações
    let comb = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8], [2, 4, 6],   // diagonal
        [0, 3, 6], [1, 4, 7], [2, 5, 8] // vertical
    ]
    // checagem de vencedor
    for (let i of comb) {
        const [a, b, c] = i;
        if (
            squares[a].innerHTML === squares[b].innerHTML &&
            squares[b].innerHTML === squares[c].innerHTML &&
            squares[a].innerHTML !== ''
        ) {
            // Retorna qual o vendor (X ou O)
            return squares[a].textContent;
        }
    }
}

squares.forEach((element) => {
    element.addEventListener('click', () => {
        if (gameOver)
            return;

        let text = element.textContent;
        // Jogada apenas em quadrados sem valores
        if (text === '') {
            element.innerHTML = i == 0 ? 'X' : 'O'
            i = 1 - i

            const win = hasWinner();
            if (win) {
                p.innerHTML = `O vencedor é o jogador ${win}`;
                p.style.visibility = 'visible';
                gameOver = true;
            }
        }
    });
})

// Reiniciar o jogo
button.addEventListener('click', () => {
    squares.forEach(element => {
        element.innerHTML = '';
        p.style.visibility = 'hidden';
        gameOver = false;
        i = 0;
    })
})