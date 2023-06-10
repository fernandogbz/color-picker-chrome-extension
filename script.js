//Getting variables
const colorPickerBtn = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors");
const clearAll = document.querySelector(".clear-all");
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]"); // Getting the chosen colors from local storage or an empty array

// Copy the color code on click
const copyColor = elem => {
  navigator.clipboard.writeText(elem.dataset.color); // copying the data-color value of span
  elem.innerText = "Copied"; //updating the color text to "copied"
  setTimeout(() => elem.innerText = elem.dataset.color, 1000); // after 1000ms, the text will revert back to the color code
}

const showColors = () => {
  if(!pickedColors.length) return; // Returning if there are no picked colors
  colorList.innerHTML = pickedColors.map(color => 
    `
    <li class="color">
      <span class="rect" style="background: ${color}; border: 1px solid ${color == "#ffffff" ? "#ccc" : color}"></span> 
      <span class="value" data-color="${color}">${color}</span>
    </li>
    `).join(""); // Generating li for the picked color and adding it to the colorList
    //span rect border = if color is equal to #fff(white), add the gray border, else add the picked color border
    
    document.querySelector(".picked-colors").classList.remove("hide"); // Show colors
    
    // Click event listener added to each color element to copu the color code
    document.querySelectorAll(".color").forEach(li => {
      li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
    })
}

showColors();

const activateEyeDropper = async () => {
  document.body.style.display = "none";
  try {
    const eyeDropper = new EyeDropper(); // Creating a new eye dropper object. It's used to select colors from the screen
    const { sRGBHex } = await eyeDropper.open(); // Waiting to open the eyeDropper to get the color
    navigator.clipboard.writeText(sRGBHex); // Copy the selected color to the clipboard
    
    // Adding the color to the list if it doesn't already exist
    if(!pickedColors.includes(sRGBHex)){
      pickedColors.push(sRGBHex); // Selected color added to the pickedColors array
      
      // Store picked colors to localstorage and show them
      localStorage.setItem("picked-colors", JSON.stringify(pickedColors)); // picked.colors is the name of item and second is the value
      showColors();
    }
  } catch(error) {
    console.log("Failed to copy the color code");
  }
  document.body.style.display = "block";
}

// Clearing all picked colors, updating localstorage and hidiing the pickedColors element
const clearAllColors = () => {
  pickedColors.length = 0;
  localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
  
  document.querySelector(".picked-colors").classList.add("hide"); // Hide colors wrapper if there aren't any colors to show
}

clearAll.addEventListener("click", clearAllColors); // Remove all colors on "Clear All"
colorPickerBtn.addEventListener("click", activateEyeDropper);