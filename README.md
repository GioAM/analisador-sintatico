# Analisador Sintático Top-Down Preditivo Tabular

Aplicação mostrando o mapeamento de tarefas para sistemas embarcados com distribuição de carga de trabalho em uma matriz de processadores.

-------------------- 

- **Demo:** https://gioam.github.io/mapeamento-de-tarefas/

--------------------
## Desenvolvimento
### Linguagens Utilizadas: 
  - JavaScript
  - CSS
  - HTML. 
### Bibliotecas utilizadas: 
  - Bootstrap
  - JQuery

## Entrada
As informações são lidas através de dois JSONs.
  - Apps: contém as informações das aplicações que irão ser rodadas
  - Tests: contém as informações dos processadores
  
## Funcionamento
Ao clicar no botão iniciar, a aplicação irá ler a entrada e o algoritmo distribui as tarefas na matriz de processadores de acordo com a carga de trabalho demarcado como a proprieadade Load do processador.

## Funções
  - GetTasks(): Pega as informações dos arquivos de entrada, tamanho da matriz de processadores, tarefas por processadores, e outros. Criam um array com todas as tarefas que precisam ser executadas.
  - DistributeOthers(): Percorre toda a matriz colocando tarefas em todos os processadores que não são GMP.
  - DistributeOthersTasks(): Faz um array dos processadores e faz um sort por load nos processadores ativos. Coloca as tarefas que faltaram com base no array.
  -DrawTable(): Mostra a matriz com informações dos processadores.
  
## Cores
  - Azul: GMP, Repositório de armazenamento das tarefas
  - Verde: Processador sem nenhuma tarefa executando
  - Amarelo: Processador com tarefas executando mas ainda possue espaço
  - Vermelho: Máximo de tarefas rodando no processador

## Saída
As matrizes de processadores são mostradas através de tabelas junto com as informações do processador
