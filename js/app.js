const restartBtn = document.querySelector(".restart");
const deck = document.querySelector(".deck");
const moves = document.querySelector(".moves");
const scorePanel = document.querySelector(".score-panel");

const cards = [];
let listOpenCards = [];
let openCards = 0;

/*
 * Create a list that holds all of your cards
 */
for (let i = 0; i < 16; i++) {
    let card = document.createElement("li");
    card.classList.add("card");
    deck.appendChild(card);
    cards.push(card);

    let icon = document.createElement("i");
    icon.classList.add("fa");
    card.appendChild(icon);
}

cards[0].firstChild.classList.add("fa-diamond");
cards[1].firstChild.classList.add("fa-paper-plane-o");
cards[2].firstChild.classList.add("fa-anchor");
cards[3].firstChild.classList.add("fa-bolt");
cards[4].firstChild.classList.add("fa-cube");
cards[5].firstChild.classList.add("fa-anchor");
cards[6].firstChild.classList.add("fa-leaf");
cards[7].firstChild.classList.add("fa-bicycle");
cards[8].firstChild.classList.add("fa-diamond");
cards[9].firstChild.classList.add("fa-bomb");
cards[10].firstChild.classList.add("fa-leaf");
cards[11].firstChild.classList.add("fa-bomb");
cards[12].firstChild.classList.add("fa-bolt");
cards[13].firstChild.classList.add("fa-bicycle");
cards[14].firstChild.classList.add("fa-paper-plane-o");
cards[15].firstChild.classList.add("fa-cube");

let firstChild = scorePanel.firstChild;
const scoreDiv = document.createElement("div");
scoreDiv.textContent = "Score:  ";
scoreDiv.setAttribute("class", "score-number");
scorePanel.insertBefore(scoreDiv, firstChild);

const scoreSpan = document.createElement("span");
scoreDiv.appendChild(scoreSpan);
let scoreValue = scoreSpan.value;
scoreValue = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//Shuffling when the page is loaded
const shuffleCards = shuffle(cards);
shuffleCards.forEach(card => {
    deck.appendChild(card);
})

restartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    //Shuffling every time we click 
    const shuffleButton = shuffle(cards);
    shuffleButton.forEach(card => {
        deck.appendChild(card);
        card.classList.remove("show");
        card.classList.remove("match");
        card.classList.remove("open");
    })
    scoreValue = 0;
    scoreSpan.textContent = scoreValue;

    openCards = 0;
})

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function matchCard(card) {
    card.classList.remove("open");
    card.classList.remove("show");
    card.classList.add("match");
}

function closeCard(card) {
    card.classList.remove("open");
    card.classList.remove("show");
    card.classList.remove("match");
}

function checkForMatch() {
    if (listOpenCards.length === 2) {
        const iconOne = listOpenCards[0].firstChild;
        const iconTwo = listOpenCards[1].firstChild;
        //console.log(iconOne.classList.value, iconTwo.classList.value)
        if (iconOne.classList.value === iconTwo.classList.value) {
            matchCard(iconOne.parentElement);
            matchCard(iconTwo.parentElement);
            openCards += 2;
            if (openCards === 16) {
                setTimeout(() => {
                    alert("You Won !")
                }, 500);
            }
        } else {
            setTimeout(() => {
                closeCard(iconOne.parentElement);
                closeCard(iconTwo.parentElement);
            }, 500);
        }
        listOpenCards = [];
    }
}

cards.forEach((card) => {
    card.addEventListener("click", (e) => {
        e.preventDefault();
        if (!card.classList.contains("open") && listOpenCards.length < 2) {
            card.classList.add("open");
            card.classList.add("show");
            listOpenCards.push(card);
            checkForMatch();
        }
        //Add score Number 
        scoreValue += 1;
        scoreSpan.textContent = scoreValue;
    })
})



