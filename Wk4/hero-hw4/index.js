// ============================ //
// Submitted by:
// Name: Allana Picana
// ICS 385 Spring 2026
// Week 4 Assignment 4a - Basic Node.js
// ============================ //

// Create object and variable to display random superhero and supervillain names
const superheroes = require('superheroes');
const supervillains = require('supervillains');

// Generates random superhero and supervillain names using .random() method
var mySuperHeroName = superheroes.random();
var mySuperVillainName = supervillains.random();

// displays the random names in the console
console.log(mySuperHeroName);
console.log(mySuperVillainName);

// create object and variable to display a random inspirational quote using .getRandomQuote() method
const Quote = require('inspirational-quotes');
var myQuote = Quote.getRandomQuote();
console.log(myQuote);


// Allana's extension code for Week4a Assignment starts here: //
// ============================= //

// Create object and variable to display popular movie quotes in the console
const PopularMovieQuotes = require('popular-movie-quotes');
var myMovieQuote = PopularMovieQuotes.getRandomQuote();
console.log(myMovieQuote);

// create object and variable to display famous last words in the console
const FamousLastWords = require('famous-last-words');
var myFamousLastWords = FamousLastWords[0]; // Access first element of the FamousLastWords array
console.log(myFamousLastWords);

// ============================ //



// creates a local web server and displays the above variables
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  // Allana's comments: added the 2 additonal variables to be displayed on the web server:
  res.end(
    "Super Hero: " + mySuperHeroName + 
    "\nSuper Villain: " + mySuperVillainName + 
    "\nQuote of the Day: " + myQuote + 
    "\nPopular Movie Quote: " + myMovieQuote +  // additional package insatlled from npm
    "\nFamous Last Words: " + myFamousLastWords // addtional package installed from npm
  );

  // Allana's comments: added extension code to create 5 text files with the above variables:
  // create object that stores the variables in a string format
  const fileContents = 
    "Super Hero: " + mySuperHeroName + 
    "\nSuper Villain: " + mySuperVillainName + 
    "\nQuote of the Day: " + myQuote+ 
    "\nPopular Movie Quote: " + myMovieQuote + 
    "\nFamous Last Words: " + myFamousLastWords;

    const fs = require("fs");
  // create 5 text files with the above string content
  fs.writeFileSync("File-1.txt", fileContents);
  fs.writeFileSync("File-2.txt", fileContents);
  fs.writeFileSync("File-3.txt", fileContents);
  fs.writeFileSync("File-4.txt", fileContents);
  fs.writeFileSync("File-5.txt", fileContents);

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});