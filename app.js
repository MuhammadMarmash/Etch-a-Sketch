const container = document.querySelector(".container");
const colorPicker = document.querySelector("#colorPicker");
const sizeSlider = document.querySelector("#sizeSlider");
const colorBtn = document.querySelector("#colorBtn");
const rainbowBtn = document.querySelector("#rainbowBtn");
const eraserBtn = document.querySelector("#eraserBtn");
const clearBtn = document.querySelector("#clearBtn");
const sizeValue = document.querySelector("#sizeValue");

let chosenColor = colorPicker.value;
colorPicker.addEventListener("input", function (e) {
    chosenColor = this.value;
});

let containerChildrens = [];

clearBtn.onclick = () => {
    containerChildrens.forEach(square => {
        square.style.backgroundColor = ""; 
    });
};

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

let mode = "color";

colorBtn.onclick = () => changeMode(colorBtn.textContent);
rainbowBtn.onclick = () => changeMode(rainbowBtn.textContent);
eraserBtn.onclick = () => changeMode(eraserBtn.textContent);

function changeMode(name){
    colorBtn.classList.remove("currentMode");
    rainbowBtn.classList.remove("currentMode");
    eraserBtn.classList.remove("currentMode");
    switch (name){
        case "Color mode":
            mode = "color";
            colorBtn.classList.add("currentMode");
            break;
        case "Rainbow mode":
            mode = "rainbow";
            rainbowBtn.classList.add("currentMode");
            break;
        case "Eraser":
            mode = "eraser";
            eraserBtn.classList.add("currentMode");
            break;
    }
    // #333
}

function changeColor(e){
    if(e.type === "mouseover" && !mouseDown) return;
    switch (mode){
        case "color":
            this.style.backgroundColor = chosenColor; 
            break;
        case "rainbow":
            const randomR = Math.floor(Math.random() * 256)
            const randomG = Math.floor(Math.random() * 256)
            const randomB = Math.floor(Math.random() * 256)
            this.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
            break;
        case "eraser":
            this.style.backgroundColor = ""; 
            break;
    }
}

function changeGrid(){
    containerChildrens = [];
    let size = sizeSlider.value;
    container.style.cssText += `grid-template-columns: repeat(${size}, auto);`;
    for(let i =0;i<(size**2);i++){
        const square = document.createElement("div");
        square.addEventListener('mouseover', changeColor)
        square.addEventListener("mousedown", changeColor);
        containerChildrens.push(square);
    }
    container.replaceChildren(...containerChildrens);
}


sizeSlider.addEventListener("change", changeGrid);
sizeSlider.addEventListener("input", (e) => {
    sizeValue.textContent = `${sizeSlider.value} x ${sizeSlider.value}`;
});

window.onload = () => {
    changeGrid();
    changeMode("Color mode");
}
