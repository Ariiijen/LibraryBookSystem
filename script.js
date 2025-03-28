let books = [];

class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }

    toString() {
        return `${this.title} by ${this.author} (${this.year})`;
    }
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
    clearMessage();
    // Update display when switching to display section
    if (sectionId === 'display') {
        displayBooks();
    }
}

function showMessage(text, type) {
    const message = document.getElementById('message');
    message.textContent = text;
    message.style.background = type === 'success' ? '#FFB6C1' : '#FFE4E1';
    message.style.color = '#FFFFFF';
    setTimeout(clearMessage, 3000);
}

function clearMessage() {
    const message = document.getElementById('message');
    message.textContent = '';
    message.style.background = 'none';
}

function addBook() {
    const title = document.getElementById('add-title').value;
    const author = document.getElementById('add-author').value;
    const year = document.getElementById('add-year').value;

    if (title && author && year) {
        const book = new Book(title, author, year);
        books.push(book);
        showMessage(`✅ '${title}' has been added to the library!`, 'success');
        clearInputs('add');
        // Update display if currently on display section
        if (!document.getElementById('display').classList.contains('hidden')) {
            displayBooks();
        }
    } else {
        showMessage('⚠️ Please fill all fields!', 'error');
    }
}

function removeBook() {
    const title = document.getElementById('remove-title').value;
    const index = books.findIndex(book => book.title.toLowerCase() === title.toLowerCase());

    if (index !== -1) {
        books.splice(index, 1);
        showMessage(`❌ '${title}' has been removed from the library.`, 'success');
        clearInputs('remove');
        // Update display if currently on display section
        if (!document.getElementById('display').classList.contains('hidden')) {
            displayBooks();
        }
    } else {
        showMessage('⚠️ Book not found!', 'error');
    }
}

function searchBook() {
    const title = document.getElementById('search-title').value;
    const book = books.find(book => book.title.toLowerCase().includes(title.toLowerCase()));

    if (book) {
        showMessage(`🔍 Found: ${book.toString()}`, 'success');
    } else {
        showMessage('⚠️ Book not found!', 'error');
    }
    clearInputs('search');
}

function displayBooks() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    if (books.length === 0) {
        bookList.innerHTML = '<p>No books in the library.</p>';
    } else {
        books.forEach(book => {
            const div = document.createElement('div');
            div.className = 'book-item';
            div.textContent = book.toString();
            bookList.appendChild(div);
        });
    }
}

function clearInputs(section) {
    document.querySelectorAll(`#${section} input`).forEach(input => {
        input.value = '';
    });
}