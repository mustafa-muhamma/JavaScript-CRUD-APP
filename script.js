// little notice about events in this project ...
// function getTotal()  is an event to the three inputs at html file at the first div 'price'

// the glopal variebals to work with in this app ..
const title = document.querySelector('#title');
const price = document.querySelector('#price');
const taxes = document.querySelector('#taxes');
const ads = document.querySelector('#ads');
const discount = document.querySelector('#discount');
const total = document.querySelector('#total');
const formSubmit = document.querySelector('#submit');
const btnSubmit = document.querySelector('#btn')
const count = document.querySelector('#count');
const category = document.querySelector('#category');
const myTable = document.querySelector('#tab');
const resetBtn = document.querySelector('#deleteAll');
const searchInp = document.querySelector('#search');
const searchTitle = document.querySelector('#srchTitle');
const searchCategory = document.querySelector('#srchCategory');

// for search tybe feature
let searchMode = 'Title';
// for uptade feature
let mode = 'create';
let tmb;
// for erase all Data
let deleteBtn = document.createElement('button');
// the main array we save the data in it
let myData;
// a condition to save the array to local storage or to make an empty array at page if local is empty
if (localStorage.product != null) {
    myData = JSON.parse(localStorage.product)
} else {
    myData = []
}
// the main function in this project ..
showData();
// a function work with 'price , ads ,taxes , discount' to work at the total elm ..
function getTotal() {
    if (price.value) {
        const result = +price.value + +taxes.value + +ads.value - +discount.value
        total.innerHTML = result
        total.style.background = '#040'
    } else {
        total.innerHTML = ''
        total.style.background = '#a00d02'
    }
};
// the main event listener at project with two modes create and update nd each one work at a specefic condition ..
formSubmit.addEventListener('submit', () => {
    // myPro is an opject we push it inside the myData array
    const myPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };
    // the condition which allow to work as "create" or "uptade"..
    if (mode === 'create') {
        // a condition to check how many element we would create ..
        if (myPro.count > 1 && count.value < 25) {
            for (let i = 0; i < myPro.count; i++) {
                myData.push(myPro);
            };
        } else myData.push(myPro);
    } else {
        myData[tmb] = myPro;
        count.style.display = 'block';
        btnSubmit.innerHTML = 'Create';
        mode = 'create';
    }
    // here we make the product key in local storage and convert myData array into json file..
    localStorage.setItem('product', JSON.stringify(myData));
    // a function to clear the inputs on submit
    clearInp();
    // display it here to make a live action without doing  refresh to see the end resault..
    showData();
});
// the button who display if row was exist nd on click clear all data from local storage nd the array
deleteBtn.addEventListener('click', () => {
    localStorage.clear();
    myData.splice(0);
    showData();
});
// a function to take an option to search with ....
function getSearchMood(id) {
    // the default behavoir action to work with..
    if (id == 'srchTitle') {
        searchMode = 'Title';
// the second option is work with category modesearch....
    } else {
        searchMode = 'Category';
    }
    searchInp.placeholder = `Search By ${searchMode}..`;
    searchInp.value = '';
    searchInp.focus();
    showData();
};
// a function create a tble nd return it as string so we push it to many function need a table...
function addTableElem(myData) {
    let table = `
                <tr>
                <td>${i + 1}</td>
                <td>${myData.title}</td>
                <td>${myData.price}</td>
                <td>${myData.taxes}</td>
                <td>${myData.ads}</td>
                <td>${myData.discount}</td>
                <td>${myData.total}</td>
                <td>${myData.category}</td>
                <td><button class="uptade" onclick='updateData(${i})'>uptade</button></td>
                <td><button onclick='deleteData(${i})' class="delete">delete</button></td>
         </tr>
                `
    return table;
}
// 
function searchInput(value) {
    let table = '';
    for (i = 0; i < myData.length; i++) {
        if (searchMode == 'Title' && myData[i].title.includes(value.toLowerCase())) {
            table += addTableElem(myData[i]);
        }
        else if (myData[i].category.includes(value.toLowerCase()) && searchMode == 'Category') {
            table += addTableElem(myData[i]);
        }
        myTable.innerHTML = table;
    }
};

function clearInp() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
};

function showData() {

    getTotal();

    let table = ''

    for (i = 0; i < myData.length; i++) {
        table += addTableElem(myData[i]);
    };
    myTable.innerHTML = table;

    if (myData.length > 0) {
        resetBtn.append(deleteBtn);
        deleteBtn.innerHTML = `Delete All (${myData.length})`;

    } else resetBtn.innerHTML = '';

};
// function work to delete a specific row we are holding it at this time  
function deleteData(i) {
    myData.splice(i, 1);
    localStorage.product = JSON.stringify(myData);
    showData();
}
// a function work in formSubmit event ...
function updateData(i) {
    title.value = myData[i].title;
    price.value = myData[i].price;
    taxes.value = myData[i].taxes;
    ads.value = myData[i].ads;
    discount.value = myData[i].discount;
    category.value = myData[i].category;
    getTotal();

    scroll({
        top: 0,
        behavior: 'smooth'
    });

    count.style.display = 'none';
    btnSubmit.innerHTML = 'Update';

    mode = 'uptade';
    tmb = i;
};
