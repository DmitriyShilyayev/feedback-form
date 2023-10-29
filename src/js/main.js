import '../scss/styles.scss';
import phoneMaskModuleInit from './phoneMask.js';
import setFormListener from './validateForm.js';
import initModal from './modal.js';

let phoneInput = document.querySelector('#phone-wrapper'),
    formElement = document.querySelector('#form'),
    fieldWrappers = document.querySelectorAll(
        '.field:not(#phone-wrapper):not(#email-wrapper)'
    ),
    modalTrigger = document.querySelectorAll('.modal-trigger');

phoneMaskModuleInit(phoneInput);
setFormListener(formElement, fieldWrappers);
initModal(modalTrigger);
