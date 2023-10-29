export default function initModal(triggers) {
    triggers.forEach((trigger) => {
        trigger.addEventListener('click', toggleModal);
    });
}

function toggleModal() {
    document.querySelector('body').classList.toggle('open-modal');
}
