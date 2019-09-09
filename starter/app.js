// Module For Budget
let budgetController = (function () {

    // Constructors made by using function instead of class, each expense saved will have these 3 properties
    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Data Structures that will contain all expenses and incomes, and total expenses and total incomes
    let data = {

        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }

    }

    // Public methods we can use
    return {

        // Recieves type desc and value
        addItem: function (type, description, value) {

            let newItem, ID;

            if (data.allItems[type].length > 0) {

                // create new ID
                // The next ID created will alays be whatever the value of last ID is plus 1 So that every ID is unique and increase by 1
                // Selects last inc/exp instance in the array, gets the value of its ID, and then adds 1
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;

            }
            else {
                ID = 0;
            }

            // if type is expense, create new instance of expense
            if (type === 'exp') {

                newItem = new Expense(ID, description, value);

            }
            // if income, create new instance of income
            else if (type === "inc") {

                newItem = new Income(ID, description, value);

            }

            // Acccess 'data' object structure, then the allItemsObject inside there, and will
            // know what array to add item to based on type that was passed into function
            data.allItems[type].push(newItem);

            return newItem;

        },
        testing: function () {
            console.log(data);
        }
    };
})();

// Module For UI : UIController will be returned an method with a function that returns the user input values in an object
let UIController = (function () {

    /********************************************************
            PRIVATE VAR AND DATA
    *********************************************************/

    // If class names were changed in html, we would need to go through all our DOM strings and change them accordingly
    // If we use this object for our dom selection, we will only have to change the class name(or other information) here
    let DOMStrings = {

        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputAddButton: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'

    }

    // This object that is returned will have access to the outer function, so DOMStrings is private unless 
    // called with getInput mehthod
    return {

        // We can place multiple methods so that UIcontroller will have access to many actions 

        getinput: function () {

            return {

                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,

                // Convert The input from string to Number 
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)

                /********************************************************
                IF WE DO IT THIS WAY, WE WOULD HAVE TO CHANGE ALL CLASS NAMES WHENEVER A CHANGE IS MADE TO A CLASS IN HTML
                *********************************************************/
                // pass the user inputs as an object so we can access theem easier
                // type: document.querySelector('.add__type').value,
                // description: document.querySelector('.add__description').value,
                // value: document.querySelector('.add__value').value

            }

        },

        clearFields: function () {

            let fields, fieldsArray;

            // fields will be List (not array) 
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue)

            // Convert fields into Array
            fieldsArray = Array.prototype.slice.call(fields);

            // Goes through array clearing each field value
            fieldsArray.forEach((current, index, array) => {
                current.value = "";
            });

            // Selects first element, and places user cursor back here for next item to be typed
            fieldsArray[0].focus();
        },

        // Allows to call DOMStrings in public space if needed 
        getDOMStrings: function () {
            return DOMStrings
        },

        // Adds item to dom
        addListItem: function (obj, type) {

            // Create HTML string with placeholder text , newHTML will have updated text, element will be target on DOM
            let html, newHtml, element;

            if (type === 'inc') {

                // TODO WHY IS REPLACE NOT WORKING FOR DESCRIPTION BUT IT WORKS FOR VALUE?
                // The name of element we will target in DOM that we take from our DOMStrings object, so we can easily change classes
                element = DOMStrings.incomeContainer;

                html = `<div class="item clearfix" id="income-%id%">
                            <div class="item__description">${obj.description}</div>
                            <div class="right clearfix">
                                <div class="item__value">+%value%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`

            } else if (type === 'exp') {

                element = DOMStrings.expenseContainer;

                html = `<div class="item clearfix" id = "expense-%id%" >
                            <div class="item__description">${obj.description}</div>
                            <div class="right clearfix">
                                <div class="item__value">- %value%</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div >`

            }

            // Replace placeholder text with actual data from object, newhtml equals the original string with the values replaced
            newHtml = html.replace('%id%', obj.id);
            newHtml = html.replace('%desc%', obj.description);
            newHtml = html.replace('%value%', obj.value);

            // Insert HTML into the DOM using insertAdjacentHTML, new items will always be added at end of list
            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);

        }

    }

})();

// GLOBAL APP CONTROLLER: We will tell other modules what to do from here
let controller = (function (budgetControl, UIControl) {

    // 
    let setupEventListeners = function () {

        // Allows us to access domstrings from UIController 
        let DOMStrings = UIController.getDOMStrings();

        // EVENT LISTENERS
        document.querySelector(DOMStrings.inputAddButton).addEventListener('click', controllAddItem)

        // Event is object with information of our event 
        document.addEventListener('keypress', function (event) {

            // To see event properties
            // console.log(event);

            // Enter key was pressed
            if (event.keyCode === 13) {
                // console.log('Enter was pressed')
                controllAddItem();
            }

        })
    }

    let updateBudget = function () {

        // 1. Calculate budget


        // 2. Return the budget


        // 3. Display the budget on the UI

    }

    let controllAddItem = function name(params) {

        // GET FIELD INPUT DATA
        let input = UIController.getinput();
        console.log(input);

        // If user entered something in Description input, and they entered a Number in value input that is greater than 0
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            // ADD THE ITEM TO THE BUDGET CONTROLLER USING USER INPUT FROM UICONTROLLER
            // Hold item in @newItem so we can show the item to UI next
            newItem = budgetController.addItem(input.type, input.description, input.value);
            console.log(newItem);

            // ADD THE ITEM TO THE UI
            UIController.addListItem(newItem, input.type);

            // ClearFields
            UIController.clearFields();
        
        } else {

        }



        // CALCULATE THE BUDGET

        // DISPLAY THE BUDGET ON THE UI

    }

    // Expose a method that will call pur setup event listener function
    return {

        init: function () {
            console.log('App has started');
            setupEventListeners();
        }

    }

})(budgetController, UIController);

// Sets up event listeners
controller.init();