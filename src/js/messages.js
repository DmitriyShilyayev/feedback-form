export function showSuccessMessage(message) {
    let messageHtml = `<div class="success-message">${message}</div>`;
    showMessage(messageHtml);
}

export function showErrorMessage(message) {
    let messageHtml = `<div class="error-message">${message}</div>`;
    showMessage(messageHtml);
}

const messageContainer = document.querySelector('.message-container');

function showMessage(message) {
    messageContainer.innerHTML = messageContainer.innerHTML + message;
    clearMessage();
}

function clearMessage() {
    setTimeout(() => {
        messageContainer.firstElementChild.remove();
    }, 3000);
}
