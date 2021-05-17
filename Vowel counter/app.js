const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const num_container = document.querySelector(".vowels-num");
const vowels = ['a', 'e', 'u', 'i', 'o', 'y'];

num_container.parentElement.style.display = "none";
btn.addEventListener("click", (e) => {
    e.preventDefault();
    const text = input.value;
    let numOfVowels = 0;
    for (let i = 0; i < text.length; i++) {
        vowels.forEach((vowel) => {
            if (text[i] == vowel) {
                numOfVowels++;
            }
        })
    }

    num_container.innerHTML = numOfVowels;
    num_container.parentElement.style.display = "initial";

});