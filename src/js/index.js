// Variables
const header = document.getElementById('header')
const game = document.getElementById('game')
const startButtons = document.getElementById('start-buttons')
const results = document.getElementById('results')

const enemyElements = document.getElementById('enemy-elements')
let marginTopEnemyElements = -14725
const enemyElementsArray = ['fire', 'earth', 'water']
const numberKindsEnemyElements = enemyElementsArray.length
let numberEnemyElements = 199
let currentEnemyElement
let valueCurrentEnemyElement

const countdown = document.getElementById('countdown')

let gameActive = false
const playButton = document.getElementById('play-button')
const tutorialButton = document.getElementById('tutorial-button')

const backButton = document.getElementById('back-button')

const gameButtons = document.getElementById('game-buttons')
const fireButton = document.getElementById('fire-button')
const earthButton = document.getElementById('earth-button')
const waterButton = document.getElementById('water-button')

const timer = document.getElementById('timer')
const timerClock = document.getElementById('timer-clock')
let time = 64000
let showTime
let countdownInterval

let pulsationCounter = 0
let winCounter = 0
const numberPulsations = document.getElementById('number-pulsations')
const counteractedElements = document.getElementById('counteracted-elements')
const hitPercentage = document.getElementById('hit-percentage')

const returnButton = document.getElementById('return-button')

let tutorialActive = false

//Start game
playButton.addEventListener(
  'click',
  () => {
    setTimeout(() => {
      header.classList.add('transparent')
      startButtons.classList.add('transparent')
      game.classList.remove('hidden', 'transparent')

      setTimeout(() => {
        header.classList.add('hidden')
        startButtons.classList.add('hidden')
        gameButtons.classList.add('game-buttons--active')
        enemyElements.classList.add('enemy-elements--active-transition')
        timer.classList.remove('transparent')
        backButton.classList.remove('transparent')
      }, 400)

      setTimeout(() => {
        enemyElements.classList.remove('enemy-elements--active-transition')
        enemyElements.classList.add('enemy-elements--active')
      }, 900)

      if (!tutorialActive) countdownInterval = setInterval(countdownGame, 1000)
    }, 400)
  },
  false,
)

// Countdown game
const countdownGame = () => {
  time -= 1000
  showTime = time / 1000

  timerClock.textContent = `00:${showTime}`

  if (time > 59000) timerClock.textContent = '01:00'

  if (time === 60000) gameActive = true

  if (time <= 9000) timerClock.textContent = `00:0${showTime}`

  if (time === 0) {
    clearInterval(countdownInterval)
    gameActive = false
    gameResults()
  }
}

// Create new element
const createNewElement = () => {
  const randomEnemyElement = Math.floor(
    Math.random() * numberKindsEnemyElements,
  )
  const chosenEnemyElement = enemyElementsArray[randomEnemyElement]

  newEnemyElement = document.createElement('li')
  newEnemyElement.className += `element element--${chosenEnemyElement}`
  newEnemyElement.setAttribute('data-element', chosenEnemyElement)

  const newIconEnemyElement = document.createElement('span')
  newIconEnemyElement.className += `element__symbol element__symbol--${chosenEnemyElement}`

  enemyElements.prepend(newEnemyElement)
  newEnemyElement.appendChild(newIconEnemyElement)
}

// Assign ID to element
const assignIdElement = number => {
  enemyElement[number].id = 'current-enemy-element'
  currentEnemyElement = document.getElementById('current-enemy-element')
  valueCurrentEnemyElement = currentEnemyElement.getAttribute('data-element')
}

// Star enemy elements
const startEnemyElements = () => {
  for (let i = 0; i < 200; i++) {
    createNewElement()
  }
}
startEnemyElements()
let enemyElement = enemyElements.querySelectorAll('li')
assignIdElement(numberEnemyElements)

// Move elements
const moveElements = () => {
  marginTopEnemyElements += 75
  enemyElements.style.marginTop = `${marginTopEnemyElements}px`
}

