// select the element needed
const nameInput = document.querySelector(".input-name");
const dateInput = document.querySelector(".input-date");
const amountInput = document.querySelector(".input-amount");
const submitBtn = document.querySelector(".submit-btn");
const tableData = document.querySelector(".table-data");
const defaultText = document.querySelector(".default");

// -------------- event listener -------------------
submitBtn.addEventListener("click", addExpense);
document.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
        addExpense();
    }
});


// -------------------- functions -------------------

// add expense
function addExpense() {
    const name = nameInput.value;
    const date = dateInput.value;
    const amount = amountInput.value;


    if (name && date && amount) {
        const newExpense = document.createElement("tr");
        newExpense.innerHTML = `
        <td>${name}</td>
        <td>${date}</td>
        <td>$${amount}</td>
        <td>
            <i class="fas fa-times remove-btn"></i>
        </td>`;
        defaultText.classList.add("hide");
        tableData.appendChild(newExpense);
        toDefault();

        // remove btn set up
        const removeBtns = document.querySelectorAll(".remove-btn");
        removeBtns.forEach((btn) => {
            btn.addEventListener("click", removeExpense);
        })
    } else {
        return;
    }

}

// remove Expense
function removeExpense(e) {
    const current = e.currentTarget.parentElement.parentElement;
    tableData.removeChild(current);
    if (tableData.children.length === 1) {
        defaultText.classList.remove("hide");
    }
}

// return to default
function toDefault() {
    nameInput.value = "";
    dateInput.value = "";
    amountInput.value = "";
}