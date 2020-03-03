const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");

/*
  Get "items" list from localStorage

  Hint1: use "localStorage" API
*/
// ------------============ Start Here ============------------

let myItems = localStorage.getItem("items");
let myItemsList = JSON.parse(myItems) || [];
// ------------============ End Here ==============------------

/*
  Implement renderItems method:
  3. Overwrite "items" list in localStorage
  4. ReRender list

  Hint1: Use JSON.stringify before saving items into localStorage
*/
function renderItems(items) {
  // ------------============ Start Here ============------------
  const jsonStr = JSON.stringify(items);
  localStorage.setItem("items", jsonStr);
  populateList(items, itemsList);

  // ------------============ End Here ==============------------
}

/*
  Implement addItem method:
  1. Extract data from "e" Event ("item" field value)
  2. Create new Object and add it into the "items" list
  3. call "renderItems" with new list of items
  4. Reset form

  Hint1: e is "HTMLFormElement" use available methods to get input field value
*/
function addItem(e) {
  // ------------============ Start Here ============------------
  e.preventDefault();
  const itemName = e.target.elements[0].value;
  const item = {
    itemName,
    isDone: false
  };
  //const new_list = //[...myItemsList, item];
  myItemsList.push(item);
  renderItems(myItemsList);
  e.target.reset();
  // ------------============ End Here ==============------------
}

/*
  Print "plates" items onto "platesList" elment
  1. Clear current list
  2. Create <li> DOM element for every item in plates
  3. Put elements into "platesList"
  4. Remember to check "done" plates

  Hint1: use .map() on "plates" list to create DOM elements
  Hint2: use document.createElement() to create element
  Hint3: add data index property with item id to every element
  Hint3: use .forEach() to append elements
*/
function populateList(plates = [], platesList) {
  // ------------============ Start Here ============------------
  platesList.innerHTML = "";
  plates
    .map((element, index) => {
      return `
    <li>
    <input type='checkbox' ${
      element.isDone ? "checked" : ""
    } name='item${index}'/>
    <label for='item${index}' id='label${index}'>${element.itemName}</label>
    </li>
    `;
    })
    .forEach(element => {
      platesList.innerHTML += element;
    });
  // ------------============ End Here ==============------------
}

/*
  Toggle clicked element's value
  1. Extract data index from "e" Event
  2. find item with that index on "items" list
  3. Toggle item's "done" value
  4. call "renderItems" with new list of items

  Hint1: Check if e.target is and "input" field
*/
function toggleDone(e) {
  // ------------============ Start Here ============------------
  console.log(e.target);
  let index = e.target.id.replace("label", "");
  myItemsList[index].isDone = !myItemsList[index].isDone;
  renderItems(myItemsList);
  // ------------============ End Here ==============------------
}

/*
  Add "addItem" "submit" EventListener to "addItems" form
*/
// ------------============ Start Here ============------------
addItems.addEventListener("submit", addItem);
// ------------============ End Here ==============------------

/*
  Add "toggleDone" "click" EventListener to "itemsList" container
*/
// ------------============ Start Here ============------------
itemsList.addEventListener("click", toggleDone);
// ------------============ End Here ==============------------

/*
  call "renderItems" with an existing list of items when the page is loaded

  Hint1: Use "items" list
*/
// ------------============ Start Here ============------------
if (myItems != null) {
  //uzytkownik juz mial cos zapisane w local storage
  renderItems(myItemsList);
} else {
  //uzytkownik nic jeszcze nie ma pierwszy raz na stronie
  renderItems([]);
}
//renderItems(myItems);
// ------------============ End Here ==============------------
