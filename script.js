//Criando o projeto do M1
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Matriz que vai armazenar os estudantes.
let estudantes = [];

// Criando as Funções principais do Programa.

// Função para cadastrar um novo estudante
function cadastrarEstudante(nome, idade, notas) {
    if (!nome || nome.trim() === '') {
        console.log("\n[ERRO] O nome não pode ser vazio.\n");
        return;
    }
    if (isNaN(idade) || idade <= 0) {
        console.log("\n[ERRO] Idade deve ser um número positivo.\n");
        return;
    }
    if (!Array.isArray(notas) || notas.length === 0 || notas.some(n => isNaN(n) || n < 0 || n > 10)) {
        console.log("\n[ERRO] Todas as notas devem ser números entre 0 e 10.\n");
        return;
    }

    // Informações do Estudante
    const estudante = {
        nome: nome.trim(),
        idade: Number(idade),
        notas: notas.map(Number)
    };

    // Adiciona ao array de estudantes
    estudantes.push(estudante);
    console.log("\n[OK] Estudante cadastrado com sucesso!\n");
}

/// Função para calcular a média de um estudante
function calcularMedia(estudante) {
    return estudante.notas.reduce((acc, nota) => acc + nota, 0) / estudante.notas.length;
}

/// Função para listar todos os estudantes cadastrados.
function listarEstudantes() {
    console.log("\n---- Estudantes ----");
    if (estudantes.length === 0) {
        console.log("Nenhum estudante cadastrado.\n");
        return;
    }

    estudantes.forEach((estudante, index) => {
        console.log(`(${index + 1}) Nome: ${estudante.nome} | Idade: ${estudante.idade} | Notas: [${estudante.notas.join(", ")}] | Média: ${calcularMedia(estudante).toFixed(2)}`);
    });
    console.log("--------------------------\n");
}

// Função para buscar estudante
function buscarEstudante(nome) {
    const resultado = estudantes.filter(e => e.nome.toLowerCase().includes(nome.toLowerCase()));

    console.log(`\n----- RESULTADO DA BUSCA: "${nome}" -----`);
    if (resultado.length === 0) {
        console.log("Nenhum estudante encontrado.\n");
        return;
    }

    resultado.forEach(estudante => {
        console.log(`Nome: ${estudante.nome} | Idade: ${estudante.idade} | Média: ${calcularMedia(estudante).toFixed(2)}`);
    });
    console.log("---------------------------------\n");
}

// Função para calcular média geral da turma
function mediaGeral() {
    if (estudantes.length === 0) return 0;
    return estudantes.map(e => calcularMedia(e)).reduce((acc, m) => acc + m, 0) / estudantes.length;
}

// Função para identificar estudante com maior média
function melhorEstudante() {
    if (estudantes.length === 0) return null;
    return estudantes.reduce((melhor, atual) => (calcularMedia(atual) > calcularMedia(melhor) ? atual : melhor));
}

// Função para -  aprovados, recuperação, reprovados
function relatorioStatus() {
    console.log("\n----- Calculo de média  -----");

    const aprovados = estudantes.filter(e => calcularMedia(e) >= 7);
    const recuperacao = estudantes.filter(e => calcularMedia(e) >= 5 && calcularMedia(e) < 7);
    const reprovados = estudantes.filter(e => calcularMedia(e) < 5);

    console.log("\n--- APROVADOS ---");
    aprovados.forEach(e => console.log(`${e.nome} - Média: ${calcularMedia(e).toFixed(2)}`));
    if (aprovados.length === 0) console.log("Nenhum estudante aprovado.");

    console.log("\n--- RECUPERAÇÃO ---");
    recuperacao.forEach(e => console.log(`${e.nome} - Média: ${calcularMedia(e).toFixed(2)}`));
    if (recuperacao.length === 0) console.log("Nenhum estudante em recuperação.");

    console.log("\n--- REPROVADOS ---");
    reprovados.forEach(e => console.log(`${e.nome} - Média: ${calcularMedia(e).toFixed(2)}`));
    if (reprovados.length === 0) console.log("Nenhum estudante reprovado.");

    console.log("------------------------------------------------------\n");
}

//Menu de Opções

function mostrarMenu() {
    console.log("-------  Olá seja bem-vindo ao meu programa -------\n"); //Barra de Divisória do programa
    console.log("1. Cadastrar estudante");
    console.log("2. Listar estudantes");
    console.log("3. Buscar estudante por nome");
    console.log("4. Calcular média geral da turma");
    console.log("5. Mostrar estudante com maior média");
    console.log("6. Relatórios (Aprovados, Recuperação, Reprovados)");
    console.log("0. Sair");
    console.log("---------------------------------------------------\n"); 
}
//area seleção de escolhas
function executarOpcao(opcao) {
    switch (opcao) {
        case '1':
            rl.question("Digite o nome do novo estudante: ", nome => {
                rl.question("Digite a idade do estudante: ", idade => {
                    rl.question("Digite as notas separadas por vírgula: ", notasInput => {
                        const notas = notasInput.split(',').map(n => parseFloat(n.trim()));
                        cadastrarEstudante(nome, idade, notas);
                        iniciar();
                    });
                });
            });
            break;

        case '2':
            listarEstudantes();
            iniciar();
            break;

        case '3':
            rl.question("Digite o nome do aluno: ", nome => {
                buscarEstudante(nome);
                iniciar();
            });
            break;

        case '4':
            console.log(`\nMédia geral da turma: ${mediaGeral().toFixed(2)}\n`);
            iniciar();
            break;

        case '5':
            const melhor = melhorEstudante();
            if (melhor) {
                console.log(`\nMelhor estudante: ${melhor.nome} - Média: ${calcularMedia(melhor).toFixed(2)}\n`);
            } else {
                console.log("\nNenhum estudante cadastrado.\n");
            }
            iniciar();
            break;

        case '6':
            relatorioStatus();
            iniciar();
            break;

        case '0':
            console.log("\nEncerrando o sistema... Até logo!\n");
            rl.close();
            break;

        default:
            console.log("\n[ERRO] Opção inválida, tente novamente.\n");
            iniciar();
    }
}

function iniciar() {
    mostrarMenu();
    rl.question("Escolha uma opção: ", executarOpcao);
}

iniciar();