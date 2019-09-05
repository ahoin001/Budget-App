// Module For Budget
let budgetController = (function () {

    // Everything here is private due to scope and can't be accessed on global scale
    let x = 23;

    let add = function (a) {
        return x + a;
    }

    // Will return object to budgetController that can access data in outer function due to Closures
    return {

        // This method will always have accesss to the outer function above due to closure
        // All tho the above won't be accessible globally. So we can have private info
        publicTest: function (b) {
            // console.log(add(b));
            return add(b);
        }
    }

})();

// Module For UI
let UIController = (function (params) {
    




})();

// 2 parameters, argument passed in second paranthesis
let controller = (function (budgetControl,UIControl) {
    
    let z = budgetControl.publicTest(5);
    
    return {
        publicTest2: function () {
            console.log(z);
        }
    }


})(budgetController,UIController);