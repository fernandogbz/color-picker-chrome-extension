//Getting variables
const colorPickerBtn = document.querySelector("#color-picker");
const pickedColors = [];

const activateEyeDropper = async () => {
  try {
    const eyeDropper = new EyeDropper(); // Creating a new eye dropper object. It's used to select colors from the screen
    const { sRGBHex } = await eyeDropper.open(); // Waiting to open the eyeDropper to get the color
    navigator.clipboard.writeText(sRGBHex); // Copy the selected color to the clipboard

    pickedColors.push(sRGBHex); // Selected color added to the pickedColors array

    // Store picked colors to localstorage and show them
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors)); // picked.colors is the name of item and second is the value
  } catch(error) {
    console.log(error);
  }
}

colorPickerBtn.addEventListener("click", activateEyeDropper);
