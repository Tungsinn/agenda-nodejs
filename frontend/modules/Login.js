import validator from 'validator';

export default class Login {
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
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');
        const div = document.querySelector('.form-messages');
        let error = false;

        if(!validator.isEmail(emailInput.value)) {
            div.innerHTML = 
            '<div class="row"><div class="col my-3"><div class="alert alert-danger">Email e/ou senha incorretos.</div></div></div>';
            error = true;
        }
        if(passwordInput.value.length < 6 || passwordInput.value.length > 20) {
            div.innerHTML = 
            '<div class="row"><div class="col my-3"><div class="alert alert-danger">Email e/ou senha incorretos.</div></div></div>';
            error = true;
        }

        if(!error) el.submit();
    }
}