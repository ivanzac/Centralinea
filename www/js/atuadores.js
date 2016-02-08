//var url = '';
//var chave = '';	
var url = window.localStorage.getItem('ip');
var chave = window.localStorage.getItem('chave');

var stop = true;
var portao = '';

$('body').css('overflow', '');

//Verifica se algum botão mudou de estado
$(":checkbox").change(function() {
	if (stop == true){
	
	var value = $(this).val();
    
        //console.log("true :"+value);
		if (value == "Rele 1" || value == "Rele 2"){
			$('#modal2').openModal();
			portao = value;
			
		}else{
		
		
		$.ajax({
					method: "POST",		
					url: "http://"+url+"/dash/send_m.php",
					timeout: 8000,
					data: { chave: chave, comando: value}
				})
					.done(function( requestArray ) {		
					//console.log(requestArray);
					Materialize.toast(requestArray, 1000)
					//alert(requestArray);
					getStateButtons();					
				}).fail(function (jqXHR,status,err) {
					$('#modal1').openModal({
						dismissible: false,			
					});
					
				});
    
		}
		
	}	
	
});

function abre_portao(com){
	if(com == "abrir"){
		$.ajax({
					method: "POST",		
					url: "http://"+url+"/dash/send_m.php",
					timeout: 8000,
					data: { chave: chave, comando: portao}
				})
					.done(function( requestArray ) {		
					//console.log(requestArray);
					Materialize.toast(requestArray, 1000)
					//alert(requestArray);
					getStateButtons();					
				}).fail(function (jqXHR,status,err) {
					$('#modal1').openModal({
						dismissible: false,
			
					});
					
				});
    
		}
	if(com == "cancela"){
		$('#modal2').closeModal();
		console.log("Cancelar");
	}
		
}
	
	



function change_names(){
	var jsontext = window.localStorage.getItem('n_reles');
	var n_reles = JSON.parse(jsontext);
	//console.log(n_reles.rele1);
	
	
    $("#n_rele3").text(n_reles.rele3);
	$("#cor_rele3").addClass(n_reles.cor_rele3);
	$("#icon_rele3").addClass("flaticon-"+n_reles.icone_rele3);
	
	$("#n_rele4").text(n_reles.rele4);
	$("#cor_rele4").addClass(n_reles.cor_rele4);
	$("#icon_rele4").addClass("flaticon-"+n_reles.icone_rele4);
	
	$("#n_rele5").text(n_reles.rele5);
	$("#cor_rele5").addClass(n_reles.cor_rele5);
	$("#icon_rele5").addClass("flaticon-"+n_reles.icone_rele5);
	
	$("#n_rele6").text(n_reles.rele6);
	$("#cor_rele6").addClass(n_reles.cor_rele6);
	$("#icon_rele6").addClass("flaticon-"+n_reles.icone_rele6);
	
	$("#n_rele7").text(n_reles.rele7);
	$("#cor_rele7").addClass(n_reles.cor_rele7);
	$("#icon_rele7").addClass("flaticon-"+n_reles.icone_rele7);
	
	$("#n_rele8").text(n_reles.rele8);
	$("#cor_rele8").addClass(n_reles.cor_rele8);
	$("#icon_rele8").addClass("flaticon-"+n_reles.icone_rele8);
	
	$("#n_rele9").text(n_reles.rele9);
	$("#cor_rele9").addClass(n_reles.cor_rele9);
	$("#icon_rele9").addClass("flaticon-"+n_reles.icone_rele9);
	
	$("#n_rele10").text(n_reles.rele10);
	$("#cor_rele10").addClass(n_reles.cor_rele10);
	$("#icon_rele10").addClass("flaticon-"+n_reles.icone_rele10);
	
	$("#n_rele11").text(n_reles.rele11);
	$("#cor_rele11").addClass(n_reles.cor_rele11);
	$("#icon_rele11").addClass("flaticon-"+n_reles.icone_rele11);
	
	$("#n_rele12").text(n_reles.rele12);
	$("#cor_rele12").addClass(n_reles.cor_rele12);
	$("#icon_rele12").addClass("flaticon-"+n_reles.icone_rele12);
	
	$("#n_rele13").text(n_reles.rele13);
	$("#cor_rele13").addClass(n_reles.cor_rele13);
	$("#icon_rele13").addClass("flaticon-"+n_reles.icone_rele13);
	
	$("#n_rele14").text(n_reles.rele14);
	$("#cor_rele14").addClass(n_reles.cor_rele14);
	$("#icon_rele14").addClass("flaticon-"+n_reles.icone_rele14);
	
}
function getStateButtons(){   
    $("#bar").addClass('indeterminate');
	$.ajax({
		method: "POST",
		dataType: "json",
		url: "http://"+url+"/dash/m_api.php",
		timeout: 8000,
		data: { chave: chave ,comando: "estadorl"}
	})
		.done(function( requestArray ) {
		console.log(requestArray);
		var count = 1;
			for (i = 0; i <= 14; i++) {
				if(requestArray[i]== "1")	{				
				$( "#cb_"+count ).prop( "checked", true );
            		
			}	else{				
				$( "#cb_"+count ).prop( "checked", false );
			}
		count ++;
		$("#bar").removeClass('indeterminate');
	}

	}).fail(function (jqXHR,status,err) {
		stop = false;
		$('#modal1').openModal({
			 dismissible: false,
			
			});
		$("#bar").removeClass('indeterminate');
		
	});	
 

}



//Fecha o aplicativo se clicar em voltar
function onBackKeyDown() 
{
 navigator.app.exitApp();
}
  

// Initialize collapse button     
$('.button-collapse').sideNav({
	  show: false,
      menuWidth: 240, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );
 
 setInterval(function(){ 
	if(stop == true){
	getStateButtons();
	}
}, 10000);
