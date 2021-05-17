var images = [...document.querySelectorAll(".img")];
const imagesContainer = document.querySelector(".img-container");
var openedImages = [];


something();


images = shuffle(images);
imagesContainer.innerHTML = "";
images.forEach((img) => {
    imagesContainer.appendChild(img);
})

images.forEach((img) => {
    img.addEventListener("click", imageOpen);
    img.addEventListener("click", endGame);
})

function matched() {
    openedImages[0].classList.add("matched");
    openedImages[1].classList.add("matched");
}

function unmatched() {
    openedImages[0].classList.remove("show");
    openedImages[1].classList.remove("show");
}

function imageOpen() {
    openedImages.push(this);
    this.classList.add("show");
    if (openedImages.length == 2) {
        if (openedImages[0].lastElementChild.src === openedImages[1].lastElementChild.src) {
            matched();
            openedImages = [];
        } else {
            setTimeout(unmatched, 200);
            setTimeout(() => {
                openedImages = [];
            }, 300);
        }
    }
}

function endGame() {
    var matched = [...document.querySelectorAll(".matched")];
    if (matched.length == 12) {
        setTimeout(() => {
            alert("Congratulation you win !!!");
            location.reload();
        }, 100);

    }
}



function shuffle(images) {
    var le = images.length;
    while (le != 0) {
        var random = (Math.floor(Math.random() * le));
        var temp = images[le - 1];
        images[le - 1] = images[random];
        images[random] = temp;
        le--;
    }
    return images;
}