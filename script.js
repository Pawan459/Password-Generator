const characterAmountRange = document.getElementById('characterAmountRange')
const characterAmountNumber = document.getElementById('characterAmountNumber')
const includeUppercaseElement = document.getElementById('includeUppercase')
const includeNumbersElement = document.getElementById('includeNumbers')
const includeSymbolsElement = document.getElementById('includeSymbols')
const form = document.getElementById('passwordGeneratorForm')
const passwordDisplay = document.getElementById('passwordDisplay')

// It Generates An Array of the from the low index to high index inclusive
// Purpose to Store ASCII Values Of Character
arrayGenerator = (low, high) => {
    const array = []
    for (let i = low; i <= high; i++) {
        array.push(i)
    }
    return array
}

const UPPERCASE_CHAR_CODES = arrayGenerator(65, 90) // Uppercase Characters ASCII Values
const LOWERCASE_CHAR_CODES = arrayGenerator(97, 122) // Lowercase Character ASCII vaues
const NUMBERS_CHAR_CODES = arrayGenerator(48, 57)   // Numbers as a Character ASCII values
const SYMBOLS_CHAR_CODES = arrayGenerator(33, 47).concat(
    arrayGenerator(58, 64)).concat(
        arrayGenerator(91, 96)).concat(
            arrayGenerator(123, 126)
        ) // Symbols ASCII values as symbols are distributes in the ASCII table


// Function To Sync the slider and the number input Together
syncCharacterAmount = (e)=>{
    const value = e.target.value
    characterAmountNumber.value = value
    characterAmountRange.value = value
}

// Function To Generate Password on Basis Of Checked Constraints
generatePassword = (characterAmount, includeUppercase, includeNumbers, includeSymbols) =>{
    let charCodes = LOWERCASE_CHAR_CODES
    if(includeUppercase) charCodes =  charCodes.concat(UPPERCASE_CHAR_CODES)
    if(includeNumbers) charCodes = charCodes.concat(NUMBERS_CHAR_CODES)
    if(includeSymbols) charCodes = charCodes.concat(SYMBOLS_CHAR_CODES)

    const requriedPassword = []
    for(let i = 0;i < characterAmount; i++){
        // Retrieving random Characters from the available Character Codes
        // Random Function in javascript return values between 0 and 1
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
        requriedPassword.push(String.fromCharCode(characterCode))
    }

    return requriedPassword.join('')
}


form.addEventListener('submit',e=>{
    const characterAmount = characterAmountNumber.value
    const includeUppercase = includeUppercaseElement.checked
    const includeNumbers = includeNumbersElement.checked
    const includeSymbols = includeSymbolsElement.checked
    // Restricting Page From Reloading
    e.preventDefault()
    const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols)
    passwordDisplay.innerText = password
})


// Syncing and mapping the slider and number input through the same function
characterAmountNumber.addEventListener('input', syncCharacterAmount)

characterAmountRange.addEventListener('input', syncCharacterAmount)