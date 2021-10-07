const http = require('http')
const express = require('express')
const path = require('path')
const hbs = require('hbs')

const staticFilesDir = path.join(__dirname, "../public")
const layouts = path.join(__dirname, "../layouts")


const app = express()
app.set('view engine', 'hbs')

app.use(express.static(staticFilesDir))
hbs.registerPartials(layouts)

// home route
app.get("", (req, res)=>{
    res.render('home', {
        pageTitle: "Home Page"
    })
})

// table route
app.get("/table", (req, res)=>{
    let data = []
    let url = "http://tasks-crud-api.herokuapp.com/task-list/"
    const request = http.request(url, (response)=>{
        let result = "" 
        response.on('data', (dataPart)=>{
            result += dataPart.toString()
        })
        
        response.on('end', ()=>{
            
            data = JSON.parse(result)
            res.render('table', {
                pageTitle:"Table Page",
                data:data,
            })
        })
    })
    request.end()
})

// 404 route
app.get("*", (req, res)=>{
    res.render('error404', {
        pageTitle:"error 404 Page"
    })
})

app.listen(3000, ()=>{
    console.log('http://localhost:3000')
})