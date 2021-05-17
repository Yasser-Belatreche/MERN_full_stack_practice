const input = document.querySelector(".input");
const addBtn = document.querySelector(".submit-btn");
const noteContainer = document.querySelector(".notes");

addBtn.addEventListener("click", addNote);
document.addEventListener("keypress", (e) => {
    if (e.keyCode == 13) {
        addNote();
    }
})

// functions
function addNote() {
    const value = input.value;

    if (value.length > 0) {
        const newNote = document.createElement("div");
        newNote.classList.add("note");
        const key = new Date().getTime();

        if (value.length > 100) {
            const text = value.slice(0, 100);
            newNote.innerHTML = `
                <p>${text}...</p>
                <button type="button" class="btn show-more">Show More</button>`;
            noteContainer.appendChild(newNote);


            const p = document.querySelector(".note p");
            const showMoreBtn = document.querySelector(".show-more");
            showMoreBtn.addEventListener("click", () => {
                if (showMoreBtn.innerHTML === "Show More") {
                    p.innerHTML = `
                        ${value}`;
                    showMoreBtn.innerHTML = "Show less";
                } else if (showMoreBtn.innerHTML === "Show less") {
                    p.innerHTML = `
                        ${text}...`;
                    showMoreBtn.innerHTML = "Show More";
                }
            });
        } else {
            newNote.innerHTML = `
            <p>${value}</p>`;
        }
        noteContainer.appendChild(newNote);
        localStorage.setItem(key, newNote)
        toDefault();
    } else {
        return;
    }
}

function toDefault() {
    input.value = "";
}