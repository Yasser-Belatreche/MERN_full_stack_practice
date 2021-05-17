const input = document.querySelector("input");
const submitBtn = document.querySelector(".submit-btn");
const listContainer = document.querySelector(".list-container");
const listItems = [...document.querySelectorAll(".list-item")];
const doneList = document.querySelector(".done-container");


// ----------------- events listener -----------------
submitBtn.addEventListener("click", addItem);
document.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
        addItem();
    }
});


// ----------------- functions ---------------

// add item
function addItem() {
    const value = input.value;
    if (!value) {
        return;
    }
    const newItem = document.createElement("li");
    newItem.classList.add("list-item");
    newItem.innerHTML = `
        <p> - <span>${value}</span></p>
        <div class="btn-container">
            <button class="done-btn"><i class="fas fa-check-circle"></i></button>
            <button class="remove-btn"><i class="fas fa-times"></i></button>
        </div>`;
    listContainer.appendChild(newItem);
    intoDefault();


    const doneBtn = document.querySelectorAll(".done-btn");
    doneBtn.forEach((btn) => {
        btn.addEventListener("click", moveToDone);
    })


    const removeBtn = document.querySelectorAll(".remove-btn");
    removeBtn.forEach((btn) => {
        btn.addEventListener("click", removeItem);
    })
}

// return to dfault after create a new item
function intoDefault() {
    input.value = "";
}

// remove item
function removeItem(e) {
    const currentItem = e.currentTarget.parentElement.parentElement;
    const array = [...listContainer.children];
    const array1 = [...doneList.children];
    if (array.includes(currentItem)) {
        listContainer.removeChild(currentItem);
    } else {
        doneList.removeChild(currentItem);
    }

}

// move to done 
function moveToDone(e) {
    const currentItem = e.currentTarget.parentElement.parentElement;
    const text = currentItem.querySelector("span");

    const newItem = document.createElement("li");
    newItem.classList.add("list-item");
    newItem.innerHTML = `
        <p> - <span>${text.innerHTML}</span></p>
        <div class="btn-container">
            <button class="remove-btn"><i class="fas fa-times"></i></button>
        </div>`;
    const span = newItem.querySelector("span");
    span.classList.add("active");
    doneList.appendChild(newItem);

    listContainer.removeChild(currentItem);

    const removeBtn = document.querySelectorAll(".remove-btn");
    removeBtn.forEach((btn) => {
        btn.addEventListener("click", removeItem);
    })
}