//Getting variables
const colorPickerBtn = document.querySelector("#color-picker");

const activateEyeDropper = async () => {
  try {
    const eyeDropper = new EyeDropper(); // Creating a new eye dropper object. It's used to select colors from the screen
    const response = await eyeDropper.open();
    console.log(response)
  } catch(error) {
    console.log(error);
  }
}

colorPickerBtn.addEventListener("click", activateEyeDropper);