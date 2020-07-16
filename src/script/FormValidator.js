export class FormValidator {
    /*
        Надо исправить: не использовать глобальную переменную errorMessages в классе
        а передавать её как параметр конструктора
    */

    constructor(form, errorMessages) {
        this.form = form;
        this.errorMessages = errorMessages;
    }

    setEventListeners() {
        this
            .form
            .addEventListener('input', this.setSubmitButtonState);
        this
            // .form
            // .addEventListener('input', this.checkInputValidity);

            .form.addEventListener('input', () => {
            this.checkInputValidity(event);

            //event - Deprecated symbol used, consult docs for better alternative,
            // но как покрасоте сделть без него пока не придумал
        });
    }

    checkInputValidity(event) {

        const input = event.target
        const errorElem = input.nextElementSibling;
        input.setCustomValidity("");
        errorElem.textContent = "";

        if (input.validity.valueMissing) {
            input.setCustomValidity(this.errorMessages.empty);
            errorElem.textContent = input.validationMessage;
        } else if (input.validity.tooShort || input.validity.tooLong) {
            input.setCustomValidity(this.errorMessages.wrongLength);
            errorElem.textContent = input.validationMessage;
        } else if (input.validity.typeMismatch && input.type === 'url') {
            input.setCustomValidity(this.errorMessages.wrongUrl);
            errorElem.textContent = input.validationMessage;
        }
    }

    setSubmitButtonState(event) {

        const submit = event.currentTarget.querySelector('.button');
        const popupForm = event.target.closest("form");

        console.log(popupForm.checkValidity());
        console.log(submit);
        if (popupForm.checkValidity()) {
            submit.removeAttribute('disabled');
        } else {
            submit.setAttribute('disabled', "");
        }
    }

    resetError() {
        this.form.querySelectorAll(".error").forEach(function (elem) {
            elem.textContent = "";
        });
    }
}