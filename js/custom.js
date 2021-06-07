var myModal = new bootstrap.Modal(document.getElementById('gramaticaModal'), {keyboard: false});
var toast = new bootstrap.Toast(document.getElementById('toast-action'), {});
$("#show-gramatica").click(function(){
	myModal.show();
	toast.show();
});
$(".fechar-modal").click(function(){
	myModal.hide();
});

