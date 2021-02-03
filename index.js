let myLibrary = []; //initialize library

function Book(title,author,pages,read){  //object to store books
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

function errorOFF(e){  //removes the error from the input
    titleInput.placeholder = "Ex. To Kill a Mockingbird";
    titleInput.classList.remove('error');
    authorInput.placeholder = "Ex. Harper Lee";
    authorInput.classList.remove('error');
    pagesInput.placeholder = "Ex. 28";
    pagesInput.classList.remove('error');
    
}

function clearForm(e){  //clears all elements from the form
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
    //clears the table
    clearTable();

    // populates the table
    for(i=0;i<myLibrary.length;i++){
        let row = table.insertRow();
        row.setAttribute('data-key',i);

        //adds the title, author, and page count
        for (const property in myLibrary[i]){
            if(myLibrary[i].hasOwnProperty(property)&&property!='read'){
                let cell = row.insertCell()
                cell.innerHTML = `${myLibrary[i][property]}`;
            }
        }

        //adds a toggle for read
        let cell1 = row.insertCell();
        cell1.style.textAlign="center";
        cell1.setAttribute('data-key',i)
        if (myLibrary[i]['read']==true){
            hasRead = "readON";
            readStatus = 'Read';
        }
        else{
            hasRead = "readOFF";
            readStatus = 'Not read';
        }
        cell1.innerHTML = `<button class="${hasRead}" data-key=${i}>${readStatus}</button>`;
        cell1.addEventListener('click',toggleRead)

        // adds a delete button
        let cell = row.insertCell();
        cell.style.textAlign="center";
        cell.setAttribute('data-key',i)
        cell.innerHTML = `<button class="delete" data-key=${i}>Delete</button>`;
        cell.addEventListener('click',deleteEntry)
    }
}

function toggleRead(e){
    let index = e.target.getAttribute('data-key');
    if (myLibrary[index]['read']==true){
        myLibrary[index]['read']=false;
    }
    else{
        myLibrary[index]['read']=true;
    }
    
    updateTable()
}

function clearTable(e){  //function that clears the table
    let rows = table.rows;
    let countRows = rows.length;
    while (--countRows){
        table.deleteRow(countRows)
    }
}

function results(e){ //function that inputs the form results into the table
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
            if(myLibrary[myLibrary.length-1].hasOwnProperty(property) && property!='read'){
                let cell = row.insertCell();
                cell.innerHTML = `${myLibrary[myLibrary.length-1][property]}`;
            }
        }

        //adds a toggle for read
        let cell1 = row.insertCell();
        cell1.style.textAlign="center";
        cell1.setAttribute('data-key',i)
        if (myLibrary[i]['read']==true){
            hasRead = "readON";
            readStatus = 'Read';
        }
        else{
            hasRead = "readOFF";
            readStatus = 'Not read';
        }
        cell1.innerHTML = `<button class="${hasRead}" data-key=${i}>${readStatus}</button>`;
        cell1.addEventListener('click',toggleRead)


        // adds a delete button
        let cell = row.insertCell();
        cell.style.textAlign="center";
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

//form container
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

//test books
addBookToLibrary('Greenlights','Matthew McConaughey',304,false)
addBookToLibrary('Beowulf','Cotton Vitellius A. xv',3182,true)
addBookToLibrary('Odyssey','Homer',384,true)
addBookToLibrary('To Kill a Mockingbird','Harper Lee',281,true)
updateTable()