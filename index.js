function Book(title,author){
    this.title = title
    this.author = author
    this.pages = 1
    this.read = false
    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, read? ${this.read}`
    }
}