const hbs = require('hbs');


// helpers

hbs.registerHelper('showResult', (searchResult) => {

    console.log(searchResult);
    if (searchResult === undefined)
        return "Search the clothes";

    return searchResult;

});