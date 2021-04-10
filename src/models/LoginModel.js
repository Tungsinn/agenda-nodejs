const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: {type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
},
    { collection: 'users'}
);

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        // body -> campos do formulário
        this.body = body;
        // Se houver algum erro no array, não cadastra o usuário na BD
        this.errors = [];
        this.user = null;
    }

    async login() {
        this.valida();
        if(this.errors.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email });

        if(!this.user) {
            this.errors.push('Usuário não existe. Cadastre-se para usar a agenda.');
            return;
        } 

        // Compara a senha enviada com o hash na BD
        if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha incorreta.');
            this.user = null;
            return;
        }

    }

    async register() {
        this.valida();
        await this.userExists();
        if(this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
        this.user = await LoginModel.create(this.body);
    }

    async userExists() {
       this.user = await LoginModel.findOne({ email: this.body.email });
       if(this.user) this.errors.push('Usuário já existe.');
    }

    valida() {
        // Validação dos campos
        this.cleanUp();

        // O e-mail precisa ser válido
        if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido');

        // A senha precisa ter entre 6 e 20 caracteres
        if(this.body.password.length < 6 || this.body.password.length > 20) {
            this.errors.push('A senha precisa ter entre 6 e 20 caracteres.');
        }
    }

    cleanUp() {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                // Converte para uma string vazia
                this.body[key] = '';
            }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            password: this.body.password
        }
    }
};

module.exports = Login;