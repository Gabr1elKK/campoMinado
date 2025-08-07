type SquareState = "closed" | "open" | "flagged";

type Square = {
  row: number;
  column: number;
  state: SquareState;
  hasMine: boolean;
  nearMines: number;
};

type Board = Square[][];

// função para criar o campo
function criarCampo(lin: number, col: number): Board {
  const campo: Board = [];
  for (let i = 0; i < lin; i++) {
    const linhas: Square[] = []; // para cada linha cria x colunas
    for (let j = 0; j < col; j++) {
      // adiciona objeto square no fim do array
      linhas.push({
        row: i,
        column: j,
        state: "closed",
        hasMine: false,
        nearMines: 0,
      });
    }
    campo.push(linhas);
  }
  return campo;
}

//função para sortar minas
function sortearMinas(campo: Board, minas: number): void {
  const linhas = campo.length;
  if (linhas === 0) return; // verifica se tem elementos, senão não faz nada
  const colunas = campo[0].length; //

  let minasPlantadas = 0;

  while (minasPlantadas < minas) { // sorteia as minas aleatoriamente com random
    const linhaSorteada = Math.floor(Math.random() * linhas);
    const colunaSorteada = Math.floor(Math.random() * colunas);
    const quadrado = campo[linhaSorteada][colunaSorteada];

    if (!quadrado.hasMine) { // ver se já tem mina plantada naquele quadrado
      quadrado.hasMine = true;
      minasPlantadas++;
    }
  }
}

// conferir quantas bombas tem ao redor
function calcularMinasVizinhas(campo: Board, linha: number, coluna: number): void {
  let bombasRedor = 0;
  const totalLinhas = campo.length;
  const totalColunas = campo[0].length;

  for (let i = linha - 1; i <= linha + 1; i++) {
    for (let j = coluna - 1; j <= coluna + 1; j++) {
      const estaNoLimite = i >= 0 && i < totalLinhas && j >= 0 && j < totalColunas; // garantir que fique no tamanho do campo
      const naoEhCentral = !(i === linha && j === coluna); // não deixar contar célula do meio

      if (estaNoLimite && naoEhCentral) {
        if (campo[i][j].hasMine) {
          bombasRedor++;
        }
      }
    }
  }
  campo[linha][coluna].nearMines = bombasRedor;
}

// contar quantas bombas tem no campo
function popularMinasVizinhas(campo: Board): void {
  const totalLinhas = campo.length;
  if (totalLinhas === 0) return; // garantir que tem bombas
  const totalColunas = campo[0].length;

  for (let i = 0; i < totalLinhas; i++) {
    for (let j = 0; j < totalColunas; j++) {
      calcularMinasVizinhas(campo, i, j);
    }
  }
}

// função pra mostrar o campo
function imprimeCampo(campo: Board): void {
  console.log("\n--- CAMPO MINADO ---");

  for (const linha of campo) {
    const linhaFormatada = linha.map(q => {
      const char = q.hasMine ? '*' : ' ';
      return `[${char}]`;
    }).join('');
    console.log(linhaFormatada);
  }
  console.log("--------------------\n");
}

const campoMinado = criarCampo(7, 7);
const gabaritoCampoMinado: Board = JSON.parse(JSON.stringify(campoMinado));

sortearMinas(gabaritoCampoMinado, 15);
popularMinasVizinhas(gabaritoCampoMinado);
imprimeCampo(campoMinado);
imprimeCampo(gabaritoCampoMinado);
