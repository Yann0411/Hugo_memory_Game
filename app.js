const cards = [
    'https://picsum.photos/id/237/100/100',
    'https://picsum.photos/id/238/100/100',
    'https://picsum.photos/id/239/100/100',
    'https://picsum.photos/id/240/100/100',
    'https://picsum.photos/id/241/100/100',
    'https://picsum.photos/id/242/100/100',
    'https://picsum.photos/id/243/100/100',
    'https://picsum.photos/id/244/100/100'
];

const appBoard = document.getElementById('appBoard')
const compteurElm = document.querySelector('.compteur')
const winElm = document.querySelector('.win')


function createCard(CardUrl) {


    const divImg = document.createElement('div')
    divImg.classList.add('img')
    divImg.dataset.value = CardUrl


    const img = document.createElement('img')
    img.classList.add('card-content')
    img.src = CardUrl
    img.alt = "image"

    divImg.appendChild(img)
    divImg.addEventListener('click', handleClick)


    return divImg

}

let allcardsArray = []


function shuffleArray(arrayToshuffle) {
    const arrayShuffled = arrayToshuffle.sort(() => 0.5 - Math.random());
    return arrayShuffled;
}

function duplicatedArray(originArray) {
    allcardsArray.push(...originArray)
    allcardsArray.push(...originArray)
    return allcardsArray

}

let allcard = duplicatedArray(cards)


allcard = shuffleArray(allcard)

allcard.forEach((card) => {
    htmlCard = createCard(card)
    appBoard.appendChild(htmlCard)

})
let compteur = 0
let matchedCard = []

function handleClick(e) {
    const divElm = e.target.parentElement
    divElm.classList.add('flip')
 
    matchedCard.push(divElm)
   setTimeout(() => {
    if (matchedCard.length == 2) {
        console.log(matchedCard[0])
        console.log( matchedCard[1] )
        if (matchedCard[0].dataset.value == matchedCard[1].dataset.value ) {
            compteur++
            compteurElm.textContent = compteur
            let attempt = "tentative"
            if (compteur > 1) {
                attempt = 'tentatives'
            }
           

            matchedCard[0].classList.add("matched");
            matchedCard[1].classList.add("matched");
            matchedCard[0].removeEventListener('click', handleClick);
            matchedCard[1].removeEventListener('click', handleClick);
            const notMached = document.querySelectorAll('.img:not(.matched)')
            if(notMached.length == 0){
                winElm.textContent = `Tu as gagné avec ${compteur} ${attempt}`
            }
           
        }
        else {
            compteur++
            compteurElm.textContent = `${compteur}`
            matchedCard[0].classList.remove("flip");
            matchedCard[1].classList.remove("flip");
        }
        matchedCard = []
        console.log(compteur)
    }
    
   }, 1000);
  
}

