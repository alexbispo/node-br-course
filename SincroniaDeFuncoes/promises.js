const util = require('util')

function obterUsuario() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Obter usuário")

      // return reject(new Error("Some Error"))

      return resolve({
        id: 1,
        name: "Mozart"
      })

    }, 1000)
  })
}

function obterTelefone(idUsuario, callback) {
	setTimeout(() => {
		console.log(`Obter telefone usuário id: ${idUsuario}`)

		return callback(null, {
			id: 1,
			phoneNumber: "11999998888",
			ddd: 11
		})
	}, 2000)
}

function obterEndereco(idUsuario, callback) {
	setTimeout(() => {
		console.log(`Obter endereco usuário id: ${idUsuario}`)

		return callback(null, {
			street: "Rua da amizade",
			number: "54"
		})
	}, 2000);
}

const obterTelefoneAsync = util.promisify(obterTelefone)
const obterEnderecoAsync = util.promisify(obterEndereco)

obterUsuario()
  .then((usuario) => {
    return obterTelefoneAsync(usuario.id)
      .then((telefone) => {
        return {
          usuario: usuario,
          telefone: telefone
        }
      })
  })
  .then((partialResult) => {
    const usuario = partialResult.usuario
    const telefone = partialResult.telefone

    obterEnderecoAsync(usuario.id)
      .then((endereco) => {
        console.log(`
          Nome: ${usuario.name},
          Telefone: ${telefone.phoneNumber},
          Endereço: ${endereco.street}, ${endereco.number}
        `)
      })
  })
  .catch((error) => {
    console.error("Ocorreu um erro", error)
  })
