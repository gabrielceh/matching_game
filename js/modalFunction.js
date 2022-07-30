export const modalFunction = (isModalOpen, modal, containerMsg, msg) => {
  containerMsg.innerHTML = '';
  if (isModalOpen) {
    modal.classList.add('show');
    containerMsg.innerHTML = msg;
  }
};
