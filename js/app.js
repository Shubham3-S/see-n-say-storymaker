// Assignment 1 | COMP1073 Client-Side JavaScript

// Sir I would like to have feedback on my coding style and please also let me know If I am using some bad coding practices while coding.

/* Variables
-------------------------------------------------- */
// Created a new speechSynthesis object
// Learn more about SpeechSynthesis.speak() at https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak

var synth = window.speechSynthesis;
var textToSpeak = 'This is the text string that you will generate with your script';
const storyPlay = document.getElementById("PlayStory");
const randomStory = document.getElementById("RandomStory");
let story = "";
// Phrase Arrays;
const phraseOne = ["The Turkey", "Mom", "Dad", "The Dog", "My Teacher", "The Elephant", "The cat"];
const phraseTwo = ["sat on", "Ate", "danced with", "saw", "doesn't like", "kissed"];
const phraseThree = ["a funny", "a scary", "a goofy", "a slimy", "a barking", "a fat"]
const phraseFour = ["goat", "monkey", "fish", "cow", "frog", "bug", "worm"]
const phraseFive = ["on the moon", "on the chair", "in my spaghetti", "in my soup", "on the grass", "in my shoes"]

// this array helps me to kind of map each prase array with its index in button array,
// as phraseOne array is at index 0, the button associated with that array is also at
// index 0, which helps me get array while I am iterating buttons arrays.
const utilityArray = [phraseOne, phraseTwo, phraseThree, phraseFour, phraseFive]

// Array for traking record of buttons are pressed in correct order and all the buttons are pressed
buttonPressed = [false, false, false, false, false]
// Converting nodeList into array then using foreach to apply event listener on each button.
// now the index of button can help me get array associated with it from utility array.
Array.from(document.querySelectorAll('.phraseButton')).forEach((button, index) => button.onclick = () => {
  // if the index is 0 then there is no need to check for previous button, as there is previous button. After pressing that setting buttonPressed[index] true mark it as pressed.
  if ((index == 0 || buttonPressed[index - 1]) && !buttonPressed[index]) {
    story += selectRandomPhrase(utilityArray[index]) + " ";
    buttonPressed[index] = true;

  }
  else if (buttonPressed[index]) {
    alert("you Pressed the same button");
  }
  else {
    alert("You Missed Previous buttons, Please Go in order")
  }
});
/* Functions
-------------------------------------------------- */

// function for returing random element from array.
const selectRandomPhrase = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Adding eventlisteners to storyPlayer.
storyPlay.addEventListener("click", () => {
  // Checking wheather all buttons are pressed or not
  if (buttonPressed.every(Boolean)) {
    speakNow(story);
    reset();
  }
  else {
    alert("You didn't created the whole story by pressing all the buttons");
  }
})

// Function for reset
function reset() {
  story = "";
  buttonPressed = [false, false, false, false, false]

}

/* Event Listeners
-------------------------------------------------- */
// event listener or playing random story.
randomStory.addEventListener("click", () => {
  let story = "";
  utilityArray.forEach((arr) => story += selectRandomPhrase(arr) + " ");
  speakNow(story);
})

function speakNow(string) {
  // Create a new speech object, attaching the string of text to speak
  var utterThis = new SpeechSynthesisUtterance(string);
  // Actually speak the text
  synth.speak(utterThis);
}

