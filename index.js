const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve)
  })
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

start()

async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n")
  console.log('You entered: ' + secretNumber)

  let max = 100
  let min = 1
  let guessedCorrectly = false;
  for (let i = 1; i <= 10; i++) {
    const guess = getRandomInt(min, max)
    console.log(`Is your number ${guess}?`)
    let response1 = await ask("Is this your number? 'y' if it is 'n' if it is not. ")
    response1 === parseInt(response1)
    if (response1 == 'y'){
      console.log('Haha! that wasnt so hard! I geussed your number!')
      guessedCorrectly = true
      break}
    else if (response1 === 'n') {
      let response2 = await ask("Enter 'h' if my guess is too high, 'l' if it's too low. ")
      response2 === parseInt(response2)

      if (response2 === 'h') {
        max = guess - 1
        console.log(`Hmm, not quite. Is your number between ${min} and ${max}?`)
      } else if (response2 === 'l') {
        min = guess + 1
        console.log(`Almost there! Is your number between ${min} and ${max}?`)
      } else {
        console.log(`Invalid response, try again.`)
        i--; // decrement i to repeat the current iteration
      }
    }
  }

  if (guessedCorrectly) {
    process.exit()
  } else {
    console.log(`I'm sorry, I couldn't guess your secret number in 10 guesses. :c`);
    process.exit()
  }
}