export const showAlert = (message, duration = 5000) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ff4d4d;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 1000;
    font-family: Arial, sans-serif;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    animation: fadeIn 0.3s ease-in-out;
  `;
  alertContainer.textContent = message;
  
  document.body.appendChild(alertContainer);
  
  setTimeout(() => {
    alertContainer.style.animation = 'fadeOut 0.3s ease-in-out';
    setTimeout(() => alertContainer.remove(), 300);
  }, duration);
  
  return alertContainer;
};

export const showSuccessMessage = (message, duration = 5000) => {
  const successContainer = document.createElement('div');
  successContainer.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #4CAF50;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 1000;
    font-family: Arial, sans-serif;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    animation: fadeIn 0.3s ease-in-out;
  `;
  successContainer.textContent = message;
  
  document.body.appendChild(successContainer);
  
  setTimeout(() => {
    successContainer.style.animation = 'fadeOut 0.3s ease-in-out';
    setTimeout(() => successContainer.remove(), 300);
  }, duration);
  
  return successContainer;
};

export const toggleSubmitButton = (isDisabled) => {
  const submitButton = document.querySelector('.img-upload__submit');
  if (submitButton) {
    submitButton.disabled = isDisabled;
    submitButton.textContent = isDisabled ? 'Отправка...' : 'Опубликовать';
    submitButton.style.opacity = isDisabled ? '0.7' : '1';
    submitButton.style.cursor = isDisabled ? 'not-allowed' : 'pointer';
  }
};

export const isValidFileType = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type);
};

export const addAnimationStyles = () => {
  if (!document.querySelector('#animation-styles')) {
    const style = document.createElement('style');
    style.id = 'animation-styles';
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
      @keyframes fadeOut {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
      }
    `;
    document.head.appendChild(style);
  }
};

addAnimationStyles();