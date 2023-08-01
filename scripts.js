const addBookButton = document.getElementById("add");
const modal = document.getElementById("modal");
const close = document.getElementsByClassName("close")[0];
const form = document.getElementById("form");
const container = document.getElementById("container");
const changeStatusButtons = document.querySelectorAll(".change-status");
const deleteButtons = document.querySelectorAll(".delete");

let currentTitle = document.getElementById("title");
let currentAuthor = document.getElementById("author");
let currentPages = document.getElementById("pages");
let currentStatus = document.getElementById("status");

// data structures

let myLibrary = [
    {
    title: "The Little Prince", 
    author: "Antoine de Saint-Exupéry", 
    pages: 96, 
    status: true
    }
];

class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

// add to library

function addBookToLibrary(title, author, pages, status) {
    const newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
    update();
}
  
addBookButton.addEventListener("click", () => {
    modal.style.display = "block";
});
  
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isRead = false;
    if (currentStatus.checked === true) isRead = true;
    else isRead = false;
    
    addBookToLibrary(
      currentTitle.value,
      currentAuthor.value,
      currentPages.value,
      isRead
    );
    modal.style.display = "none";
    form.reset();
});
  
close.addEventListener("click", () => {
    modal.style.display = "none";
});
  
window.addEventListener("click", function (e) {
    if (e.target == modal) modal.style.display = "none";
});

// update cards 

function update() {
    container.innerHTML = "";
    index = 0;
    myLibrary.forEach((book) => {
        let viewStatus = "";
        if (book.status === true) viewStatus = "Read";
        else viewStatus = "Not read yet";
        const htmlCard = `
          <div class="card"">
            <p class="title">${book.title}</p>
            <p class="author">${book.author}</p>
            <p class="pages">${book.pages} pages</p>
            <p class="status">${viewStatus}</p>
            <div class="card-buttons" id="${index}">
                <button class="change-status">Change status</button>
                <button class="delete">Delete</button>
            </div>
          </div>
        `;
        container.insertAdjacentHTML('beforeend', htmlCard);
        index += 1;
      });
}

// change status / delete book

container.addEventListener("click", function(e) {
    if (e.target.classList.contains("change-status")) {
        let currentIndex = e.target.parentElement.id;
        let currentBook = myLibrary[currentIndex];
        currentBook.status = !currentBook.status;
        update();
    }
    else if (e.target.classList.contains("delete")) {
        let currentIndex = e.target.parentElement.id;
        myLibrary.splice(currentIndex, 1);
        update();
    }
});

// initial update

update();