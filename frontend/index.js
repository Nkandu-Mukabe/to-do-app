const form = document.querySelector('#new-task-form')
const userID = localStorage.getItem("user")
const list_el = document.querySelector('#tasks')
const input_el = document.getElementById('new-task-input')
    
    
window.addEventListener('load', () =>{
    console.log(form)
})

//code to add a task to the list
form.addEventListener("submit", (e) =>{
    e.preventDefault()
    const input = document.getElementById('new-task-input').value
    
    if(input == ''){
        alert("Please enter a task")
    }
    else
    {
        const body = {
            title : input,
            userID: userID
        }

        const task_el = document.createElement("div")
        task_el.classList.add("task")

        const task_content_el = document.createElement("div")
        task_content_el.classList.add("content")
        task_content_el.innerText = input
        
        task_el.appendChild(task_content_el)
        list_el.appendChild(task_el)


        fetch('http://localhost:3000/todos', {
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
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
            input_el.value = ""
            clearlist()
            displayList()
        })
    }
})

//clears tasks before display
function clearlist() {
    const taskDiv = document.getElementById("tasks")
    while (taskDiv.hasChildNodes()) {
        taskDiv.removeChild(taskDiv.firstChild)
    }
}

function deleteItem(id) {
    fetch(`http://localhost:3000/todos?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    })
    .then(response => response.json())
    .catch(error => {
        console.log(error)
    })
    .finally(() => {
        console.log("Deleted successfully")
        alert("Deleted!")
        clearlist()
        displayList()
        
    })
}

//code to edit an existing task
function editItem(id){
    let editMessage = document.getElementById(String(id)).value
    console.log(editMessage)
    const body = {
        title:editMessage,
        userID:userID,
        id:id
    }
    
    fetch('http://localhost:3000/todos', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.log(error)
    })
    .finally(() => {
        input_el.value = ""
        alert("Saved successfully!")
        clearlist()
        displayList()
    })
}

//code to fetch existing tasks
function displayList() {
    fetch(`http://localhost:3000/todos?userID=${userID}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const taskDiv = document.getElementById("tasks")
        
        data.forEach(element => {
            taskDiv.insertAdjacentHTML("beforeend", `
            <div class = "task">
                <div class="content">
                    <input
                        type="text"
                        class="text"
                        value="${element.title}"
                        id="${element.id}"
                        
                    />
                </div>
                <div class = "actions">
                    <button onclick="editItem(${element.id})" class="edit">Save</button>
                    <button onclick="deleteItem(${element.id})" class="delete">Delete</button>
                </div>
            </div>`
        )    
        });
        
    })
    .catch(error => {
        console.log(error)
    })
}

displayList()
