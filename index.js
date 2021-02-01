function Book(title,author,pages,read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(title,author,pages,read){
    myLibrary.push(new Book(title,author,pages,read))
}

function newBook(e){
    overlay.style.display = "block";
}

function updateTable(e){
    for(i=0;i<=myLibrary.length;i++){
        let row = table.insertRow();
        row.setAttribute('data-key',i);
        for (const property in myLibrary[i]){
            if(myLibrary[i].hasOwnProperty(property)){
                let cell = row.insertCell()
                cell.innerHTML = `${myLibrary[i][property]}`;
            }
        }
    }
}


// get the selectors
let table = document.querySelector(".table");
let rows = table.rows;
let body = table.tBodies;

//new book button
const addButton = document.querySelector('.add');
addButton.addEventListener('click',newBook);
const overlay = document.querySelector('#overlay');


// books stuff

let myLibrary = [];

const book1 = new Book('the book','steve',12,false);

addBookToLibrary('best','steve',4,false);
addBookToLibrary('best2','steve2',5,false);
updateTable()
