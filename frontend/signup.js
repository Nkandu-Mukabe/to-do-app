const form = document.getElementById("signup-form")
form.addEventListener("submit", (e) =>{
    e.preventDefault()
    const email = document.getElementById("email-input").value
    const password = document.getElementById("password-input").value
    
    if(email=='' || password==''){
        alert("Please fill out both fields")
    }
    else{
        const body = {
            username : email,
            password : password
        }

        fetch('http://localhost:3000/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {
            if(data == '-1'){
                alert("Looks like this account already exists, try logging in")
            }
            else{
            console.log(data)
            localStorage.setItem("user", data)
            window.location.replace("index.html")
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
})



