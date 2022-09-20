const mainScreen = document.getElementById('main-screen')
const topLine = document.getElementById('top-line')
const numberBtns = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'zero': 0,
    'equals': '=',
    'divide': '/',
    'multiply': '*',
    'add': '+',
    'subtract': '-',
}
const MAX_LEN = 9;
const mathToDo = [NaN, "", 0]
let resetMainScreen = false;

const operate = ([numOne, operator, numTwo]) => {
    console.log(`${numOne} ${operator} ${numTwo}`)
    const numA = parseFloat(numOne)
    const numB = parseFloat(numTwo)
    switch (operator) {
        case "+":
            return numA + numB
        case "-":
            return numA - numB
        case "*":
            return numA * numB
        case "/":
            if (numB === 0) {
                throw new Error("Cannot divide by zero.")
            } else {
                return numA / numB
            }
    }
}

const getInput = (e) => {
    const priorVal = mainScreen.value
    const currLen = priorVal.length
    if (currLen === MAX_LEN && e.key !== "Backspace") {
        return
    } else if (parseInt(e.key) >= 0 && parseInt(e.key) <= 9) {
        console.log(`Number: ${e.key}`)
        if (resetMainScreen) {
            mainScreen.value = ""
            resetMainScreen = false;
        }
        if (priorVal === "0") {
            mainScreen.value = e.key
            return e.key
        } else {
            mainScreen.value += e.key
            return e.key
        }
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        if (resetMainScreen) {
            mathToDo[1] = e.key
            topLine.value = `${mathToDo[0]} ${mathToDo[1]}`
        } else {
            if (!mathToDo[0]) {
                getLeftAndOperator(e)
            } else {
                console.log('doing the math')
                doTheMath()
                console.log('setting 0 equal to ' + mainScreen.value)
                mathToDo[0] = mainScreen.value
                console.log('getting the left and operator')
                getLeftAndOperator(e)
            }
        }
    } else if (e.key === '=') {
        doTheMath()
    } else if (e.key === "Backspace") {
        if (priorVal.length === 1) {
            mainScreen.value = 0
        } else {
            mainScreen.value = priorVal.slice(0, -1)
        }
    } else {
        return
    }
}

const getLeftAndOperator = ({ key }) => {
    mathToDo[0] = mainScreen.value
    mathToDo[1] = key
    topLine.value = `${mathToDo[0]} ${mathToDo[1]}`
    resetMainScreen = true
}

const doTheMath = () => {
    if (!mathToDo[2]) {
        mathToDo[2] = mainScreen.value
        topLine.value = `${mathToDo[0]} ${mathToDo[1]} ${mathToDo[2]} =`
        mainScreen.value = operate(mathToDo)
        resetMainScreen = true
        mathToDo[2] = 0
    }
}

const simulateKeyPress = (num) => {
    document.dispatchEvent(new KeyboardEvent('keyup', { 'key': num }))
}


const grabMainLineNumber = () => {
    return mainScreen.value
}

document.addEventListener('keyup', (e) => getInput(e))
for (let btn in numberBtns) {
    document.getElementById(btn).addEventListener('click', () => simulateKeyPress(numberBtns[btn]))
}

