// Module For Budget
let budgetController = (function () {

    // Constructors made by using function instead of class, each expense saved will have these 3 properties
    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        // -1 same as undefined
        this.percentage = -1;
    };

    // How to add method to function classes
    Expense.prototype.calculatePercentage = function (totalIncome) {

        if (totalIncome > 0) {
            console.log(`Ran the if`);
            this.percentage = Math.round((this.value / totalIncome) * 100);
        }
        else {
            console.log(`Ran the else`);
            this.percentage = -1;
        }

    }

    // Returns current percentage of item
    Expense.prototype.getPercentage = function () {

        return this.percentage;

    }

    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Data Structures that will contain all expenses and incomes, and total expenses and total incomes
    // budget and perecentage
    let data = {

        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        // Set to minus -1, -1 is like saying nonexsistant 
        perecentage: -1

    }

    let calculateTotal = function (type) {

        let sum = 0;

        // Go through either income or expense array and then add them all up
        data.allItems[type].forEach(current => {

            // Sum starts at 0, then is added by each value of income or expense
            sum = sum + current.value;
        });

        // Add the total into the proper type
        data.totals[type] = sum;

    }

    // Public methods we can use everywhere
    return {

        // Recieves type desc and value
        addItem: function (type, description, value) {

            let newItem, ID;

            // To Create Unique ID
            if (data.allItems[type].length > 0) {

                // create new object 
                // The next ID created will alays be whatever the value of last ID is plus 1 So that every ID is unique and increase by 1
                // Selects last inc/exp instance in the array, gets the value of its ID, and then adds 1
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;

            }
            else {
                // if list is empty, create a object with id 0
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

        deleteItem: function (type, id) {

            let ids, index;

            // current will be each item in array from the array with type we provide
            // Map will do something to each element and return it as a new array 
            // We are returning all the ids in the original array to our new array
            ids = data.allItems[type].map(function (current) {

                return current.id;

            });

            // Check if the id we want to delete is in the array of id's ny getting its index
            index = ids.indexOf(id);

            // If the id is in the array (-1 = not found in array)
            if (index !== -1) {
                // Splice will remove 1 element, starting at the index we provide
                // We remove the item with the id we wanted to delete from the data structure
                data.allItems[type].splice(index, 1);
            }

        },

        calculateBudget: function () {

            // Calculate total income and expenses
            calculateTotal('inc');
            calculateTotal('exp');

            // Calculate the budget: income - expenses (Money leftover)
            data.budget = data.totals.inc - data.totals.exp;

            if (data.totals.inc > 0) {

                // Calculate the % of income that we spent ( exp = 50 inc = 100, 50/100 = .50 * 100 = 50%)
                data.perecentage = Math.round((data.totals.exp / data.totals.inc) * 100);

            } else {
                data.perecentage = -1;
            }

        },

        calculatePercentages: function () {

            data.allItems.exp.forEach(function (current) {

                // Eacch expense item will call calculate expense method 
                current.calculatePercentage(data.totals.inc);

            })

        },

        getPercentages: function () {

            // Goes through array of expense items and returns their percentages in a new array
            let allPercentages = data.allItems.exp.map(function (current) {
                return current.getPercentage();
            })

            // getPercentages then returns the new array that has all the percents
            return allPercentages;

        },

        // Data regarding Budget
        getBudgetData: function () {
            return {

                budget: data.budget,
                totalIncome: data.totals.inc,
                totalExpenses: data.totals.exp,
                perecentage: data.perecentage

            }

        },

        testing: function () {
            return console.log('The Data', data);
        }
    };
})();

// Module For UI : UIController will be returned an method with a function that returns the user input values in an object
let UIController = (function () {

    /********************************************************
            PRIVATE VARIABLES AND DATA
    *********************************************************/

    // If class names were changed in html, we would need to go through all our DOM strings and change them accordingly
    // If we use this object for our dom selection, we will only have to change the class name(or other information) here
    let DOMStrings = {

        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputAddButton: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensePercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'

    }

    let formatNumber = function (num, type) {

        let numSplit, int, dec;

        /* 
        + or - before number
        exacly 2 decimal points
        comma seperating thousands  
        */

        // remove sign from number 
        num = Math.abs(num);

        // Always have 2 decimals spaces on right
        // 2000 = 2000.00 
        num = num.toFixed(2);

        // Split number at decimal point 
        numSplit = num.split('.');

        // number left of decimal point
        int = numSplit[0];

        // If the integer is more than 3 digits
        if (int.length > 3) {

            //  1st substr returns the numbers left of comma 2nd substr returns the numbers after comma
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 2310,output 2,310

        }

        dec = numSplit[1];

        // Return sign depending on type, then concatenate integer and decimal part of number from above
        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

    };

    // Loop through all the nodes and change the expensepercentagelabel property on them
    let nodeListForEach = function (list, callback) {

        // Iterates through node list
        for (let i = 0; i < list.length; i++) {

            // A function that will do something to each node
            callback(list[i], i);

        }
    }

    // This object that is returned will have access to the outer function, so DOMStrings is private unless 
    // called with getInput mehthod
    return {

        // We can place multiple methods so that UIcontroller will have access to many actions 

        getinput: function () {

            return {

                /********************************************************
                  Pass the user inputs as an object so we can access theem easier
                *********************************************************/
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

        deleteListItem: function (idOfTarget) {

            // Get a reference to the item we want to delete
            let listItemToDelete = document.getElementById(idOfTarget);
            console.log(listItemToDelete);

            // Find the items parent node, then have it remove the child that we want to delete (itself in this case)
            listItemToDelete.parentNode.removeChild(listItemToDelete);

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

                html = `<div class="item clearfix" id="inc-${obj.id}">
                            <div class="item__description">${obj.description}</div>
                            <div class="right clearfix">
                                <div class="item__value">${formatNumber(obj.value, type)}</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn">
                                        <i class="ion-ios-close-outline"></i>
                                    </button>
                                </div>
                            </div>
                        </div>`

            } else if (type === 'exp') {

                element = DOMStrings.expenseContainer;

                html = `<div class="item clearfix" id = "exp-${obj.id}" >
                            <div class="item__description">${obj.description}</div>
                            <div class="right clearfix">
                                <div class="item__value"> ${formatNumber(obj.value, type)}</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn">
                                        <i class="ion-ios-close-outline"></i>
                                    </button>
                                </div>
                            </div>
                        </div >`

            }

            // TODO Why didn't this work? Look it Up Tomorrow
            // Replace placeholder text with actual data from object, newhtml equals the original string with the values replaced
            // newHtml = html.replace('%id%', obj.id);
            // newHtml = html.replace('%desc%', obj.description);
            // newHtml = html.replace('%value%', obj.value);

            // Insert HTML into the DOM using insertAdjacentHTML, new items will always be added at end of list
            // document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);

            // Insert HTML into the DOM using insertAdjacentHTML, new items will always be added at end of list
            document.querySelector(element).insertAdjacentHTML("beforeend", html);

        },

        // 
        displayBudget: function (obj) {

            let type;
            obj.budget > 0 ? type = 'inc' : type = 'exp'

            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalIncome, 'inc');
            document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.totalExpenses, 'exp');


            // The data above is gathered from this budget object we are planning to pass in as obj 
            // budget: data.budget,
            // totalIncome: data.totals.inc,
            // totalExpenses: data.totals.exp,
            // perecentage: data.perecentage

            if (obj.perecentage > 0) {

                // If the percentage is positive, show it in DOM
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.perecentage + '%';

            } else {

                // If percentage is 0 or negative, then don't display anything
                document.querySelector(DOMStrings.percentageLabel).textContent = '---'

            }

        },

        displayDate: function () {
            let now, year, month, months;

            // Date is current time ( Year month day)
            now = new Date();

            year = now.getFullYear();

            // Array is so that we can use 
            months = ['Janurary', 'Feburary', 'March', 'April', 'May',
                'June', 'July', 'August', 'September', 'October', 'November', 'December']

            month = now.getMonth();

            document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' ' + year;

        },

        displayPercentages: function (percentages) {

            // Will return a list of nodes , not an array
            let fields = document.querySelectorAll(DOMStrings.expensePercentageLabel);

            nodeListForEach(fields, function (current, index) {

                // Current is the current item in list, percenindex will be the value we get from list of %'s
                if (percentages[index] > 0) {

                    // On the current node , give it the percent matching it from the array of %'s
                    current.textContent = percentages[index] + '%';

                }
                else {

                    current.textContent = percentages[index] + '%';

                }

            })

        },

        changeType: function () {

            // Select the nodes with following class names and hold them in nodelist callled fields
            let fields = document.querySelectorAll(
                DOMStrings.inputType + ',' +
                DOMStrings.inputDescription + ',' +
                DOMStrings.inputValue

            );

            // in each field, toggle red focus class
            nodeListForEach(fields, function (current) {

                current.classList.toggle('red-focus');

            })

            // Also change the color of the button that adds the item
            document.querySelector(DOMStrings.inputAddButton).classList.toggle('red');

        }

    }

})();

