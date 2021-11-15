class Book {
    constructor(title, author, pages, isRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }    
}

let bookArr = [];
bookArr.push(new Book("1984","joj",1,true));
console.log(bookArr);


const bookList = document.getElementById("list");


function addCard () {
    const card = document.createElement("div");
    card.classList.add('card');

    card.innerHTML = 
    `
    <i onclick = "removeCard()" id = "remove" class="fas fa-times"></i>
    <div class="content">
        <h2 id = "card_title">"${bookArr[0].title}"</h2>
        <em id = "card_author">${bookArr[0].author}</em>
        <p>Pages: <span id = "card_pages">${bookArr[0].pages}</span></p>
    </div>
    <button id = "card_read">Read</button>
    `;
    bookList.appendChild(card);
}

function clearArray(){
    bookArr.splice(0, bookArr.length);
    console.log(bookArr);
}

function openForm(){
    const form = document.getElementById("add");
    form.classList.toggle("show");
}
