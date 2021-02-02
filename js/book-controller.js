'use strict';

var gCurrUpdateId;

function onInit() {
    renderBooks();
    doTrans()
}

$(document).on("click", ".updateBtn", function () {
    gCurrUpdateId = $(this).data('id');
})

function renderBooks() {
    var books = getBooks();
    var strBooksHtml = books.map(function (book) {
        var book =
            `<tr>
            <th scope="row">${book.id}</th>
            <td>${book.title}</td>
            <td>${formatCurrency(book.price)}</td>
            <td><button data-trans='read' onclick='onReadBook("${book.id}")' type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
            Read</button></td>
            <td><button data-trans='update' data-id="${book.id}" class="button yellow updateBtn" data-toggle="modal" data-target="#exampleModalCenter">update</button></td>
            <td><button data-trans='delete' onclick='onRemoveBook("${book.id}")' type="button" class="button red">delete</button></td>
        </tr>`
        return book;
    })

    var elTable = document.querySelector('.body-table');
    elTable.innerHTML = strBooksHtml.join('');;
    doTrans()
}

function onRemoveBook(id) {
    console.log('remove book', id);
    removeBook(id);
    renderBooks();
}

function onAddBook() {
    document.querySelector('.add-book').hidden = false;
}

function onAddNewBook(ev) {
    ev.preventDefault();
    var title = document.querySelector('input[name="title"]').value;
    var price = document.querySelector('input[name="price"]').value;
    addBook(title, price);
    onCloseNewBookModal(ev)
    renderBooks();
}

function onCloseNewBookModal(ev) {
    ev.preventDefault();
    document.querySelector('.add-book').hidden = true;
    doTrans()
}

function onUpdateBook() {
    var newPrice = $('.priceInput').val()
    updateBook(gCurrUpdateId, newPrice);
    $('.price-updated').text('price updated');
    $('.priceInput').val('Price')
    renderBooks();
}

function onReadBook(id) {
    var currBook = getBook(id);
    var elModal = document.querySelector('.modal');
    elModal.hidden = false;
    var eltitle = document.querySelector('.modal h4');
    eltitle.innerText = currBook.title;
    var elPrice = document.querySelector('.modal h5');
    elPrice.innerText = formatCurrency(currBook.price);
    var elImg = document.querySelector('.modal img');
    elImg.src = currBook.imageUrl;
    var elRate = document.querySelector('.modal span');
    elRate.innerText = currBook.rate;
    renderBooks();
}

function closeModal() {
    console.log('closing modal')
    document.querySelector('.modal').hidden = true
    doTrans()
}

function onUpdateRate(value) {
    var newRate = updateBookRate(value);
    if (!newRate) return;
    var elRate = document.querySelector('.modal span');
    elRate.innerText = newRate;
    renderBooks();
}

function onSortByPrice() {
    updateSortBy('price')
    renderBooks()
}

function onSortByName() {
    updateSortBy('name')
    renderBooks()
}

function onNextPage(num) {
    var elLastPage = document.querySelector(`[name='${gPageIdx}']`);
    elLastPage.classList.remove('active');
    nextPage(num);
    var elCurrentPage = document.querySelector(`[name='${gPageIdx}']`);
    elCurrentPage.classList.add('active');
    renderBooks()
}

function onNextSpecificPage(pageNum) {
    var elCurrentPage = document.querySelector(`[name='${pageNum}']`);
    elCurrentPage.classList.add('active');
    var elLastPage = document.querySelector(`[name='${gPageIdx}']`);
    elLastPage.classList.remove('active');
    nextSpecificPage(pageNum)
    renderBooks()
}

function onSetLang(langValue) {
    setLang(langValue);
    if (langValue === 'he') {
        document.querySelector('.book-content').classList.add('rtl')
        document.querySelector('.modal-update').classList.add('rtl')
        document.querySelector('.closeFloat').classList.add('rtl-close')
    } else {
        document.querySelector('.book-content').classList.remove('rtl')
        document.querySelector('.modal-update').classList.remove('rtl')
        document.querySelector('.closeFloat').classList.remove('rtl-close')
    }
    renderBooks()
}