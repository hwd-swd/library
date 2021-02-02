let myLibrary = [];

function Book(title,author,pages,read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(title,author,pages,read){   //pushes a new book to the library
    myLibrary.push(new Book(title,author,pages,read))
}

function newBook(e){   //unhides the overlay
    overlay.style.display = "block";
}

function errorOFF(e){
    titleInput.placeholder = "Ex. To Kill a Mockingbird";
    titleInput.classList.remove('error');
    authorInput.placeholder = "Ex. Harper Lee";
    authorInput.classList.remove('error');
    pagesInput.placeholder = "Ex. 28";
    pagesInput.classList.remove('error');
    
}

function clearForm(e){
    errorOFF()
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('pages').value='';
    document.getElementById('read').checked=false;
}

function closeOverlay(e){  //closes and refreshes the overlay form
    clearForm();
    overlay.style.display="none";
}

function updateTable(e){  // loops through the array and popluates the table
    clearTable()


    for(i=0;i<myLibrary.length;i++){
        let row = table.insertRow();
        row.setAttribute('data-key',i);
        for (const property in myLibrary[i]){
            if(myLibrary[i].hasOwnProperty(property)){
                let cell = row.insertCell()
                cell.innerHTML = `${myLibrary[i][property]}`;
            }
        }
        // adds a delete button
        let cell = row.insertCell();
        cell.setAttribute('data-key',i)
        cell.innerHTML = `<button class="delete" data-key=${i}>Delete</button>`;
        cell.addEventListener('click',deleteEntry)
    }
}

function clearTable(e){  //function that clears the table
    let rows = table.rows;
    let countRows = rows.length;
    while (--countRows){
        table.deleteRow(countRows)
    }
}

function results(e){
    let formTitle = document.getElementById('title').value;
    let formAuthor = document.getElementById('author').value;
    let formPages = document.getElementById('pages').value;
    let formRead = document.getElementById('read').checked;

    // adds the data to the table if it is all valid
    if (formTitle!='' && formAuthor != '' && formPages > 0){
        addBookToLibrary(formTitle,formAuthor,formPages,formRead)
        let row = table.insertRow();
        row.setAttribute('data-key',myLibrary.length-1);
        for (const property in myLibrary[myLibrary.length-1]){
            if(myLibrary[myLibrary.length-1].hasOwnProperty(property)){
                let cell = row.insertCell();
                cell.innerHTML = `${myLibrary[myLibrary.length-1][property]}`;
            }
        }

        // adds a delete button
        let cell = row.insertCell();
        cell.setAttribute('data-key',myLibrary.length-1)
        cell.innerHTML = `<button class="delete" data-key=${myLibrary.length-1}>Delete</button>`;
        cell.addEventListener('click',deleteEntry)
    closeOverlay()
    }

    //if fields are missing, raises error in the appropriate fields
    if (formTitle==""){
        
        titleInput.placeholder = "Enter a title";
        titleInput.classList.add('error');
    }
    if (formAuthor==""){
        
        authorInput.placeholder = "Enter an author";
        authorInput.classList.add('error');
    }


    if (parseInt(formPages)<0 || formPages ==''){
        pagesInput.placeholder = "Error";
        pagesInput.classList.add('error');
    }
}


//function that deletes the entry when clicked
function deleteEntry(e){
    let index = e.target.getAttribute('data-key');
    myLibrary.splice(index,1)
    
    updateTable()
}

// get the selectors
let table = document.querySelector(".table");
let rows = table.rows;
let body = table.tBodies;

//new book button
const addButton = document.querySelector('.add');
addButton.addEventListener('click',newBook);
const overlay = document.querySelector('#overlay');

//overlay form
const close = document.querySelector('#close');
close.addEventListener('click',closeOverlay);
const submit = document.querySelector('#submit');
submit.addEventListener('click',results)

const form = document.querySelector(".formContainer");

const clearFormButton = document.querySelector('#clearForm');
clearFormButton.addEventListener('click',clearForm)

let titleInput = document.getElementById('title');
let authorInput = document.getElementById('author');
let pagesInput = document.getElementById('pages');
titleInput.addEventListener('click',function(){titleInput.classList.remove('error')})
authorInput.addEventListener('click',function(){authorInput.classList.remove('error')})
pagesInput.addEventListener('click',function(){pagesInput.classList.remove('error')
pagesInput.placeholder = "Ex. 28";})


addBookToLibrary('title','author',1,false)
addBookToLibrary('title','author',2,false)
addBookToLibrary('title','author',3,false)
addBookToLibrary('title','author',4,false)
updateTable()