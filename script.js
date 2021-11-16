class Book {
    constructor(title, author, pages, isRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }    
}
//Forms
const titleForm = document.getElementById("title");
const authorForm = document.getElementById("author");
const pagesForm = document.getElementById("pages");
const readForm = document.getElementById("read");

titleForm.value = "";
authorForm.value = "";
pagesForm.value = "";


//Disable Characters
pagesForm.onkeypress = function(e) {
    return "1234567890".indexOf(String.fromCharCode(e.which)) >= 0;
};
authorForm.onkeypress = function(e) {
    return "'`\" qwertyuiopasdfghjklzxcvbnm.,-1234567890QWERTYUIOPASDFGHJKLZXCVBNM!@#$%^&*()ქწერტყუიოპასდფგჰჯკლზხცვბნმჭღთშჟძჩ".indexOf(String.fromCharCode(e.which)) >= 0;
};
titleForm.onkeypress = function(e) {
    return "'`\" qwertyuiopasdfghjklzxcvbnm.,-1234567890QWERTYUIOPASDFGHJKLZXCVBNM!@#$%^&*()ქწერტყუიოპასდფგჰჯკლზხცვბნმჭღთშჟძჩ".indexOf(String.fromCharCode(e.which)) >= 0;
};

let bookArr = JSON.parse(localStorage.getItem("bookArray"));
const bookList = document.getElementById("list");
showCards();

function addBook(){
    let isRead = (readForm.value === "read" ? true : false);
    if(pagesForm.value === ""|| pagesForm.value === "" || titleForm.value === "" ){
        document.getElementById("error").innerText = "Please fill all of the fields!";
        return;
    }
    bookArr.push(
        new Book(titleForm.value, authorForm.value, pagesForm.value, isRead)
    );
    localStorage.setItem("bookArray",JSON.stringify(bookArr));
    document.getElementById("error").innerText = "";
    titleForm.value = "";
    authorForm.value = "";
    pagesForm.value = "";

    showCards();
}

function clearArray(){
    bookArr.splice(0, bookArr.length);
    localStorage.setItem("bookArray",JSON.stringify(bookArr));
    showCards();
}

function openForm(){
    const form = document.getElementById("add");
    form.classList.toggle("show");
}

function showCards () {
    if(bookArr.length == 0){
        while (bookList.firstChild) {
            bookList.removeChild(bookList.firstChild);
        }
    }
    while (bookList.firstChild) {
        bookList.removeChild(bookList.firstChild);
    }
    for(let i = 0; i < bookArr.length ; i++){
            const card = document.createElement("div");
            card.classList.add('card');

            card.innerHTML = 
            `
            <i onclick = "removeCard(this.id)" id = "${i}i" class="fas fa-times"></i>
            <div class="content">
                <h2 id = "card_title">"${bookArr[i].title}"</h2>
                <em id = "card_author">-${bookArr[i].author}</em>
                <p>Pages: <span id = "card_pages">${bookArr[i].pages}</span></p>
            </div>
            ${
                (bookArr[i].isRead ? 
                    `
                    <button onclick = "changeRead(this.id)" id = "${i}b">
                        Read
                    </button>
                    `
                    :
                    `
                    <button class = "red" onclick = "changeRead(this.id)" id = "${i}b">
                        Not Read
                    </button>
                    `)
            }

            `;
            bookList.appendChild(card);
    }
}


function removeCard(num){
    num = num.slice(0,1);
    num = Number(num);
    bookArr.splice(num, 1);
    localStorage.setItem("bookArray",JSON.stringify(bookArr));
    showCards();
}

function changeRead(id){
    bookArr[Number(id.slice(0,1))].isRead = !bookArr[Number(id.slice(0,1))].isRead;
    localStorage.setItem("bookArray",JSON.stringify(bookArr));
    if(bookArr[Number(id.slice(0,1))].isRead === true){
        document.getElementById(id).innerText = "Read";
        document.getElementById(id).classList.toggle("red");
    }
    else{
        document.getElementById(id).innerText = "Not Read";
        document.getElementById(id).classList.toggle("red");
    }
}