"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 3

   Crossword Puzzle Script
   
   Author: Gabriel Hernandez
   Date: 3/26/19 
   
   Global Variables
   ================
   allLetters
      References all of the letter cells in the crossword table#crossword
   
   currentLetter
      References the letter currently selected in the puzzleLetter
      
   wordLetters
      References the across and down letters in the word(s) associated with the current letter
   
   acrossClue
      References the across clue associated with the current letter
      
   downClue
      References the down clue associated with the current letter
      
         
   Functions
   =========
   
   init()
      Initializes the puzzle, setting up the event handlers and the variable values
       
   formatPuzzle(puzzleLetter)
      Formats the appearance of the puzzle given the selected puzzle letter
      
   selectLetter(e)
      Applies keyboard actions to select a letter or modify the puzzle navigation
      
   switchTypeDirection()
      Toggles the typing direction between right and down
      
   getChar(keyNum)
      Returns the text character associated with the key code value, keyNum


*/

var allLetters;
var currentLetter;
var wordLetters;
var acrossClue;
var downClue;
var typeDirection= "right";

window.onload = init;

//sets up the condidtions of the puzzle
function init() {
      allLetters = document.querySelectorAll("table#crossword span");
      
      //
      currentLetter = allLetters[0];
      //
      
      var acrossID = currentLetter.dataset.clueA.value;
      var downID = currentLetter.dataset.clueD.value;

      acrossClue = document.getElementById(currentLetter.dataset.clueA);
      downClue = document.getElementById(currentLetter.dataset.clueD);

      //color cross word's first letter
      formatPuzzle(currentLetter);

      for (var i = 0; i < allLetters.length; i++) {
            allLetters[i].style.cursor = "pointer";
            allLetters[i].onmousedown = function (e) {
                  formatPuzzle(e.target);
            };
      }

      document.onkeydown = selectLetter;

      var typeImage = document.getElementById("directionImg");
      typeImage.style.cursor = "pointer";
      typeImage.onclick = switchTypeDirection;
      
      document.addEventListener("onclick", function () {
            for (var i = 0; i < allLetters.length; i++) {
                  if (textContent !== dataset.letter) {
                        letter.style.color = "red";
                  }
                  setTimeout(function () {
                        for (var i = 0; i < allLetters.length; i++) {
                              allLetters[i].style.color = "";
                        }
                  },3000);
            }           
      });

}

//format the colors for the puzzle's cells and clues
function formatPuzzle(puzzleLetter) {
      currentLetter = puzzleLetter;

      for (var i = 0; i < allLetters.length; i++) {
            allLetters[i].style.backgroundColor = "";
      }

      acrossClue.style.color = "";
      downClue.style.color = "";

      if (currentLetter.dataset.clueA !== undefined) {
            acrossClue = document.getElementById(currentLetter.dataset.clueA);
            acrossClue.style.color = "blue";
            wordLetters = document.querySelectorAll("[data-clue-a = " + currentLetter.dataset.clueA + "]");
            for (var i = 0; i < wordLetters.length; i++) {
                  wordLetters[i].style.backgroundColor = "rgb(231, 231, 255)";      
            }
            
      }

      if (currentLetter.dataset.clueD !== undefined) {
            downClue = document.getElementById(currentLetter.dataset.clueD);
            downClue.style.color = "red";
            wordLetters = document.querySelectorAll("[data-clue-d = " + currentLetter.dataset.clueD + "]");
            for (var i = 0; i < wordLetters.length; i++) {
                  wordLetters[i].style.backgroundColor = "rgb(255, 231, 231)";
            }
            
      }

      if (typeDirection === "right") {
            currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
      } else {
            currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
      }
}

//selector puzzle cells using key board
function selectLetter(e) {
      var leftLetter = document.getElementById(currentLetter.dataset.left);
      var upLetter = document.getElementById(currentLetter.dataset.up);
      var downLetter = document.getElementById(currentLetter.dataset.down);
      var rightLetter = document.getElementById(currentLetter.dataset.right);

      var userKey = e.keyCode;
      
      // etermines the response based on the value of the key pressed
      if (userKey === 37) {
            formatPuzzle(leftLetter);
      } else if (userKey === 38) {
            formatPuzzle(upLetter); 
      } else if (userKey === 39 || userKey === 9) {
            formatPuzzle(rightLetter);
      } else if (userKey === 40 || userKey === 13) {
            formatPuzzle(downLetter);
      } else if (userKey === 8 || userKey === 46) {
            currentLetter.textContent = "";
      } else if (userKey === 32) {
            switchTypeDirection();
      } else if (userKey >= 65 && userKey  <= 90) {
            currentLetter.textContent = getChar(userKey);
            if (typeDirection === "right") {
                  formatPuzzle(rightLetter);
            } else {
                  formatPuzzle(downLetter);
            }
      } 
      e.preventDefault();
      
}

//changes the direction(right or down) the user is typing
 function switchTypeDirection() {
      var typeImage = document.getElementById("directionImg");
      if (typeDirection === "right") { 
            typeDirection = "down";
            typeImage.src = "pc_down.png";
            currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
      } else {
            typeDirection = "right";
            typeImage.src = "pc_right.png";
            currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
      }
 }


   





/*====================================================*/

function getChar(keyNum) {
   return String.fromCharCode(keyNum);
}