/*
 *
─────────────────────────────────────
 DEFAULT ARGUMENTS, Part 1
 Exercise 7 of 9

In ES6, functions can take default arguments:

    function sayHello(greeting = "Hello", name = "CampJS") {
        console.log(`${greeting} ${name}!`);
    }

When you call the function without arguments in those positions, the default ones are applied instead:

    sayHello();            // "Hello CampJS!"
    sayHello("Hi there");  // "Hi there CampJS!"

You can also use undefined in any argument position to trigger the default:

    sayHello(undefined, undefined); // "Hello CampJS!"
    sayHello("Hiya", undefined);    // "Hiya CampJS!"
    sayHello(undefined, "JSConf");  // "Hello JSConf!"

Note that other values will not trigger the defaulting, even falsy values like null, false, "", or 0:

    sayHello(null, 0); // "null 0!"

-------------------------------------------------------------------------------
As in the rest parameters exercise, your goal is to write a Node module whose default export is a function. This time it will take two arguments: a lower bound and an upper bound. Your function should return the midpoint between those two bounds.

However, your function should have sensible defaults. The lower bound should default to 0, and the upper bound should default to 1.

As before, you don't need to print anything to the console. Your solution should look something like

    module.exports = function midpoint(/ what goes here /) {
        // what goes here?
    };

We'll test your module by passing it a few different sets of arguments: sometimes none, sometimes one, sometimes two. Sometimes we'll pass in an explicit undefined, and you should be sure to treat that as the default.
*/

//module.exports = function midpoint(lower = 0, upper = 1) {
    //return (lower + upper) / 2
//};

module.exports = (lower = 0, upper = 1) => {
    return (lower + upper) / 2;
};


/*
Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    module.exports = (x = 0, y = 1) => (x + y) / 2;

────────────────────────────────────────────────────────────────────────────────
*/

