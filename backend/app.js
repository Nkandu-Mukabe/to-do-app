const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
const port = 3000

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ifiweregr33N',
    database: 'todos'
})

connection.connect()
connection.query("CREATE TABLE IF NOT EXISTS Users (userID INT NOT NULL AUTO_INCREMENT, username VARCHAR(255) UNIQUE, password VARCHAR(255), PRIMARY KEY(userID));")
connection.query("CREATE TABLE IF NOT EXISTS to_do_list (id INT NOT NULL AUTO_INCREMENT, title VARCHAR(255), userID INT, PRIMARY KEY(id), FOREIGN KEY(userID) REFERENCES Users(userID));")


app.post('/signUp', (req, res) =>{
    let username = req.body.username
    let password = req.body.password
    connection.query("INSERT INTO Users (username, password) VALUES (?, ?);", [username, password], function (error, results, fields){
        if (error) throw error;
        console.log(results)
        res.json(results.insertId)
    })
})

app.post('/logIn', (req, res) =>{
    let username = req.body.username
    let password = req.body.password
    connection.query("SELECT * FROM Users WHERE username = ? AND password = ?;", [username, password], function (error, results, fields){
        if (error) throw error;
        if (results.length == 0){
            res.json('-1')
        }
        else{
            res.json(results[0].userID)
        }
    })
})

app.get('/todos', (req,res) => {
    let userID = req.query.userID
    connection.query("SELECT * FROM to_do_list WHERE userID = ?;", [userID], function (error, results, fields){
        if (error) throw error;
        res.send(results)
    })
})

app.post('/todos', (req, res) =>{
    let title = req.body.title
    let userID = req.body.userID
    connection.query("INSERT INTO to_do_list (title, userID) VALUES (?, ?);", [title, userID], function (error, results, fields){
        if (error) throw error;
    })
    res.send("Created successfully")
})

app.put('/todos', (req, res) =>{
    let modif_title = req.body.title
    let userID = req.body.userID
    let id = req.body.id
    connection.query("UPDATE to_do_list SET title = ? WHERE id = ? AND userID = ?;", [modif_title, id, userID], function (error, results, fields){
        if (error) throw error;
        console.log(results)
        res.json("Edited successfully")
    })
})

app.delete('/todos', (req, res) => {
    let id = req.query.id
    connection.query("DELETE FROM to_do_list WHERE id = ?;", [id], function (error, results, fields){
        if (error) throw error;
        if (results.affectedRows > 0) {
            res.json("Deleted successfully")
        }
        else {
            res.json("The table is empty")
        } 
        
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})