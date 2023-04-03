const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
// lets create a function to initialise the game
function initGame(){
    currentPlayer = "X"
    gameGrid=["","","","","","","","",""]
    newGameBtn.classList.remove("active")
    gameInfo.innerText = `Current Player - ${currentPlayer}`
    boxes.forEach((box,index) => {
        box.innerText =""
        boxes[index].style.pointerEvents="all"
        boxes[index].classList.remove("win")
        // OR
        // box.classList = `box box${index+1}`
    })

}



initGame()


function checkGameOver(){
    let result = "";

    winningPosition.forEach((position) => {
        // all 3 boxes should be non empty and exact the same
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" ) 
                && (gameGrid[position[0]] === gameGrid[position[1]] ) && ( gameGrid[position[1]] ===gameGrid[position[2]])){

                    // check the grid contain X
                    if(gameGrid[position[0]] === "X"){
                            result="X"
                    }else{
                        result="O"
                    }

                    // disable pointer event
                    boxes.forEach((box) => {
                        box.style.pointerEvents = "none"
                    })

                    // Now we know x/o is winner
                    boxes[position[0]].classList.add("win")
                    boxes[position[1]].classList.add("win")
                    boxes[position[2]].classList.add("win")

                }



})

    // If someone is winner
    if(result != ""){
        gameInfo.innerText =   `Winner Player - ${result}`
        newGameBtn.classList.add("active")
        return
    }
    
//    if all boxes are filled
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box !== ""){
            fillCount++;
        }
    });

    // ?board is filled
    if(fillCount === 9){
        gameInfo.innerText =  "Game Tied !"
        newGameBtn.classList.add("active")
    }


}



function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }else{
        currentPlayer = "X"
    }

    gameInfo.innerText= `Current Player - ${currentPlayer}`;
}


function handleClick(index){
    if(gameGrid[index] === "" ){
        boxes[index].innerText = currentPlayer
        boxes[index].style.pointerEvents ="none"
        gameGrid[index] = currentPlayer
        // swap karo player ko
        swapTurn();
        // check koi jeet toj nhi gaya
        checkGameOver();
    }


}



boxes.forEach((box,index) => {
    box.addEventListener("click" ,() =>{
        handleClick(index)
    })
})


newGameBtn.addEventListener("click" ,initGame)