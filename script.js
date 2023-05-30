//Getting variables
const colorPickerBtn = document.querySelector("#color-picker");
const pickedColors = [];

const activateEyeDropper = async () => {
  try {
    const eyeDropper = new EyeDropper(); // Creating a new eye dropper object. It's used to select colors from the screen
    const { sRGBHex } = await eyeDropper.open(); // Waiting to open the eyeDropper to get the color
    navigator.clipboard.writeText(sRGBHex); // Copy the selected color to the clipboard

    pickedColors.push(sRGBHex); // Selected color added to the pickedColors array
    console.log(pickedColors);
  } catch(error) {
    console.log(error);
  }
}

colorPickerBtn.addEventListener("click", activateEyeDropper);

// Store picked colors to localstorage and show them