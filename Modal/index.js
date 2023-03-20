const modal=document.querySelector(".modal")
const overlay=document.querySelector(".overlay")

// Modal open
const openModal = () =>{
    console.log("Modal is Open");
    modal.classList.add("active")
    overlay.classList.add("overlayactive")
}

// Modal close
const closeModal = () =>{
    modal.classList.remove("active")
    overlay.classList.remove("overlayactive")
}