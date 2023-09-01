const draggable = document.getElementsByClassName("wallet-inner");
let droppable = document.getElementById("droppable");

for (let i = 0; i < draggable.length; i++) {
    draggable[i].addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", event.target.id);
        console.log(draggable[i])
    });
}

droppable.addEventListener("dragover", (event) => {
    event.preventDefault();
});

droppable.addEventListener("drop", (event) => {
    event.preventDefault();
    const draggableId = event.dataTransfer.getData("text/plain");
    const draggedElement = document.getElementById(draggableId);

    // Do something with the dropped element's ID
    console.log(`Dropped element with ID: ${draggableId}`);

    // Append the dragged element to the droppable div
        droppable.appendChild(draggedElement);
    });


loginForm.addEventListener("submit", (e) => {

    let username = document.getElementById("username");
    let password = document.getElementById("password");

    if (username.value == "" || password.value == "") {
        e.preventDefault();
    }
});

