const bcrypt = require('bcrypt');
const knex = require('../connection');
const registerUserSchema = require('../validations/userSchemas');
const nodemailer = require('../nodemailer')


const createUser = async (req, res) => {

    const { nome, email, senha } = req.body

    try{

        await registerUserSchema.validate(req.body);

        const emailEncontrado = await knex('users').where('email', email).first();
 
        if (emailEncontrado !== undefined){
            return res.status(400).json("Já existe um usuário cadastrado com esse email");
        }

        const passwordEncrypted = await bcrypt.hash(senha, 10);

        const dadosDoUsuario = {
            nome: nome,
            email: email,
            senha: passwordEncrypted
        }

        const usuarioCadastrado = await knex('users').insert(dadosDoUsuario)

       

        const dadosEnvio = {
            from: 'App Newsletter <nao-responder@yasminhohenfeld.com.br>',
            to: email,
            subject: 'Bem vindo ao App Newsletter',
            text: `Olá, ${nome}, você realizou um cadastro no app newsletter. Você pode fazer o login com o email: ${email}`,

        }

        nodemailer.sendMail(dadosEnvio);

        return res.status(200).json(`Cadastrado com sucesso, ${nome}!`)
    }catch (error){
        return res.status(500).json(error.message);
    }

}

module.exports = {
    createUser
}