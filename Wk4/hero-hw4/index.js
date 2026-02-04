//jshint esversion:6

const superheroes = require('superheroes');
const supervillains = require('supervillains');

var mySuperHeroName = superheroes.random();
var mySuperVillainName = supervillains.random();

console.log(mySuperHeroName);
console.log(mySuperVillainName);

const Quote = require('inspirational-quotes');
var myQuote = Quote.getRandomQuote();
console.log(myQuote);

// Allana's extension code for Week4a Assignment starts here: //
// ============================= //

// Create object and variable to display popular movie quotes
const PopularMovieQuotes = require('popular-movie-quotes');
var myMovieQuote = PopularMovieQuotes.getRandomQuote();
console.log(myMovieQuote);

// create object and variable to display famous last words
const FamousLastWords = require('famous-last-words');
var myFamousLastWords = FamousLastWords[0];
console.log(myFamousLastWords);

// ============================ //



// creates a local web server and displays the above variables
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  // Allana's comments: added the 2 additonal  variables to be displayed on the web server:
  res.end(
    "Super Hero: " + mySuperHeroName + 
    "\nSuper Villain: " + mySuperVillainName + 
    "\nQuote of the Day: " + myQuote + 
    "\nPopular Movie Quote: " + myMovieQuote + 
    "\nFamous Last Words: " + myFamousLastWords
  );

  // Allana's comments: added extension code to create 5 text files with the above variables:
  const fileContents = 
    "Super Hero: " + mySuperHeroName + 
    "\nSuper Villain: " + mySuperVillainName + 
    "\nQuote of the Day: " + myQuote+ 
    "\nPopular Movie Quote: " + myMovieQuote + 
    "\nFamous Last Words: " + myFamousLastWords;

    const fs = require("fs");
  fs.writeFileSync("File-1.txt", fileContents);
  fs.writeFileSync("File-2.txt", fileContents);
  fs.writeFileSync("File-3.txt", fileContents);
  fs.writeFileSync("File-4.txt", fileContents);
  fs.writeFileSync("File-5.txt", fileContents);

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});