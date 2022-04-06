// stops program working
//  const { setState } = require("jest-circus") 

// const { option, showCompletionScript } = require("yargs")

// const { options } = require("yargs")

// assign text and options-buttons to variables
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

//keep track of character items
let state = {}

//start the game
function startGame() {
    state = {}
    //show first text node
        showTextNode(1)
    
}

//display the option you are on
function showTextNode(textNodeIndex) {
    //get text nodes, take in a text node for each one in the array
    //find the one that has the current id
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    //show the text
    textElement.innerText = textNode.text
    console.log(textElement.innerText)
    // remove the options
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    // display buttons
    textNode.options.forEach(option => {
        if (showOption(option)) {
        const button = document.createElement('button')
        button.innerText = option.text
        button.classList.add('btn')
        button.addEventListener('click', () => selectOption(option))
        optionButtonsElement.appendChild(button)

        }
    })
}

function showOption(option) {
    //check for required state object.
    //if return is true or null then show the option
    return option.requiredState == null || option.requiredState(state)
    
}


//take the selected option
function selectOption(option) {
    //get next node
    const nextTextNodeId = option.nextText
    //get state,  add everything from option.setState to it, override anything already there.
    // if next text is 0 or less then go back to start Id
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    //show text node for next text node id
    showTextNode(nextTextNodeId)
} 

//define text nodes
const textNodes = [
    {
        id: 1,
        text: 'you wake up hungry in a strange place, you see a animal',
        //list options
        options: [
            {
                text: 'harvest animal',
                setState: {freshMeat: true},
                nextText: 2
            },
            {
                text: 'leave animal alone',
                nextText: 2
            }

        ]
    },
    {
        id: 2, 
        text: "you come upon a fire place where you can cook",
        //options for part 2
        options: [
            {
                text: 'cook the meat',
                requiredState: (currentState) => currentState.freshMeat,
                setState: { fed: true},
                nextText: 3
            },
            {
                text: 'keep moving',
                nextText: 3
            }

        ]
    },
    {
        id: 3, 
        text: "you come upon a bear, it looks hungry",
        //options for part 2
        options: [
            {
                text: 'run',
                requiredState: (currentState) => currentState.fed,
                nextText: 4
            },
            {
                text: 'accept your bad luck',
                nextText: -1
            }

        ]
    },
    {
        id: 4, 
        text: "you had the energy to escape, it's kill or be killed",
        //options for part 2
        options: [
            //restart game (-1), selectOption
            {
                text: 'restart',
                nextText: -1
            },

        ]
    }

]


startGame()


// module.exports = showTextNode;