// GLOBAL APP CONTROLLER: We will tell other modules what to do from here
let controller = (function (budgetControl, UIControl) {

    // Set up events to be triggered on stage
    let setupEventListeners = function () {

        // Allows us to access domstrings from UIController 
        let DOMStrings = UIController.getDOMStrings();

        // EVENT LISTENERS
        document.querySelector(DOMStrings.inputAddButton).addEventListener('click', controllAddItem)

        // Event is object with information of our event 
        document.addEventListener('keypress', function (event) {

            // TODO : To see event properties/ try to find out more about event
            // console.log(event);

            // Enter key was pressed
            if (event.keyCode === 13) {
                // console.log('Enter was pressed')
                controllAddItem();
            }

        });

        document.querySelector(DOMStrings.container).addEventListener('click', controlDeleteItem);

        // Whenevr the input type changes ( From + to -) call function that toggles red-focus class on button, type, and value
        document.querySelector(DOMStrings.inputType).addEventListener('change', UIController.changeType);



    }

    // This method is called after every update 
    let updateBudget = function () {

        // 1. Calculate budget
        budgetController.calculateBudget();

        // 2. Return the budget
        let budget = budgetController.getBudgetData();

        // 3. Display the budget on the UI
        console.log('The Budget', budget);
        UIController.displayBudget(budget);

    }

    let updatePercentages = function () {

        // Calculate Perecentages
        budgetController.calculatePercentages();

        // Read them from budget controller
        let percentages = budgetController.getPercentages();

        // Update UI with new percentages
        UIController.displayPercentages(percentages);
        console.log(percentages);

    }

    let controllAddItem = function name(params) {

        // GET FIELD INPUT DATA
        let input = UIController.getinput();
        console.log('input', input);

        // If user entered something in Description input, and they entered a Number in value input that is greater than 0
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            // ADD THE ITEM TO THE BUDGET CONTROLLER USING USER INPUT FROM UICONTROLLER
            // Hold item in @newItem so we can show the item to UI next
            newItem = budgetController.addItem(input.type, input.description, input.value);
            console.log('Create Item', newItem);

            // ADD THE ITEM TO THE UI
            UIController.addListItem(newItem, input.type);

            // ClearFields
            UIController.clearFields();

            // Calculate and Update the budget
            updateBudget();

            // Calculate and update %'s on top
            updatePercentages();

        }

    }

    const controlDeleteItem = (event) => {

        let itemID, splitID, type, ID;

        // id will equal the id of list item in list ( after deleete button is pressed)
        itemID = (event.target.parentNode.parentNode.parentNode.parentNode.id);
        console.log(itemID);

        if (itemID) {

            // inc-1 will be ['inc','1'] , split method will split at the indicated string, in this case '-'
            splitID = itemID.split('-');

            type = splitID[0];

            // Convert String we got from split array strings so that we can compare it to other integers later on
            ID = parseInt(splitID[1]);
            console.log('ID', ID);

            // 1 Delete Item From Data Structure
            budgetController.deleteItem(type, ID);

            // 2. Delete Item from UI 
            // Gets ID of item to delete then deletes it
            UIController.deleteListItem(itemID);

            // 3. Update Budegt and Show New Budget on UI
            updateBudget();


            // Calculate and update %'s
            updatePercentages();

        }

    }

    // Expose a method that will setup event listener function on start up
    return {

        init: function () {
            console.log('App has started');

            // When page is loaded, listeners are set
            setupEventListeners();

            UIController.displayDate();
            // On first excecution , we pass a blank version of the budget item so starting UI is at 0
            UIController.displayBudget({

                budget: 0,
                totalIncome: 0,
                totalExpenses: 0,
                perecentage: 0

            });
        }

    }

})(budgetController, UIController);

// Sets up event listeners
controller.init();