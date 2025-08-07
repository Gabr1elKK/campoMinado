// objeto que cria cada quadrado
Square = {
	row: 0,
	column: 0,
	state: "closed",
	hasMine: false,
	nearMines: 0,
}

// função para criar o campo
function tamanho(lin, col){
  const campo = [];
  for (let i = 0; i < lin; i++){
    const linhas = []; // para cada linha cria x colunas

    for (let j = 0; j < col; j++){
      linhas.push({ // adiciona objeto square no fim do array
        Square,
      })
    }
    campo.push(linhas);
  }
  return campo;
}

//função para sortar minas
function sortear(campo, minas){
  const linhas = campo.length;
  if (linhas === 0) return; // verifica se tem elementos, senão não faz nada
  const colunas = campo[0].length; //

  let minasPlantadas = 0;

  while (minasPlantadas < minas){ // sorteia as minas aleatoriamente com random
    const linhaSorteada = Math.floor(Math.random() * linhas);
    const colunaSorteada = Math.floor(Math.random() * colunas);
    const quadrado = campo[linhaSorteada][colunaSorteada];

    if (!quadrado.hasMine){ // ver se já tem mina plantada naquele quadrado
      quadrado.hasMine = true;
      minasPlantadas++;
    }
  }
}

// conferir quantas bombas tem ao redor
function bombasVizinhas(campo, linha, coluna){
  let bombasRedor = 0;
  const totalLinhas = campo.length;
  const totalColunas = campo[0]. length;

  for (let i = linha - 1; i <= linha + 1; i++){
    for (let j = coluna - 1; j <= coluna + 1; j++){
      const noLimite = i >= 0 && i < totalLinhas && j >= 0 && j < totalColunas; // garantir que fique no tamanho do campo
      const naoCentral = !(i === linha && j === coluna); // não deixar contar célula do meio

      if (noLimite && naoCentral){
        if (campo[i][j].hasMine){
          bombasRedor++;
        }
      }
    }
  }

  campo[linha][coluna].nearMines = bombasVizinhas;
}

// contar quantas bombas tem no campo
function contarMinasVizinhas(campo){
  const totalLinhas = campo.length;
  if (totalLinhas === 0) return; // garantir que tem bombas
  const totalColunas = campo[0].length;

  for (let i = 0; i < totalLinhas; i++){
    for (let j = 0; j < totalColunas; j++){
      bombasVizinhas(campo, i, j);
    }
  }
}

// função pra mostrar o campo
function imprimeCampo(campo) {
  console.log("\n--- CAMPO MINADO ---");

  for (const linha of campo) {
    const linhaFormatada = linha.map(q => {
      const char = q.hasMine ? '*' : (q.nearMines > 0 ? q.nearMines : ' ');
      return `[${char}]`;
    }).join('');
    console.log(linhaFormatada);
  }
  console.log("--------------------\n");
}

const campoMinado = tamanho(7, 7);
const gabaritoCampoMinado = structuredClone(campoMinado);
sortear(gabaritoCampoMinado, 15);
contarMinasVizinhas(gabaritoCampoMinado);

imprimeCampo(campoMinado);
imprimeCampo(gabaritoCampoMinado);
