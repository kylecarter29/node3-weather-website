const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1') //target ID with #
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) =>{ // fetch API call
    response.json().then((data) => { // parse to Javascript
      if (data.error) {
        //   console.log (data.error) //handle error
          messageOne.textContent = data.error
        } else {
        //   console.log(data.location) //return data
        //   console.log(data.forecast)
          messageOne.textContent = data.location
          messageTwo.textContent = data.forecast
      }
    })
})
})