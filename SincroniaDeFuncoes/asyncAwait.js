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

async function main() {
  try {
    console.time("async-await")

    const usuario = await obterUsuario()

    const allPromiseReult = await Promise.all([
        obterTelefoneAsync(usuario.id),
        obterEnderecoAsync(usuario.id)
      ]
    )

    const telefone = allPromiseReult[0]
    const endereco = allPromiseReult[1]

    console.log(`
      Nome: ${usuario.name},
      Telefone: ${telefone.phoneNumber},
      Endereço: ${endereco.street}, ${endereco.number}
    `)

    console.timeEnd("async-await")
  } catch(error) {
    console.error("Ocorreu um erro", error)
  }
}

main()