// Choose element
const chooseElement = elementObject => {
  if (gameActive) {
    pulsationCounter++
    const chosenElement = elementObject.getAttribute('aria-label')

    console.log(chooseElement, valueCurrentEnemyElement)

    if (
      (chosenElement === 'fire' && valueCurrentEnemyElement === 'earth') ||
      (chosenElement === 'earth' && valueCurrentEnemyElement === 'water') ||
      (chosenElement === 'water' && valueCurrentEnemyElement === 'fire')
    ) {
      winCounter++

      // Remove the element
      currentEnemyElement.classList.remove('element--mistake')
      currentEnemyElement.classList.add('element--remove')
      currentEnemyElement.removeAttribute('id')
      numberEnemyElements--

      // Assign ID to element
      assignIdElement(numberEnemyElements)

      // Move elements
      moveElements()
    } else {
      // Animation mistake
      currentEnemyElement.classList.add('element--mistake')
      setTimeout(
        () => currentEnemyElement.classList.remove('element--mistake'),
        100,
      )
    }

    elementObject.classList.add('button--game-pressed')
    setTimeout(
      () => elementObject.classList.remove('button--game-pressed'),
      100,
    )
  }
}
fireButton.addEventListener('mousedown', () => chooseElement(fireButton), false)
earthButton.addEventListener(
  'mousedown',
  () => chooseElement(earthButton),
  false,
)
waterButton.addEventListener(
  'mousedown',
  () => chooseElement(waterButton),
  false,
)

// Tutorial
tutorialButton.addEventListener('click', () => {
  countdown.classList.add('hidden')
  timer.classList.add('timer--tutorial')
  enemyElements.classList.add('enemy-elements--tutorial')
  gameButtons.classList.add('game-buttons--tutorial')
  fireButton.classList.add('button--tutorial')
  earthButton.classList.add('button--tutorial')
  waterButton.classList.add('button--tutorial')

  tutorialActive = true

  const tutorialElements = `
	<li class="element element--water"><span class="element__symbol element__symbol--water"></span></li>
	<li class="element element--earth"><span class="element__symbol element__symbol--earth"></span></li>
	<li class="element element--fire"><span class="element__symbol element__symbol--fire"></span></li>
	<li class="element element--earth"><span class="element__symbol element__symbol--earth"></span></li>
	<li class="element element--water"><span class="element__symbol element__symbol--water"></span></li>`

  enemyElements.innerHTML = tutorialElements
  enemyElements.style.marginTop = '-100px'

  setTimeout(
    () => gameButtons.classList.add('game-buttons--tutorial-active'),
    800,
  )

  playButton.click()
})

// Game results
const gameResults = () => {
  game.classList.add('transparent')
  backButton.classList.add('transparent')
  timer.classList.add('transparent')
  enemyElements.classList.remove('enemy-elements--active')
  gameButtons.classList.remove('game-buttons--active')

  setTimeout(() => {
    numberPulsations.textContent = pulsationCounter
    counteractedElements.textContent = winCounter

    if (pulsationCounter > 0) {
      hitPercentage.textContent = `${(
        (winCounter * 100) /
        pulsationCounter
      ).toFixed(2)}%`
    } else {
      hitPercentage.textContent = '0.00%'
    }

    results.classList.remove('hidden', 'transparent')
  }, 400)
}

// Reset
const reset = () => {
  clearInterval(countdownInterval)
  gameActive = false

  game.classList.add('transparent', 'hidden')

  results.classList.add('transparent', 'hidden')

  header.classList.remove('hidden')
  startButtons.classList.remove('hidden')

  gameButtons.classList.remove(
    'game-buttons--active',
    'game-buttons--tutorial',
    'game-buttons--tutorial-active',
  )
  fireButton.classList.remove('button--tutorial')
  earthButton.classList.remove('button--tutorial')
  waterButton.classList.remove('button--tutorial')
  enemyElements.classList.remove(
    'enemy-elements--active',
    'enemy-elements--active-transition',
  )
  timer.classList.add('transparent')
  backButton.classList.add('transparent')

  enemyElements.innerHTML = ''
  enemyElements.style.marginTop = '-14725px'
  marginTopEnemyElements = -14725
  startEnemyElements()
  numberEnemyElements = 199
  enemyElement = enemyElements.querySelectorAll('li')
  assignIdElement(numberEnemyElements)

  time = 64000
  timerClock.textContent = '01:00'

  pulsationCounter = 0
  winCounter = 0

  countdown.classList.remove('hidden')
  timer.classList.remove('timer--tutorial')
  enemyElements.classList.remove('enemy-elements--tutorial')
  tutorialActive = false

  setTimeout(() => {
    header.classList.remove('transparent')
    startButtons.classList.remove('transparent')
  }, 150)
}
returnButton.addEventListener('click', reset)
backButton.addEventListener('click', reset)

// Correct Viewport height on Mobile
let vh = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', `${vh}px`)

// ServiceWorker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('https://juan-antonio-ledesma.github.io/counter-elements/sw.js')
      .then(
        registration => {
          // Registration was successful
          console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope,
          )
        },
        err => {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err)
        },
      )
  })
}
