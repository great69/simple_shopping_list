var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var todoItems = document.getElementsByClassName("todo-item");
var removeButtons = document.getElementsByClassName("remove-button");

var currentMaxId = todoItems.length - 1; //current index of the last list element

function inputLength() {
	return input.value.length;
}

/*Create list element with remove button*/
function createListElement() {
    currentMaxId += 1; //index of this inserted element
	var li = document.createElement("li");
    //Create a span text with class and unique id
    var span = document.createElement("span");
    span.appendChild(document.createTextNode(input.value + " "));
    span.setAttribute("class", "todo-item");
    span.setAttribute("id", "todo-"+currentMaxId);
    //Create a remove button with correct attributes and unique id
    var btn = document.createElement("button");
    btn.appendChild(document.createTextNode("Remove"));
    btn.setAttribute("class", "remove-button");
    btn.setAttribute("type", "button");
    btn.setAttribute("name", "rm-button");
    btn.setAttribute("id", "rm-"+currentMaxId);
    //Set the HTML of the list item (Ref: https://stackoverflow.com/a/36798273)
	li.innerHTML += span.outerHTML + btn.outerHTML;
    //Set attribute of the current list item
    li.setAttribute("id", "li-"+currentMaxId);
	ul.appendChild(li);
    //Add event listener to this newly created list item
    document.getElementById("todo-"+currentMaxId).addEventListener("click", toggleDone(currentMaxId));
    document.getElementById("rm-"+currentMaxId).addEventListener("click", removeListAfterClick);
	input.value = ""; //Reset the input value
}

function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}

function toggleDone(index) {
    return function() {
        var ind = event.target.id.replace(/\D/g, ''); //Get the number from the id
        var listToToggle = document.getElementById("todo-"+ind);
        listToToggle.classList.toggle("done");
    }
}

function removeListAfterClick(event) {
    var ind = event.target.id.replace(/\D/g, ''); //Get the number from the id
    var listToDelete = document.getElementById("li-"+ind);
    listToDelete.parentNode.removeChild(listToDelete);
}

button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

//Initialize event listeners for existing list items
for (var i = 0; i < todoItems.length; i++) {
    todoItems[i].addEventListener("click", toggleDone(i));
}

for (var i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener("click", removeListAfterClick);
}
