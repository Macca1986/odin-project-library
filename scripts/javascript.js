const myLibrary = [];

function Book(id, title, author, pages, read) {
    // the constructor...
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return title + " by " + author + ", " + pages + " pages, " + read
    }
}

// Add prototype method to toggle read status
Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    // take params, create a book then store it in the array
    let id = crypto.randomUUID();
    let newBook = new Book(id, title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks(); // Refresh the display when a new book is added
}

function removeBook(bookId) {
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}

function toggleBookRead(bookId) {
    const book = myLibrary.find(book => book.id === bookId);
    if (book) {
        book.toggleRead();
        displayBooks();
    }
}

function displayBooks() {
    const booksGrid = document.getElementById('books-grid');
    booksGrid.innerHTML = ''; // Clear existing content

    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-id', book.id);

        const title = document.createElement('h3');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.textContent = `by ${book.author}`;

        const pages = document.createElement('p');
        pages.textContent = `${book.pages} pages`;

        const readStatus = document.createElement('div');
        readStatus.classList.add('read-status');
        readStatus.classList.add(book.read ? 'read' : 'unread');
        readStatus.textContent = book.read ? 'Read' : 'Not Read';

        const toggleReadBtn = document.createElement('button');
        toggleReadBtn.classList.add('toggle-read-btn');
        toggleReadBtn.textContent = book.read ? 'Mark as Unread' : 'Mark as Read';
        toggleReadBtn.setAttribute('data-id', book.id);
        toggleReadBtn.addEventListener('click', () => toggleBookRead(book.id));

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn');
        removeBtn.textContent = 'Remove';
        removeBtn.setAttribute('data-id', book.id);
        removeBtn.addEventListener('click', () => removeBook(book.id));

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(readStatus);
        bookCard.appendChild(toggleReadBtn);
        bookCard.appendChild(removeBtn);

        booksGrid.appendChild(bookCard);
    });
}

// Modal handling
const newBookBtn = document.getElementById('new-book-btn');
const modal = document.getElementById('new-book-modal');
const newBookForm = document.getElementById('new-book-form');
const cancelBtn = document.getElementById('cancel-btn');

function openModal() {
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
    newBookForm.reset();
}

newBookBtn.addEventListener('click', openModal);
cancelBtn.addEventListener('click', closeModal);

// Close modal if clicking outside the content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Form submission
newBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);
    closeModal();
});
