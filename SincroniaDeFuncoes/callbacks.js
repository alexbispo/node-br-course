function obterUsuario(callback) {
	setTimeout(() => {
		console.log("Obter usuário")

		return callback(null, {
			id: 1,
			name: "Mozart"
		})
	}, 1000)
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

obterUsuario((error, usuario) => {
	if (error) {
		console.error("Ocorreu um erro ao obter usuário", error)
		return
	}

	obterTelefone(usuario.id, (errorObterTelefone, telefone) => {
		if (errorObterTelefone) {
			console.error("Ocorreu um erro ao obter telefone", errorObterTelefone)
			return
		}
		obterEndereco(usuario.id, (errorObterEndereco, endereco) => {
			if (errorObterEndereco) {
				console.error("Erro ao obter endereço", errorObterEndereco)
				return
			}

			console.log(`
				Nome: ${usuario.name},
				Telefone: ${telefone.phoneNumber},
				Endereço: ${endereco.street}, ${endereco.number}
			`)
		})
	})

})

