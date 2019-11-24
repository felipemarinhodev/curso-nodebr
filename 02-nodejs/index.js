/*
	0 Obter um usuario
	1 Obter o numero de telefone de um usuario a partir de seu Id
	2 Obter o endereço do usuario pelo Id
*/
// importamos um módulo interno do Node.js
const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
	// quando der algum problema -> reject(error)
	// quando der sucesso -> resolve
	return new Promise(function resolvePromise(resolve, reject) {
		setTimeout(function () {
			// return reject(new Error('Deu ruim de verdade!'));

			return resolve({
				id: 1,
				nome: 'Aladin',
				dataNascimento: new Date()
			})
		}, 1000);
	});
}

function obterTelefone(idUsuario) {
	return new Promise(function resolverPromise(resolve, reject) {
		setTimeout(() => {
			return resolve({
				telefone: '1199002',
				ddd: 11
			})
		}, 2000);
	});
}

function obterEndereco(idUsuario, callback) {
	setTimeout(() => {
		return callback(null, {
			rua: 'dos bobos',
			numero: 0
		})
	}, 2000);
}

// 1º passo adicionar a palavra async -> automaticamente ela retornará uma Promise
main()
async function main() {
	try {
		console.time('medida-promise');
		const usuario = await obterUsuario();
		// const telefone = await obterTelefone(usuario.id);
		// const endereco = await obterEnderecoAsync(usuario.id);
		const resultado = await Promise.all([
			obterTelefone(usuario.id),
			obterEnderecoAsync(usuario.id)
		]);
		const endereco = resultado[1];
		const telefone = resultado[0];

		console.log(`
			Nome: ${usuario.nome},
			Endereço: ${endereco.rua}, ${endereco.numero}
			Telefone: (${telefone.ddd}) ${telefone.telefone}
		`);
		console.timeEnd('medida-promise');
	} catch (error) {
		console.error('Deu Ruim', error);
		
	}
}

// const usuarioPromise = obterUsuario();
// // para manipular o sucesso usammos a função .then
// // para manipular erros, usamos o .catch
// // usuario -> telefone ->
// usuarioPromise
// 	.then(function (usuario) {
// 		console.time('medida-promise-old');
// 		return obterTelefone(usuario.id)
// 			.then(function resolverTelefone(result) {
// 				return {
// 					usuario: {
// 						nome: usuario.nome,
// 						id: usuario.id
// 					},
// 					telefone: result
// 				}
// 			});
// 	})
// 	.then(function (resultado) {
// 		const endereco = obterEnderecoAsync(resultado.usuario.id);
// 		return endereco.then(function resolverEndereco(result) {
// 			return {
// 				usuario: resultado.usuario,
// 				telefone: resultado.telefone,
// 				endereco: result
// 			}
// 		})
		
// 	})
// 	.then(function (resultado) {
// 		console.log(`
// 			Nome: ${resultado.usuario.nome}
// 			Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
// 			Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
// 		`);

// 		console.timeEnd('medida-promise-old');
// 	})
// 	.catch(function (error) {
// 		console.error('Deu ruim', error);
// 	});

// obterUsuario(function resolverUsuario(error, usuario) {
// 	// null || "" || 0 === false
// 	if (error) {
// 		console.error('Erro ao obter usuario: ', error);
// 		return;
// 	}
// 	obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
// 		if (error1) {
// 			console.error('Erro ao obter o telefone: ', error1);
// 			return;
// 		}
		
// 		obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
// 			if (error2) {
// 				console.error('Erro ao obter o endereço: ', error2);
// 				return;
// 			}
// 			console.log(`
// 				Nome: ${usuario.nome},
// 				Endereço: ${endereco.rua}, ${endereco.numero}
// 				Telefone: (${telefone.ddd}) ${telefone.telefone}
// 			`);
			
// 		})
// 	})
// });
