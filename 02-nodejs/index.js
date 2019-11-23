/*
	0 Obter um usuario
	1 Obter o numero de telefone de um usuario a partir de seu Id
	2 Obter o endereço do usuario pelo Id
*/

function obterUsuario(callback) {
	setTimeout(function () {
		return callback(null, {
			id: 1,
			nome: 'Aladin',
			dataNascimento: new Date()
		})
	}, 1000);
}

function obterTelefone(idUsuario, callback) {
	setTimeout(function () {
		return callback(null, {
			telefone: '1199002',
			ddd: 11
		})
	}, 2000);
}

function obterEndereco(idUsuario, callback) {
	setTimeout(() => {
		return callback(null, {
			rua: 'dos bobos',
			numero: 0
		})
	}, 2000);
}

function resolverUsuario(erro, usuario) {
	console.log('usuario ', usuario);
}

obterUsuario(function resolverUsuario(error, usuario) {
	// null || "" || 0 === false
	if (error) {
		console.error('Erro ao obter usuario: ', error);
		return;
	}
	obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
		if (error1) {
			console.error('Erro ao obter o telefone: ', error1);
			return;
		}
		
		obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
			if (error2) {
				console.error('Erro ao obter o endereço: ', error2);
				return;
			}
			console.log(`
				Nome: ${usuario.nome},
				Endereço: ${endereco.rua}, ${endereco.numero}
				Telefone: (${telefone.ddd}) ${telefone.telefone}
			`);
			
		})
	})
});
