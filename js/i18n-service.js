'use strict';

var gCurrLang = 'en';
var gExcangeRates;
//api from curency layer website- return promise with updated excnahge rate 
//from around the world- we set global object "gExcangeRates" with this data to use later on
fetch('http://api.currencylayer.com/live?access_key=b56b32b55a1b10e4b173f1b317361189').then(response => response.json()).then(data => gExcangeRates = data);

var gTrans = {
      title: {
            en: 'Welcome to my bookshop',
            he: 'ברוכים הבאים לחנות הספרים'
      },
      'create-new-book': {
            en: 'create new book',
            he: 'צור ספר חדש',
      },
      'id': {
            en: 'id',
            he: 'מספר מזהה',
      },
      'title-sort': {
            en: 'sort title',
            he: 'סדר לפי שם',
      },
      'price-sort': {
            en: 'sort price',
            he: 'סדר לפי מחיר',
      },
      'action': {
            en: 'Action',
            he: 'פעולות',
      },
      'read': {
            en: 'Read',
            he: 'קריאה',
      },
      'update': {
            en: 'Update',
            he: 'עדכן',
      },
      'delete': {
            en: 'delete',
            he: 'מחק',
      },
      'add-book-name': {
            en: 'Book name',
            he: 'שם הספר',
      },
      'add-book-price': {
            en: 'Book price',
            he: 'מחיר הספר',
      },
      'add-book-button': {
            en: 'Add Book',
            he: 'הוסף ספר',
      },
      'add-book-close': {
            en: 'Close',
            he: 'סגור',
      },
      'read-book-close': {
            en: 'Close',
            he: 'סגור',
      },
      'read-book-rate': {
            en: 'Rate',
            he: 'דרוג',
      },
      'update-book-title': {
            en: 'please put the new price:',
            he: 'הכנס מחיר חדש',
      },
      'update-book-input': {
            en: 'Price',
            he: 'מחיר',
      },
      'update-book-click': {
            en: 'Save Price',
            he: 'שמור מחיר',
      },
      'update-book-close': {
            en: 'Close',
            he: 'סגור',
      },
}

//set the global lang
function setLang(langValue) {
      gCurrLang = langValue;
}

function doTrans() {
      var els = document.querySelectorAll('[data-trans]')
      els.forEach(function (el) {
            var transKey = el.dataset.trans
            var txt = getTrans(transKey);
            if (el.nodeName === 'INPUT') {
                  el.setAttribute('placeholder', txt);
            } else {
                  el.innerText = txt;
            }
      })
}

function getTrans(transKey) {
      var keyTrans = gTrans[transKey];
      if (!keyTrans) return 'UNKNOWN';
      var txt = keyTrans[gCurrLang];
      // if not found return en
      if (!txt) txt = keyTrans['en'];
      return txt;
}

function formatCurrency(num) {
      if (gCurrLang === 'he') {
            return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(convertRate(num));
      } else if (gCurrLang === 'en') {
            return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(convertRate(num));
      }
}

//helper function to convert the exchange rate (get the update excange rate from the gExcange variable)
function convertRate(price) {
      if (gCurrLang === 'he') {
            return price * gExcangeRates.quotes.USDILS
      } else if (gCurrLang === 'en') {
            return price
      }
}




