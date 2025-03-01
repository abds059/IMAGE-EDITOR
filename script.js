let uploadinput = document.getElementById("Upload_img");
let uploadbutton = document.getElementById("Upload_btn");
let pictureframe = document.querySelector(".picture");

uploadbutton.addEventListener("click", () => {
    uploadinput.click();
});

uploadinput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            pictureframe.innerHTML = `<img src="${e.target.result}" id="Uploadedimage" 
            style="max-width: 100%; height: 100%; object-fit: cover;">`;
        };
        reader.readAsDataURL(file);
    }
});

// Get sliders and buttons
const brightnessBtn = document.getElementById("btn1");
const brightnessSlider = document.getElementById("brightnessSlider");
const saturationBtn = document.getElementById("btn2");
const saturationSlider = document.getElementById("saturationSlider");
const grayscaleBtn = document.getElementById("btn3");
const grayscaleSlider = document.getElementById("grayscaleSlider");
const contrastBtn = document.getElementById("btn4");
const contrastSlider = document.getElementById("contrastSlider");
const blurBtn = document.getElementById("btn5");
const blurSlider = document.getElementById("blurSlider");
const resetBtn = document.getElementById("btn6");
const downloadbtn = document.querySelector(".dn");

// Function to update image filters
function updateFilters() {
    const image = document.getElementById("Uploadedimage");
    if (image) {
        image.style.filter = `
            saturate(${saturationSlider.value}%) 
            brightness(${brightnessSlider.value}%) 
            grayscale(${grayscaleSlider.value}%) 
            contrast(${contrastSlider.value}%) 
            blur(${blurSlider.value}px)
        `;
    }
}

// Toggle sliders
brightnessBtn.addEventListener("click", () => {
    brightnessSlider.style.display = brightnessSlider.style.display === "none" ? "block" : "none";
});

saturationBtn.addEventListener("click", () => {
    saturationSlider.style.display = saturationSlider.style.display === "none" ? "block" : "none";
});

grayscaleBtn.addEventListener("click", () => {
    grayscaleSlider.style.display = grayscaleSlider.style.display === "none" ? "block" : "none";
});

contrastBtn.addEventListener("click", () => {
    contrastSlider.style.display = contrastSlider.style.display === "none" ? "block" : "none";
});

blurBtn.addEventListener("click", () => {
    blurSlider.style.display = blurSlider.style.display === "none" ? "block" : "none";
});

// Apply filters dynamically
brightnessSlider.addEventListener("input", updateFilters);
saturationSlider.addEventListener("input", updateFilters);
grayscaleSlider.addEventListener("input", updateFilters);
contrastSlider.addEventListener("input", updateFilters);
blurSlider.addEventListener("input", updateFilters);

// Reset Filters
resetBtn.addEventListener("click", () => {
    const image = document.getElementById("Uploadedimage");

    if (image) {
        image.style.filter = "none";

        // Reset slider values and UI
        brightnessSlider.value = 100;
        saturationSlider.value = 100;
        grayscaleSlider.value = 0;
        contrastSlider.value = 100;
        blurSlider.value = 0;
    }
});

// Download Edited Image
downloadbtn.addEventListener("click", () => {
    const image = document.getElementById("Uploadedimage");

    if (!image) {
        alert("No image uploaded");
        return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    // Apply filters to canvas
    ctx.filter = `
        brightness(${brightnessSlider.value}%)
        saturate(${saturationSlider.value}%)
        grayscale(${grayscaleSlider.value}%)
        contrast(${contrastSlider.value}%)
        blur(${blurSlider.value}px)
    `;

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});
