let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newBtn = document.querySelector(".new-btn");
let resultContainer = document.querySelector(".result-container");
let result = document.querySelector("#result");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () =>{
    turnO = true;
    enableBox();
    resultContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        console.log("box was clicked")
        
        if(turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const showWinner = (val1) => {
    result.innerText = `Congratulations! Winner is ${val1}`;
    resultContainer.classList.remove("hide");
    disableBox();
};


const disableBox = () =>{
    for (let box of boxes) {
        box.disabled = true;
    };
};

const enableBox = () =>{
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    };
};


const checkWinner = () => {
    for (let pattern of winPatterns) {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if (val1 !='' && val2 !='' && val3 !='') {
            if (val1 === val2 && val2 === val3) {
                console.log("winner", val1);
                showWinner(val1);
            }
        }
    }
}

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);