/*
SPREAD
 Exercise 5 of 9

ES6 provides two closely related concepts, rest and spread, for functions with variadic numbers of arguments. In this exercise we'll explore the spread side of things.

An example of a variadic function would be Math.max, which you can call with any number of arguments: Math.max(1, 2) or Math.max(1, 2, 3) or ...

In ES6, you can use the ...args syntax to "spread" an array out when calling such a function. For example,

    var numbers = [1, 1, 2, 3, 5, 8];
    var max = Math.max(...numbers);

This replaces the need for our old friend, .apply. Good riddance!

-------------------------------------------------------------------------------
You'll be given a variable number of arguments (process.argv[2] onward) to your program, all of which will be numbers. Use the ES6 spread operator to find the minimum value of these numbers and log it to the console. And let's log the list of numbers themselves, to make it clearer. So the output should be, for example:

    The minimum of [18,5,7,24] is 5

*/

// drop first two items in the array
var args = process.argv.slice(2);

var min = Math.min(...args);

console.log(`The minimum of [${args}] is ${min}`);

/*
 Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    var numbers = process.argv.slice(2);
    var min = Math.min(...numbers);

    console.log(`The minimum of [${numbers}] is ${min}`);

────────────────────────────────────────────────────────────────────────────────
*/
