const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('Hello Express!')
})

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!')
    console.log('This is Georgia')
})

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers!')
})

app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza is on the way!')
})

app.get('/pizza/pineapple', (req, res) => {
    res.send('We don\'t serve that here.  Never call again!')
})

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
      HTTP Method: ${req.method}
      Host: ${req.hostname}
      Path: ${req.path}
    `;
    res.send(responseText);
});

app.get('/queryviewer', (req, res) => {
      console.log(req.query)
      res.end()
})

app.get('/greetings', (req, res) => {
    const name = req.query.name
    const race = req.query.race

    if (!name) {
        res.status(400).send('Please provide a name.')
    }

    if (!race) {
        res.status(400).send('Please provide a damn name.')
    }

    const greeting = `Greetings ${name} the ${race}.  Welcome to our kingdom.`

    res.send(greeting)
})

// Drill 1
app.get('/sum', (req, res) => {
    const a = req.query.a
    const b = req.query.b

    if (!a) {
        res.status(400).send('Please provide an \'a\' value.')
    }

    if (!b) {
        res.status(400).send('Please provide a \'b\' value.')
    }

    const c = Number(a) + Number(b)

    const equation = `The sum of ${a} and ${b} is ${c}`

    res.status(400).send(equation)
})

app.get('/lotto', (req, res) => {
    const arr = req.query.arr

    if (!arr) {
        res.status(400).send(`You don't have any arr values.
          Please provide six array values between 1 and 20.
          Here's an example: /lotto?arr=5&arr=7&arr=1&arr=11&arr=20&arr=2`)
    }

    if (arr.length !== 6) {
        res.status(400).send(`You don't have six arr values.
          Please provide six array values between 1 and 20.
          Here's an example: /lotto?arr=5&arr=7&arr=1&arr=11&arr=20&arr=2`)
    }

    for (i = 0; i < arr.length; i++) {
        if (arr[i] > 20) {
            res.status(400).send(`One or more of your values is greater than 20.
            Please provide six unique array values between 1 and 20.
            Here's an example: /lotto?arr=5&arr=7&arr=1&arr=11&arr=20&arr=2`)
        }
    }

    let filteredArr = arr => 
        arr.filter((num, i) => 
            arr.indexOf(num) === i)

    if (filteredArr(arr).length < 6) {
        res.status(400).send(`One or more of the values in your array repeats.
        Please provide six unique array values between 1 and 20.
        Here is an example: /lotto?arr=5&arr=7&arr=1&arr=11&arr=20&arr=2`)
    }

    randomArray = Array.from({length: 6}, () => Math.floor(Math.random() * 20));

    console.log('randomArray', randomArray)

    function winningNumbers(array1, array2) {
        let newArray = []
        for (i = 0; i < 6; i++) {
            
            if (array1[i] === array2[0]) {
                newArray.push(array1[i])
            }

            if (array1[i] === array2[1]) {
                newArray.push(array1[i])
            }

            if (array1[i] === array2[2]) {
                newArray.push(array1[i])
            }

            if (array1[i] === array2[3]) {
                newArray.push(array1[i])
            }

            if (array1[i] === array2[4]) {
                newArray.push(array1[i])
            }

            if (array1[i] === array2[5]) {
                newArray.push(array1[i])
            }
        }

        return newArray
    }

    arrayOfWinningNums = winningNumbers(arr, randomArray)

    res.send(`Hi, your array is: ${arrayOfWinningNums}`)
})



// Drill 2
  app.get('/cipher', (req, res) => {
    const text = req.query.text
    const shift = req.query.shift

    if (!text) {
        res.status(400).send('Please provide a text value.')
    }

    if (!shift) {
        res.status(400).send('Please provide a shift value.')
    }

    const numShift = parseFloat(shift);

    console.log('numShift', numShift)

    if(Number.isNaN(numShift)) {
        return res
            .status(400)
            .send('shift must be a number');
    }

    let arrayText = text.split('')

    let lap = arrayText.map(letter => letter.charCodeAt('0'))

    function shiftedMap(charCodeArray, shiftValue) {
        charCodeArray.map(charCode => {
            console.log('charCode', charCode)
            console.log('shiftValue', shiftValue)
            let sum = charCode + shiftValue
            return sum
        })
    }

    const sap = shiftedMap(lap, shift)


    const encrypted = `The encrypted form of ${text} is ${sap}`

    res.send(encrypted)
  })