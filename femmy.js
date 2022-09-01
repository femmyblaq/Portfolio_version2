const TypeWriter = function (txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

//Type method
TypeWriter.prototype.type = function () {
  const current = this.wordIndex % this.words.length;
  //get full txt from the words
  const fullText = this.words[current];
  //check if deleting
  if (this.isDeleting) {
    //remove text
    this.txt = fullText.substring(0, this.txt.length - 1);
  } else {
    //add text
    this.txt = fullText.substring(0, this.txt.length + 1);
  }
  //insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  //set time for the typing(init)
  let typeSpeed = 300;
  if (this.isDeleting) {
    typeSpeed /= 2;
  }
  //if word is complete
  if (!this.isDeleting && this.txt === fullText) {
    //make pause at the end
    typeSpeed = this.wait;
    //set is deleting to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    //set is deleting back to false
    this.isDeleting = false;
    //increment the word index
    this.wordIndex++;
    //pause before start typing
    typeSpeed = 500;
  }
  setTimeout(() => this.type(), typeSpeed);
};

//add eventlistener when the dom get loaded
document.addEventListener("DOMContentLoaded", init);

//function for initializing
function init() {
  //get all the neccessary element
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  //create the new const
  new TypeWriter(txtElement, words, wait);
}

const bars = document.querySelector(".bars");
const links = document.querySelector(".links");
bars.addEventListener("click", () => {
  console.log("I got clicked");
  links.classList.toggle("active");
  bars.classList.toggle("is-active");
});

let progress = document.querySelector(".progress-bar");
let totalHeight = document.body.scrollHeight * window.innerHeight;
window.onscroll = () => {
  let progressHeight = (window.pageXOffset / totalHeight) * 100;
  progress.style.height = progressHeight + "%";
};
const activePage = window.location.pathname;
const nav = document.querySelectorAll("nav-item a");

const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  console.log("i got Loaded");
  preloader.classList.add("fade-out");
});
