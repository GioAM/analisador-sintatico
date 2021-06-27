var myModal = new bootstrap.Modal(document.getElementById('gramaticaModal'), {keyboard: false});
$("#show-gramatica").click(function(){
	myModal.show();
});
$(".fechar-modal").click(function(){
	myModal.hide();
});

