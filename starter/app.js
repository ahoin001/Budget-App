// Module For Budget
let budgetController = (function () {


})();

// Module For UI
let UIController = (function (params) {





})();

// GLOBAL APP CONTROLLER
let controller = (function (budgetControl, UIControl) {

    // 
    let controllAddItem = function name(params) {
        
        // GET FIELD INPUT DATA

        // ADD THE ITEM TO THE BUDGET CONTROLLER

        // ADD THE ITEM TO THE UI

        // CALCULATE THE BUDGET

        // DISPLAY THE BUDGET ON THE UI

        console.log('Works')

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