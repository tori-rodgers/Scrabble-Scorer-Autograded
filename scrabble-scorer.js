// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 };

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some Scrabble!\n");
   //let score = oldScrabbleScorer(userWord);
   //console.log(score);
};

function simpleScorer(userWord) {
   let upperCaseWord = userWord.toUpperCase();
   let score = 0;
   for (let char of upperCaseWord) {
      if (char >= 'A' && char <= 'Z') {
         score += 1;
      }
   }
   return score;
};

function vowelBonusScorer(userWord) {
   let upperCaseWord = userWord.toUpperCase();
   let score = 0;
   let vowels = ['A', 'E', 'I', 'O', 'U'];
   for (let char of upperCaseWord) {
      if (char >= 'A' && char <= 'Z') {
         if (vowels.includes(char)) {
            score += 3;
         } else {
            score += 1;
         }
      }
   }
   return score;
};

function transform(oldPointStructure) {
   let newPointStructure = {};
   for (let pointValue in oldPointStructure) {
      let letters = oldPointStructure[pointValue];
      for (let letter of letters) {
         newPointStructure[letter.toLowerCase()] = Number(pointValue);
      }
   }
   return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);

function scrabbleScorer(word) {
   let upperCaseWord = word.toUpperCase();
   let totalScore = 0;
   for (let char of upperCaseWord) {
      if (char >= 'A' && char <= 'Z') {
         let points = newPointStructure[char.toLowerCase()];
         if (points !== undefined) {
            totalScore += points;
         }
      }
   }
   return totalScore;
};

let simple = {
     name: 'Simple Score',
     description: 'Each letter is worth 1 point.',
     scorerFunction: simpleScorer
};
let bonusVowels = {
     name: 'Bonus Vowels',
     description: 'A function that returns a score based on the number of vowels and consonants.',
     scorerFunction: vowelBonusScorer
};
let scrabbleRules = {
     name: 'Scrabble',
     description: 'The traditional scoring algorithm.',
     scorerFunction: scrabbleScorer
};

let scoringAlgorithms = [simple, bonusVowels, scrabbleRules];
 

function scorerPrompt() {
   let scoringOptions = [
      scoringAlgorithms[0],
      scoringAlgorithms[1], 
      scoringAlgorithms[2]
   ];

   console.log('Which scoring algorithm would you like to use?\n');
   console.log('0 - Simple: one point per character');
   console.log('1 - Vowel Bonus: Vowels are worth 3 points');
   console.log('2 - Scrabble: Uses Scrabble point system\n');

   let userAlgChoice = input.question('Enter 0, 1, or 2: ');

   let selectedScorer = scoringOptions[userAlgChoice];
   if (selectedScorer) {
      return selectedScorer;
   } else {
      console.log('Invalid choice. Please enter 0, 1, or 2.');
      return scorerPrompt();
   }
};


function runProgram() {
   initialPrompt();
   let selectedScorer = scorerPrompt();
   let userWord = input.question('Enter a word: ');
   let wordScore = selectedScorer.scorerFunction(userWord);
   console.log(`\nScore for "${userWord}": ${wordScore}`);
};



// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
