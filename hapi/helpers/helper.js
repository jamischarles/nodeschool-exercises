// For exercise 07
// The helper should concatenate the name and suffix query parameters.
//
// Helpers are functions used within templates to perform transformations and other
// data manipulations using the template context or other inputs.

module.exports = function(context) {
  // console.log(context.data.root.query);
  // console.log(context.data.root.query.name);
  // concat name and suffix
  return context.data.root.query.name + context.data.root.query.suffix;
}
