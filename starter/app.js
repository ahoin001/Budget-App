// Module For Budget
let budgetController = (function () {


})();

// Module For UI : UICONTROLLER will be returned an method with a function that returns the user input values in an object
let UIController = (function (params) {

    return {
        getinput: function () {

            // We can return multiple methods so that UIcontroller will have access to many actions 
            return {

                // pass the user inputs as an object so we can access theem easier
                type: document.querySelector('.add__type').value,
                description: document.querySelector('.add__description').value,
                value: document.querySelector('.add__value').value

            }

        }
    }

})();

// GLOBAL APP CONTROLLER: We will tell other modules what to do from here
let controller = (function (budgetControl, UIControl) {

    // 
    let controllAddItem = function name(params) {

        // GET FIELD INPUT DATA

        let input = UIController.getinput();
        console.log(input);

        // ADD THE ITEM TO THE BUDGET CONTROLLER

        // ADD THE ITEM TO THE UI

        // CALCULATE THE BUDGET

        // DISPLAY THE BUDGET ON THE UI

    }

    document.querySelector('.add__btn').addEventListener('click', controllAddItem)

    // Event is object with information of our event 
    document.addEventListener('keypress', function (event) {

        // To see event properties
        console.log(event);

        // Enter key was pressed
        if (event.keyCode === 13) {
            // console.log('Enter was pressed')
            controllAddItem();
        }

    })

})(budgetController, UIController);