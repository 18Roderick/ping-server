(function() {
	var socket = io.connect();
	socket.on('this', function(data) {
		console.log(data);

	});

})()



function validateEmail(text) {
	const url = `/validar-correo/${text}`;
	const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	if (emailRegex.test(text)) {
		document.getElementById('correo').innerHTML = `Tu correo ${text} cumple las condiciones`;
		fetch(url)
			.then(response => {

				if (!response.ok) {

					return new Error(`Error en la peticion ${response.statusText}`);

				}

				return response.json();

			})
			.then(threads => {

				if (!threads.disponible) {
					document.getElementById('disponible').innerHTML = 'Este correo ya esta siendo utilizado'
				}else{
					document.getElementById('disponible').innerHTML = ''
				}

			})
			.catch((error) => {

				console.log(error);

			})
	} else {
		document.getElementById('correo').innerHTML = '';
	}
}


function validarContenido(password){
	
}

