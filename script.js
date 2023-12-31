const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['keyboard', 'mouse', 'scanner', 'printer', 'desktop', 'laptop', 'charger'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

console.log(selectedWord);

const correctLetters = [];
const wrongLetters = [];

//Show hidden letter
function displayWord() {
    wordEl.innerHTML = `
      ${selectedWord
            .split('')
            .map(letter => `
           <span class="letter">
              ${correctLetters.includes(letter) ? letter : ''}
           </span>
        `).join('')
        }
    `;

    const innerword = wordEl.innerText.replace(/\n/g, '')
    
    if (innerword == selectedWord) {
        finalMessage.innerText = "Congratulations, you nailed it!"
        popup.style.display = "flex"
    }
}

// Upadte the wrong letters
function updateWrongLettersEl() {
    //Display wrong letters
    wrongLettersEl.innerHTML = `
       ${wrongLetters.length > 0 ? '<p>wrong</p>' : ''}
       ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //Display parts
    figureParts.forEach((part, index) => {
        const error = wrongLetters.length;

        if (index < error) {
            part.style.display = 'block'
        } else {
            part.style.display = 'none'
        }
    });

    //Check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = "Sorry! you lost this round";
        popup.style.display = "flex";
    }
}

//Show Notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => { 
        notification.classList.remove('show')
    }, 2000);
}

//Keydown letter press
window.addEventListener('keydown', e => {
    // console.log(e.keyCode);


    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
           if (!correctLetters.includes(letter)) {
               correctLetters.push(letter)

               displayWord();
           } else {
               showNotification();
           }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }

})

//Restart game and play again
playAgainBtn.addEventListener('click', () => {
    //Empty the arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
})
displayWord();