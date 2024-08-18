const diffs = document.querySelectorAll('.difficulty div');

let playerOneScore = 0;
let playerTwoScore = 0;
let playerTurn = 1;
score = document.querySelector('.score');

cardZone = document.querySelector('.cardZone ul');
cards = `
        <li><div></div><div></div></li>
        <li><div></div><div></div></li>
        <li><div></div><div></div></li>
        <li><div></div><div></div></li>
`;

let flippedCard = []; // Initialize the counter

function checkMatch(arr) {
    const firstImage = arr[arr.length - 1].querySelector('div:nth-child(2)').style.backgroundImage;
    const secondImage = arr[arr.length - 2].querySelector('div:nth-child(2)').style.backgroundImage;

    return firstImage == secondImage;
}

function cardsClick() {
    cardsClicked = document.querySelectorAll('.cardZone ul li');

    cardsClicked.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.add("flipped");
            card.classList.add("no-click");
            flippedCard.push(card);
            cardZone.classList.add('no-click');
            setTimeout(() => {
                cardZone.classList.remove('no-click'); // Re-enable clicking visually
            }, 900);
            if (flippedCard.length % 2 == 0) {
                if (!checkMatch(flippedCard)) {
                    playingZone = document.querySelector('.playingZone');

                    setTimeout(() => {
                        flippedCard[flippedCard.length - 1].classList.remove("flipped");
                        flippedCard[flippedCard.length - 1].classList.remove("no-click");
                        flippedCard[flippedCard.length - 2].classList.remove("flipped");
                        flippedCard[flippedCard.length - 2].classList.remove("no-click");


                        if (playingZone.classList.contains("playingZonePTwo")) {
                            playingZone.classList.remove("playingZonePTwo");
                            playerTurn = 1;
                        }
                        else {
                            playingZone.classList.add("playingZonePTwo");
                            playerTurn = 2;
                        }
                    }, 1000)
                }
                else {
                    if (playerTurn == 1) {
                        let one = score.querySelector(':first-child')
                        playerOneScore++;
                        one.innerHTML = "player one score: " + String(playerOneScore);
                    }
                    else {
                        let two = score.querySelector(':last-child');
                        playerTwoScore++;
                        two.innerHTML = "player two score: " + String(playerTwoScore);
                    }
                }
                //specify the winner
                if ((playerOneScore + playerTwoScore) * 2 == numberOfCards) {
                    Win = document.querySelector('.winner');
                    who = Win.querySelector('span');
                    if (playerOneScore>playerTwoScore) {
                        who.innerHTML = "Player One WIN!!!"
                    }
                    else  if (playerOneScore < playerTwoScore) {
                        who.innerHTML = "Player Two WIN!!!"
                    }
                    else{
                        who.innerHTML = "No One Win!!!"
                    }
                    Win.classList.remove("winnerHide");

                }
            }
        });
    });

}
cardsClick();

let numberOfCards = 12;

for (let i = 0; i < diffs.length; i++) {
    diffs[i].addEventListener('click', () => {
        // Remove the 'difficultyClicked' class from all elements
        diffs.forEach(diff => {
            diff.classList.remove("difficultyClicked");
        });
        flippedCard = [];


        // Add the 'difficultyClicked' class to the clicked element
        diffs[i].classList.add("difficultyClicked");
        cardZone.innerHTML = '';
        let temp;
        if (i == 0) { // Easy
            temp = cards.repeat(3); // 12 cards
            numberOfCards = 12;
        } else if (i == 1) { // Medium
            temp = cards.repeat(4); // 16 cards
            numberOfCards = 16;
        } else { // Hard
            temp = cards.repeat(6); // 24 cards
            numberOfCards = 24;
        }
        // Insert the generated cards into the cardZone
        cardZone.innerHTML = temp;

        setCards();
        cardsClick();

        //start with player one when the difficulty is updated
        playingZone = document.querySelector('.playingZone');
        if (playingZone.classList.contains("playingZonePTwo")) {
            playingZone.classList.remove("playingZonePTwo");
        }

        //reset the score
        playerOneScore = 0;
        playerTwoScore = 0;
        let one = score.querySelector(':first-child')
        let two = score.querySelector(':last-child');
        one.innerHTML = "player one score: 0";
        two.innerHTML = "player two score: 0";


    });
}

function shuffle(array) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const j = Math.floor(Math.random() * (array.length));//generate random index
        array[i] = array[j];
        array[j] = element;
    }
    return array;
}

const imagePaths = [
    "url('pics/1.jpg')",
    "url('pics/2.jpg')",
    "url('pics/3.jpg')",
    "url('pics/4.jpg')",
    "url('pics/5.jpg')",
    "url('pics/6.jpg')",
    "url('pics/7.jpg')",
    "url('pics/8.jpg')",
    "url('pics/9.jpg')",
    "url('pics/10.jpg')"
];

let imageIndex = 0;
function setCards() {
    const listItems = Array.from(document.querySelectorAll('.cardZone ul li')); // Convert NodeList to Array
    shuffledList = shuffle(listItems);
    shuffledList.forEach((li, index) => {
        divs = li.querySelectorAll('div');
        if (divs.length > 1) {
            divs[1].style.backgroundImage = imagePaths[imageIndex];

            // Change the image every two <li> elements
            if ((index + 1) % 2 === 0) {
                imageIndex = Math.floor(Math.random() * (10));
            }
        }

    })
}

document.addEventListener('DOMContentLoaded', () => {
    setCards();
})

hideWinner = document.querySelector('.winner i');
hideWinner.addEventListener('click', () => {
    winner = document.querySelector('.winner');
    winner.classList.add('winnerHide');
})

