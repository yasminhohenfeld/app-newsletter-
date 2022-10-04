const bcrypt = require('bcrypt');
const knex = require('../connection');
const loginSchema = require('../validations/loginSchemas');
const nodemailer = require('../nodemailer')


const login = async (req, res) => {

    const { email, senha } = req.body
    try{
        await loginSchema.validate(req.body);
        const emailEncontrado = await knex('users').where('email', email).first();
        
        if (emailEncontrado === undefined){
            return res.status(400).json("Não existe um usuário cadastrado com esse email")
        }

        const senhaVerificada = await bcrypt.compare(senha, emailEncontrado.senha);

        if (senhaVerificada === false){
            return res.status(400).json ("Senha incorreta)")
        }

        const dadosEnvio = {
            from: 'App Newsletter <nao-responder@yasminhohenfeld.com.br>',
            to: email,
            subject: 'Você acabou de fazer login',
            text: `Olá você acabou de fazer login no nosso app newsletter com o ${email}!`,

        }
        nodemailer.sendMail(dadosEnvio)

        return res.send("OK")
    }catch (error){
        return res.status(500).json(error.message)
    }
}

module.exports = login