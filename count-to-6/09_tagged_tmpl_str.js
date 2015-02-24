/*
 *
 TAGGED TEMPLATE STRINGS
 Exercise 9 of 9

In addition to the features you already learned about, template strings can be tagged. This is done by placing a function name, like fn, before the template string. For example:

    fn`Hello ${you}! You're looking ${adjective} today!`

The semantics of a tagged template string are very different from those of a normal one. In essence, they are a special type of function call: the above "desugars" into

    fn(["Hello ", "! You're looking ", " today!"], you, adjective);

Note how the (n + 1)th argument corresponds to the substitution that takes place between the nth and (n + 1)th entries in the string array. Thus, there is always one more entry in the string array than there are substitutions; in the above, the counts are 3 vs. 2.

This can be useful for all sorts of things, but one of the most straightforward is automatic escaping of any interpolated variables. For example, you could write an HTML-escaping function, and name it html, such that

    html`<p title="${title}">Hello ${you}!</p>`

returns a string with the appropriate variables substituted in, but with all HTML-unsafe characters replaced.

-------------------------------------------------------------------------------
In fact, let's do that right now. You will be given two arguments to your program: a username, and a comment. Both will potentially contain HTML-unsafe characters (namely ', ", <, >, and &). Your job is to use tagged template strings to log a safely-escaped HTML rendering of the comment.

For example, if the username is "domenic" and the comment is "<dl> is a fun tag", you should output

    <b>domenic says</b>: "&lt;dl&gt; is a fun tag"

As before, you could start doing this using simple ES5 constructs. But the goal is for you to write a function that you can use as a tag in a tagged template string, that will do any escaping automatically.

## HINTS

If you don't remember the corresponding escape sequences, they are:

    ' | &#39;
    " | &quot;
    < | &lt;
    > | &gt;
    & | &amp;

Remember that the best way to do string replacement in JavaScript is with regular expressions, e.g.

    var replacedS = originalS.replace(/a/g, "b");

The outline of your program should look something like this:

    console.log(html`<b>${process.argv[2]} says</b>: "${process.argv[3]}"`);

    function html(/ what goes here? /) {
        // what goes here?
        // don't forget to return the escaped string!
    }

If you're not sure where to start, maybe try console.loging the arguments to your html function.

Finally, feel free to use rest parameters if you think that would make things easier!
*/

console.log(html`<b>${process.argv[2]} says</b>: "${process.argv[3]}"`);


function html(string, var1, var2) {
//function html(...args) {
    //console.log(arguments);
    // don't forget to return the escaped string!
    // do all the safety checks
    var1 = var1.replace(/&/g, '&amp;').replace(/'/g, '&#39;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    var2 = var2.replace(/&/g, '&amp;').replace(/'/g, '&#39;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    return string[0] + var1 + string[1] + var2 + string[2];
    // if I were fancier, I'd not use just args, I'd make it work with variable args.
};




/*
Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    console.log(html`<b>${process.argv[2]} says</b>: "${process.argv[3]}"`);

    function html(pieces, ...substitutions) {
        var result = pieces[0];
        for (var i = 0; i < substitutions.length; ++i) {
            result += escape(substitutions[i]) + pieces[i + 1];
        }

        return result;
    }

    function escape(s) {
        return s.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/'/g, "&#39;")
                .replace(/"/g, "&quot;");
    }

────────────────────────────────────────────────────────────────────────────────
*/
