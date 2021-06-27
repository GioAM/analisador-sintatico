var mapNT = new Map();
var mapT = new Map();
var tabelaParsing = [];
var pilha = '$';
var entrada = 'abbc$';
var status = 'ok';
var iteracoes = [];
var id = 0;
var toastElList = [].slice.call(document.querySelectorAll('#attention-toast'));
var toastList = toastElList.map(function(toastEl) {
	return new bootstrap.Toast(toastEl, {delay:20000});
});

$( document ).ready(function() {
	initializeData();
   	reset();
   	$('#doAllSteps').click(doAllIterations);
	$('#doNextStep').click(doNextIteration);
	$("#sentenca").keyup(reset);
	$("#gerar-sentenca").click(generateSentence);
	$("#toast-reset").click(toastReset);
});

function Iteracao(id, pilha, entrada, acao){
	this.id = id;
	this.pilha = pilha;
	this.entrada = entrada;
	this.acao = acao;
}

function initializeData(){
	mapNT.set("S", 0);
	mapNT.set("A", 1);
	mapNT.set("B", 2);
	mapNT.set("C", 3);
	mapNT.set("a", 0);
	mapNT.set("b", 1);
	mapNT.set("c", 2);
	mapNT.set("$", 3);

	mapT.set("S", ['aAc', 'bCa']);
	mapT.set("A", ['aBa', 'bCb', 'cSb']);
	mapT.set("B", ['bAa', 'cS']);
	mapT.set("C", ['ε', 'cSc']);

	tabelaParsing = [['aAc', 'bCa', '-', '-'],
					['aBa', 'bCb', 'cSb', '-'],
					['-', 'bAa', 'cS', '-'],
					['ε', 'ε', 'cSc', '-'] ];
}

function reset(){
	id = 0;
	pilha = "$S";
	entrada = "";
	status = "init";
	iteracoes = [];
	$("#resultado").html('');
}

function doIteracao(){
	drawFita();
	var pilha_size = pilha.length;
	var first_entrada = entrada[0];
	var last_pilha = pilha[pilha_size - 1];
	var it = [];
	id = id + 1;
	if(first_entrada == "$" && last_pilha == "$"){
		it = new Iteracao(id, pilha, entrada, `<span class='text-success'>ACEITO EM ${id}</span>`);
		status = "done";
	}else if(first_entrada == last_pilha){
		it = new Iteracao(id, pilha, entrada, "le " + last_pilha);
		entrada = entrada.substring(1);
		pilha = pilha.slice(0, -1);
	}else if(first_entrada != "$" && last_pilha == "$"){
		it = new Iteracao(id, pilha, entrada, `<span class='text-danger'>ERRO EM ${id}</span>`);
		status = "done";
	}else{
		var acao = tabelaParsing[mapNT.get(last_pilha)][mapNT.get(first_entrada)];
		if(acao == "-"){
			it = new Iteracao(id, pilha, entrada, "ERRO EM " + id);
			status = "done";
		}else if(acao == 'ε'){
			it = new Iteracao(id, pilha, entrada, last_pilha + " -> ε");
			pilha = pilha.slice(0, -1);
		}else{
			it = new Iteracao(id, pilha, entrada, last_pilha + " -> " + acao);
			pilha = pilha.slice(0, -1);
			pilha = pilha + acao.split('').reverse().join('');
		}
	}
	iteracoes.push(it);
}	

function doAllIterations(){
	if(id == 0){
		entrada = $('#sentenca').val() + "$";
	}
	if(status != "done"){
		while(status != "done"){
			doIteracao();
		}
		drawTable();
	}else{
		showToast();
	}
}

function doNextIteration(){
	if(id == 0){
		entrada = $('#sentenca').val() + "$";
	}
	if(status != "done"){
		doIteracao();
		drawTable();
	}else{
		showToast();
	}
}

function drawTable(){
	$("#resultado").append(`
		<table class="table table-bordered table-striped">
			<thead class="thead-light">
				<tr>
					<th>#</th>
					<th>Pilha</th>
					<th>Entrada</th>
					<th>Ação</th>
				</tr>
			</thead>
			<tbody id="tabela_teoria">
			</tbody>
		</table>`);
	iteracoes.forEach(function (value, index) {
		$("#tabela_teoria").append(`
			<tr>
				<td>${value.id}</td>
				<td>${value.pilha}</td>
				<td>${value.entrada}</td>
				<td>${value.acao}</td>
			</tr>
		`);
	});
}

function drawFita(){
	$("#resultado").html('');
	$("#resultado").append('<table class="table table-bordered table-striped" id="table-fita"><tr id="fita"></tr></table>');
	for (var i = 0; i < entrada.length; i++) {
   		$("#fita").append(`<td>${entrada[i]}</td>`);
		if(i == 0){
			$("#table-fita").append("<div class='icon-fita'><img class='icon-image' src='images/up-arrow.png'></div>");
		}
 	}
}

function generateSentence(){
	reset();
	var sentence = "";
	var textArray = mapT.get('S');
	var randomNumber = Math.floor(Math.random() * textArray.length);
	sentence = textArray[randomNumber];
	var done = false;

	while(!done){
		for(var i=0; i < sentence.length; i++){
			var character = sentence[i];
			if (character == character.toUpperCase()) {
				textArray = mapT.get(character);
				randomNumber = Math.floor(Math.random() * textArray.length);
				aux = textArray[randomNumber];
				if(sentence.length > 10 && character == 'C'){
					sentence = sentence.replace(character, '');
					done = true;
				}else if(aux == 'ε'){
					sentence = sentence.replace(character, '');
					done = true;
				}else{
					sentence = sentence.replace(character, aux);
				}	
			}
		}
	}
	$('#sentenca').val(sentence);
}

 function showToast(){
   toastList.forEach(toast => toast.show());
 }
 function toastReset(){
	reset();
	toastList.forEach(toast => toast.hide());
 }
