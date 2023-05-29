//Getting variables
const colorPickerBtn = document.querySelector("#color-picker");

const activateEyeDropper = () => {
  try {
    const eyeDropper = new eyeDropper(); // Creating a new eye dropper object. It's used to select colors from the screen
  } catch(error) {
    console.log(error);
  }
}

colorPickerBtn.addEventListener("click", activateEyeDropper);