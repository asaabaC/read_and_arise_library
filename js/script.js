document.addEventListener('DOMContentLoaded', () => {
    // Elements for Add Book form (only on home.html)
    const addBookBtn = document.getElementById('add-book-btn');
    const bookTitle = document.getElementById('book-title');
    const bookAuthor = document.getElementById('book-author');
    const bookCover = document.getElementById('img-url');
    const bookStatus = document.getElementById('book-status');
    const bookFavorite = document.getElementById('book-favorite');
    const bookNotes = document.getElementById('book-notes');

    // Elements for book lists
    const readList = document.getElementById('read-list');
    const toReadList = document.getElementById('to-read-list');
    const favoritesList = document.getElementById('favorites-list');

    // Determine image path prefix based on page location
    const isPagesDir = window.location.pathname.includes('/pages/');
    const imagePathPrefix = isPagesDir ? '../Images/' : 'Images/';
    console.log(`Current page: ${window.location.pathname}, Using image path prefix: ${imagePathPrefix}`);

    // Pre-populate books if localStorage is empty
    let books = JSON.parse(localStorage.getItem('books')) || [];
    if (books.length === 0) {
        books = [
            // Books I've Read (10, 4 favorites)
            {
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
                cover: `${imagePathPrefix}4e4cbe770d88c232fe65972ab7d8bcc7.jpg`,
                status: "read",
                favorite: true,
                notes: "Themes of justice, morality, and racial inequality."
            },
            {
                title: "1984",
                author: "George Orwell",
                cover: `${imagePathPrefix}32dee3d2b318be7fb3600d769e9803af.jpg`,
                status: "read",
                favorite: true,
                notes: "Explores totalitarianism and surveillance."
            },
            {
                title: "Pride and Prejudice",
                author: "Jane Austen",
                cover: `${imagePathPrefix}52e27eb907c1e09d520065360760c92b.jpg`,
                status: "read",
                favorite: true,
                notes: "Witty exploration of love and social class."
            },
            {
                title: "Beloved",
                author: "Toni Morrison",
                cover: `${imagePathPrefix}cbf98147321586c4e1c3d69994a6bde2.jpg`,
                status: "read",
                favorite: true,
                notes: "Powerful narrative on slavery and its aftermath."
            },
            {
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                cover: `${imagePathPrefix}06ba5e84af1bd2fa0c189d60780349e1.jpg`,
                status: "read",
                favorite: false,
                notes: "A classic on the American Dream."
            },
            {
                title: "Jane Eyre",
                author: "Charlotte Brontë",
                cover: `${imagePathPrefix}91b57732d0e2c80d54637d2166c36958.jpg`,
                status: "read",
                favorite: false,
                notes: "A story of independence and love."
            },
            {
                title: "The Catcher in the Rye",
                author: "J.D. Salinger",
                cover: `${imagePathPrefix}770f9efa29b695e27ba2927490e233a3.jpg`,
                status: "read",
                favorite: false,
                notes: "Explores teenage alienation."
            },
            {
                title: "Brave New World",
                author: "Aldous Huxley",
                cover: `${imagePathPrefix}a980610fc04134058e0c929ddc3abc1f.jpg`,
                status: "read",
                favorite: false,
                notes: "Dystopian vision of a controlled society."
            },
            {
                title: "Wuthering Heights",
                author: "Emily Brontë",
                cover: `${imagePathPrefix}b3f71f592657a97c6a8da291c547b4f1.jpg`,
                status: "read",
                favorite: false,
                notes: "Passionate and tragic love story."
            },
            {
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                cover: `${imagePathPrefix}ba9a0e881a163eef0e846f57c4a6a40b.jpg`,
                status: "read",
                favorite: false,
                notes: "A fantasy adventure."
            },
            // Books To Read (11, 3 favorites)
            {
                title: "The Alchemist",
                author: "Paulo Coelho",
                cover: `${imagePathPrefix}490047e72524d54470d54011fe1dd824.jpg`,
                status: "to-read",
                favorite: true,
                notes: "Inspirational journey of self-discovery."
            },
            {
                title: "Dune",
                author: "Frank Herbert",
                cover: `${imagePathPrefix}d7ebd78c9ef39b5b4ae07e87c02c6c24.jpg`,
                status: "to-read",
                favorite: true,
                notes: "Epic sci-fi saga about power and destiny."
            },
            {
                title: "Sapiens: A Brief History of Humankind",
                author: "Yuval Noah Harari",
                cover: `${imagePathPrefix}1714e8bf55d7ba62970eb9aa8b20959f.jpg`,
                status: "to-read",
                favorite: true,
                notes: "Fascinating look at human history."
            },
            {
                title: "The Night Circus",
                author: "Erin Morgenstern",
                cover: `${imagePathPrefix}004810f10fdbab67a9cfe93960588fab.jpg`,
                status: "to-read",
                favorite: false,
                notes: "Magical tale of a mysterious circus."
            },
            {
                title: "Educated",
                author: "Tara Westover",
                cover: `${imagePathPrefix}7297bdefc1d9f7494973a7012ad539e1.jpg`,
                status: "to-read",
                favorite: false,
                notes: "Memoir of self-education."
            },
            {
                title: "Circe",
                author: "Madeline Miller",
                cover: `${imagePathPrefix}127815665032515ded4822feac48c006.jpg`,
                status: "to-read",
                favorite: false,
                notes: "Mythological retelling of a sorceress’s life."
            },
            {
                title: "The Book Thief",
                author: "Markus Zusak",
                cover: `${imagePathPrefix}a647f8f304b200c158b966e3ccaa4dfc.jpg`,
                status: "to-read",
                favorite: false,
                notes: "A story set during WWII, narrated by Death."
            },
            {
                title: "A Brief History of Time",
                author: "Stephen Hawking",
                cover: `${imagePathPrefix}bc939572bdd95bed03554d0c7d3d32b5.jpg`,
                status: "to-read",
                favorite: false,
                notes: "Explains complex physics for lay readers."
            },
            {
                title: "The Handmaid’s Tale",
                author: "Margaret Atwood",
                cover: `${imagePathPrefix}ed046c8110e1c49a96e214bfecf45b55.jpg`,
                status: "to-read",
                favorite: false,
                notes: "Dystopian tale of oppression."
            },
            {
                title: "Atomic Habits",
                author: "James Clear",
                cover: `${imagePathPrefix}f0a461d7d0f7233f0070a75389ffa4d9.jpg`,
                status: "to-read",
                favorite: false,
                notes: "Guide to building good habits."
            },
            {
                title: "Placeholder Book",
                author: "Unknown Author",
                cover: `${imagePathPrefix}marketing-business-print-template_23-2148990531.jpg`,
                status: "to-read",
                favorite: false,
                notes: "Placeholder for unspecified book."
            }
        ];
        localStorage.setItem('books', JSON.stringify(books));
        // Log image paths for debugging
        console.log('Pre-populated book cover paths:');
        books.forEach(book => console.log(`Title: ${book.title}, Cover: ${book.cover}`));
    }

    const renderBooks = () => {
        if (readList) readList.innerHTML = '';
        if (toReadList) toReadList.innerHTML = '';
        if (favoritesList) favoritesList.innerHTML = '';

        books.forEach((book, index) => {
            // Create the outer column div
            const colDiv = document.createElement('div');
            colDiv.className = 'col-md-4 col-sm-6';

            // Create the card container
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card book-card';

            // Create and configure the image element
            const img = document.createElement('img');
            img.src = book.cover;
            img.className = 'card-img-top';
            img.alt = book.title;

            img.onload = () => {
                console.log(`Successfully loaded image: ${book.cover}, Resolved URL: ${img.src}`);
            };
            img.onerror = () => {
                img.src = 'https://via.placeholder.com/150';
                console.error(`Failed to load image: ${book.cover}, Resolved URL: ${img.src}`);
            };

            // Create the card body
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            // Title
            const title = document.createElement('h5');
            title.className = 'card-title';
            title.textContent = book.title;

            // Author
            const author = document.createElement('p');
            author.className = 'card-text';
            author.innerHTML = `<strong>Author:</strong> ${book.author}`;

            // Notes
            const notes = document.createElement('p');
            notes.className = 'card-text';
            notes.innerHTML = `<strong>Notes:</strong> ${book.notes || 'No notes'}`;

            // Favorite icon
            const favoriteIcon = document.createElement('i');
            favoriteIcon.className = `fas fa-heart favorite-icon ${book.favorite ? 'active' : ''}`;
            favoriteIcon.dataset.index = index;

            // Add event listener directly
            favoriteIcon.addEventListener('click', () => {
                books[index].favorite = !books[index].favorite;
                localStorage.setItem('books', JSON.stringify(books));
                renderBooks();
            });

            // Append all elements
            cardBody.appendChild(title);
            cardBody.appendChild(author);
            cardBody.appendChild(notes);
            cardBody.appendChild(favoriteIcon);

            cardDiv.appendChild(img);
            cardDiv.appendChild(cardBody);
            colDiv.appendChild(cardDiv);

            // Append to correct list
            if (readList && book.status === 'read') {
                readList.appendChild(colDiv);
            }
            if (toReadList && book.status === 'to-read') {
                toReadList.appendChild(colDiv);
            }
            if (favoritesList && book.favorite) {
                favoritesList.appendChild(colDiv);
            }
        });
    };

    // Add new book (only on home.html)
    if (addBookBtn) {
        addBookBtn.addEventListener('click', () => {
            if (!bookTitle.value || !bookAuthor.value) {
                alert('Please fill in the title and author fields.');
                return;
            }

            const newBook = {
                title: bookTitle.value,
                author: bookAuthor.value,
                cover: bookCover.value || 'https://via.placeholder.com/150',
                status: bookStatus.value,
                favorite: bookFavorite.checked,
                notes: bookNotes.value
            };

            books.push(newBook);
            localStorage.setItem('books', JSON.stringify(books));
            renderBooks();

            // Clear form
            bookTitle.value = '';
            bookAuthor.value = '';
            bookCover.value = '';
            bookFavorite.checked = false;
            bookNotes.value = '';

            // Notify user
            alert('Book added successfully! Visit the relevant page to view it.');
        });
    }

    // Initial render
    renderBooks();
});