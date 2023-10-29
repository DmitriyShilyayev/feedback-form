import IMask from 'imask';
import { setErrorMessage } from './validateForm.js';

let mask = '+{375}(00)000-00-00',
    phoneInput,
    errorWrapper,
    phoneMask,
    phoneWrapper,
    initiateMask = function () {
        phoneMask = new IMask(phoneInput, {
            mask,
        });
    };

export default function phoneMaskModuleInit(fieldWrapper, maskValue) {
    phoneWrapper = fieldWrapper;
    phoneInput = fieldWrapper.querySelector('input');
    errorWrapper = fieldWrapper.querySelector('.error-container');

    if (maskValue) {
        mask = maskValue;
    }

    initiateMask();
}
export function setPhoneInputHandler() {
    phoneInput.addEventListener('input', validatePhoneMask);
    validatePhoneMask();
}
function validatePhoneMask() {
    if (phoneMask.masked.isComplete) {
        phoneWrapper.classList.remove('error');
        setErrorMessage(errorWrapper, '');
    } else {
        phoneWrapper.classList.add('error');
        if (phoneInput.validity.valueMissing) {
            setErrorMessage(errorWrapper, phoneInput.dataset.errorEmptyMessage);
        } else {
            setErrorMessage(errorWrapper, phoneInput.dataset.errorTypeMessage);
        }
    }
}
export function checkPhoneMaskValidity() {
    return phoneMask ? phoneMask.masked.isComplete : true;
}
export function getPhoneMaskValue() {
    return phoneMask.masked.unmaskedValue;
}
