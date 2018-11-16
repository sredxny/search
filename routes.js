const express = require('express');
const app = express();
const {Brands,ClothingType} = require('./data/data');

//index route
app.get('/',function(req,res) {
    res.render('home',{});
});


//route to search
app.post('/',function(req,res) {
    body = req.body;

    if ( body.searchterm === ''){
        res.render('home',{});
        return;
    }

    BrandsFound = Search(body.searchterm,Brands);
    ClothingTypeFound = Search(body.searchterm,ClothingType);

    formatedBrandResult = FormatText("b",body.searchterm,BrandsFound);
    formatedResult = FormatText("i",formatedBrandResult,ClothingTypeFound);

    res.render('home',{
        searchResult: formatedResult,
    });
});

//Function that search into the array and return the most related results
function Search(SearchTerm,data){
    var founds=[];

    data.forEach((value) =>{
        if (SearchTerm.search(new RegExp(value, "i")) > -1) {
            //check in found for relevance
            founds.forEach((alreadyFound, index, arr) => {
                if (alreadyFound.search(new RegExp(value, "i")) > -1 ) {
                    //if the new one if bigger then we can replace it in the array
                    if (alreadyFound.length < value.length)
                     founds[index] = value;
                }
            });
            if (founds.length == 0){
                founds.push(value);
            }
        }

    });
    return founds;
}

function FormatText(HtmlTag,SearchTerm, resultsFound){
    var formatedString = SearchTerm;
    resultsFound.forEach((result) =>{
        formatedString = SearchTerm.replace(new RegExp(result, "i"), `<${HtmlTag}>${result}</${HtmlTag}>`);
    });
    return formatedString;
}

module.exports = app;
