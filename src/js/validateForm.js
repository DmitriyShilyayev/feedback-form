import { setPhoneInputHandler, checkPhoneMaskValidity } from './phoneMask.js';
import sendFormData from './sendForm.js';

export default function setFormListener(form, fieldWrappers) {
    form.addEventListener('submit', (event) => {
        formListener(event, fieldWrappers, form);
    });

    form.addEventListener(
        'submit',
        () => {
            fieldWrappers.forEach((fieldWrapper) => {
                let field = fieldWrapper.querySelector('input, textarea');

                field.addEventListener('input', () => {
                    validateField(fieldWrapper);
                });
                validateField(fieldWrapper);
            });
            setPhoneInputHandler();
            setEmailValidation();
        },
        { once: true }
    );
}

function formListener(event, fieldWrappers, form) {
    event.preventDefault();
    let isValid = checkFormValidity(fieldWrappers);

    if (!checkPhoneMaskValidity()) {
        isValid = false;
    }

    if (isValid) {
        sendFormData(form);
    }
}

function checkFormValidity(fieldWrappers) {
    let isValid = true;

    fieldWrappers.forEach((fieldWrapper) => {
        let field = fieldWrapper.querySelector('input, textarea');
        if (!checkFieldValidity(field)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(fieldWrapper) {
    let field = fieldWrapper.querySelector('input, textarea'),
        errorWrapper = fieldWrapper.querySelector('.error-container');
    if (field.validity.valid) {
        fieldWrapper.classList.remove('error');
        setErrorMessage(errorWrapper, '');
    } else if (field.validity.valueMissing) {
        fieldWrapper.classList.add('error');
        setErrorMessage(errorWrapper, field.dataset.errorEmptyMessage);
    }

    if (field.validity.typeMismatch) {
        fieldWrapper.classList.add('error');
        setErrorMessage(errorWrapper, field.dataset.errorTypeMessage);
    }
}

function setEmailValidation() {
    let emailWrapper = document.querySelector('#email-wrapper'),
        emailField = emailWrapper.querySelector('input, textarea');
    emailField.addEventListener('input', () => {
        validateEmailField(emailWrapper);
    });
    validateEmailField(emailWrapper);
}

function validateEmailField(fieldWrapper) {
    let field = fieldWrapper.querySelector('input, textarea'),
        errorWrapper = fieldWrapper.querySelector('.error-container');
    if (field.validity.valueMissing) {
        fieldWrapper.classList.add('error');
        setErrorMessage(errorWrapper, field.dataset.errorEmptyMessage);
    } else if (!checkEmailValidity(field)) {
        fieldWrapper.classList.add('error');
        setErrorMessage(errorWrapper, field.dataset.errorTypeMessage);
    } else {
        fieldWrapper.classList.remove('error');
        setErrorMessage(errorWrapper, '');
    }
}

function checkEmailValidity(field) {
    var re =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(field.value).toLowerCase());
}

function checkFieldValidity(field) {
    return field.validity.valid;
}

export function setErrorMessage(errorWrapper, errorMessage) {
    errorWrapper.innerHTML = errorMessage || '';
}
