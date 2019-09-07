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
            expenses: [],
            incomes: []
        },
        totals: {
            expenses: [],
            incomes: []
        }

    }

    // Public methods we can use
    return {

        // Recieves type desc and value
        addItem: function (type, description, value) {

            let newItem;

            // if expense, create new instance of expense
            if (type === 'exp') {
                newItem = new Expense(ID, description, value);

            }
            // if income, create new instance of income
            else if (type === "inc") {
                newItem = new Income(ID, description, value);
            }

        }

    }

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
        inputAddButton: '.add__btn'

    }

    // This object that is returned will have access to the outer function, so DOMStrings is private unless 
    // called with getInput mehthod
    return {

        // We can place multiple methods so that UIcontroller will have access to many actions 

        getinput: function () {

            return {

                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value

                /********************************************************
                IF WE DO IT THIS WAY, WE WOULD HAVE TO CHANGE ALL CLASS NAMES WHENEVER A CHANGE IS MADE TO A CLASS IN HTML
                *********************************************************/
                // pass the user inputs as an object so we can access theem easier
                // type: document.querySelector('.add__type').value,
                // description: document.querySelector('.add__description').value,
                // value: document.querySelector('.add__value').value

            }

        },

        // Allows to call DOMStrings in public space if needed 
        getDOMStrings: function () {
            return DOMStrings
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

    let controllAddItem = function name(params) {

        // GET FIELD INPUT DATA

        let input = UIController.getinput();
        console.log(input);

        // ADD THE ITEM TO THE BUDGET CONTROLLER


        // ADD THE ITEM TO THE UI

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