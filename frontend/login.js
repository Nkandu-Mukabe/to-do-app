const form = document.getElementById("login-form")

form.addEventListener("submit", (e) =>{
    e.preventDefault()
    const email = document.getElementById("email-input").value
    const password = document.getElementById("password-input").value
    const body = {
        username : email,
        password : password
    }

    fetch('http://localhost:3000/logIn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        localStorage.setItem("user", data)
        window.location.replace("index.html")
    })
    .catch(error => {
        console.log(error)
        //other error handling
    })
})



