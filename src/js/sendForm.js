import { getPhoneMaskValue } from './phoneMask.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

export default async function sendFormData(form) {
    try {
        const response = await fetch('http://localhost:9090/api/registration', {
            method: 'POST',
            body: getFormData(form),
        });
        const data = await response.json();
        requestHandler(data, form);
    } catch (error) {
        console.error(error);
    }
}

function getFormData(form) {
    let formData = new FormData(form);
    formData.set('phone', getPhoneMaskValue());
    return formData;
}

function requestHandler(response, form) {
    switch (response.status) {
        case 'success':
            form.reset();
            showSuccessMessage(response.msg);
            break;
        case 'error':
            for (let [key, value] of Object.entries(response.fields)) {
                showErrorMessage(value);
            }
            break;
    }
}
