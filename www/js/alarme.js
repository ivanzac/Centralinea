var url = '';
var chave = '';	


//Fecha o aplicativo se clicar em voltar
function onBackKeyDown() 
{
 window.location.href = "index.html";
}

document.addEventListener("deviceready", onDeviceReady, false);
			
function onDeviceReady() {	
		document.addEventListener("backbutton", onBackKeyDown, false);
		Materialize.toast("Alarme", 1000);
        url = window.localStorage.getItem("ip");
		chave = window.localStorage.getItem("chave");
		$("#profile").text(window.localStorage.getItem("nome"));
		$('#ip').val(url);
		$('#password').val(chave);
		getlist();
		$("#rl_1").text(window.localStorage.getItem("rl_1"));
		$("#rl_2").text(window.localStorage.getItem("rl_2"));
		
       }

function getAlarm(){   
    $("#bar").addClass('indeterminate');
	$.ajax({
		method: "POST",
		dataType: "json",
		timeout: 8000,
		url: "http://"+url+"/dash/m_api.php",
		data: { chave: chave ,comando: "stalrm"}
	})
		.done(function( requestArray ) {
		// console.log(requestArray);
		for (i = 0; i <= requestArray.qtd_sensores - 1; i++) {
			if(requestArray.sensores.estado_sensores[i] == "0")	{
			
				$("#"+requestArray.sensores.sensor_map[i]+"").addClass("gps_ring");
				
			}
			
			if(requestArray.sensores.estado_sensores[i] == "1")	{
			
				$("#"+requestArray.sensores.sensor_map[i]+"").removeClass("gps_ring");
				
			}
		
		
		}
		$("#bar").removeClass('indeterminate');
	});
}


//Ativa e desativa o alarme
function alarme(value){
	$("#bar").addClass('indeterminate');
	var senha = $("#pass").val();
    $.ajax({
					method: "POST",	
					dataType: "json",
					timeout: 8000,
					url: "http://"+url+"/dash/send_m.php",
					data: { chave: chave, comando: value+":"+senha}
				})
					.done(function( requestArray ) {
					//getStateButtons();						
					if(requestArray.status_alarme == "1")	{			
						$("#display").text("Alarme Ativado");		
						}	
					else if(requestArray.status_alarme == "2"){ 
						$("#display").text("Alarme Disparado");		
					}
					else if(requestArray.status_alarme == "0"){         
						$("#display").text("Alarme Desativado");		
					}
					$("#bar").removeClass('indeterminate');
			})
			.fail(function (jqXHR,status,err) {
				//console.log(jqXHR.responseText );
				$("#display").text(jqXHR.responseText);	
			});
				
}

//Função que pega o estado dos contatos secos e atera cor icone e estado.
function getlist(){
	$("#bar").addClass('indeterminate');
    //var requestArray = httpGet("stalrm","api.php");
	$.ajax({
	method: "POST",
	dataType: "json",
	timeout: 8000,
	url: "http://"+url+"/dash/m_api.php",
	data: { chave: chave ,comando: "stalrm"}
	})
	.done(function( requestArray ) {	
		for (i = 0; i <= requestArray.qtd_sensores - 1; i++) {			
									                     
				$("#ul_sensores").append('<li class="collection-item"><i class="left prefix flaticon-surveillance37 grey-text"></i><div>'+requestArray.sensores.sensor_names[i]+'<a id="'+requestArray.sensores.sensor_map[i]+'" href="#!" class="secondary-content"></a></div></li>');
				//console.log(requestArray.sensores.sensor_names[i]);
		}
		if(requestArray.status_alarme == "1")	{			
			$("#display").text("Alarme Ativado");		
		}	
		else if(requestArray.status_alarme == "2"){ 
			$("#display").text("Alarme Disparado");		
		}
		else if(requestArray.status_alarme == "0"){         
			$("#display").text("Alarme Desativado");		
		}
		
		$("#bar").removeClass('indeterminate');
	})
	.fail(function (jqXHR,status,err) {
		$('#modal1').openModal({
			 dismissible: false,			
			}	
		);
	});	
}
  
$(".button-collapse").sideNav();

setInterval(function(){ 
	getAlarm();
}, 2000);
