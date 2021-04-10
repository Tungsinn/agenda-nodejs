import validator from 'validator';

export default class Cadastro {
    constructor(formClass) {
        this.form = document.querySelector(formClass);

    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        const el = e.target;
        const nomeInput = el.querySelector('input[name="nome"]');
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        const div = document.querySelector('.form-messages');
        let error = false;

        if(!nomeInput.value || !emailInput.value || !passwordInput.value) {
            div.innerHTML = 
            '<div class="row"><div class="col my-3"><div class="alert alert-danger">Preencha todos os campos para se cadastrar.</div></div></div>';
            error = true;
        } else if(!validator.isEmail(emailInput.value)) {
            div.innerHTML = 
            '<div class="row"><div class="col my-3"><div class="alert alert-danger">Email inválido.</div></div></div>';
            error = true;
        } else if(passwordInput.value.length < 6 || passwordInput.value.length > 20) {
            div.innerHTML = 
            '<div class="row"><div class="col my-3"><div class="alert alert-danger">A senha deve conter entre 6 e 20 caracteres.</div></div></div>';
            error = true;
        }

        if(!error) el.submit();
    }
}