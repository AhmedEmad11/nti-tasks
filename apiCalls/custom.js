let url = 'https://jsonplaceholder.typicode.com/posts'

let apiCall = async (url, method, body="",  
    headers={'Content-type': 'application/json; charset=UTF-8',}, 
    cb) => {
    try {
        let data
        if(method=="GET" || method == "DELETE")
        {
            let data = await ( await fetch(url, {method,})).json()
            cb(data, null)
        } else {
            let data = await ( await fetch(url, {method, body, headers})).json()
            cb(data, null)
        }
    } catch (e) {
        cb(null, e)
    }
}

let body = document.querySelector('body')

let createElement = (data)=>{
    let li = document.createElement('li')
    li.textContent = data
    body.appendChild(li)
}

let getBtn = document.querySelector("#getBtn")
getBtn.addEventListener('click', function(){
    apiCall(url, "GET", "", "", (res, err)=>{
        if(err) {
            console.log(err)
            return err
        }        
        res.forEach((element, i) => {
            console.log(element.title)
            createElement(element.title)
        });
          
    })
})

let postBtn = document.querySelector("#postBtn")
postBtn.addEventListener('click', function(){
    apiCall(url, "POST", JSON.stringify({title: 'foo', body: 'bar', userId:1,}), {'Content-type': 'application/json; charset=UTF-8',}, (res, err)=>{
        if(err) {
            console.log(err)
            return err
        }
        console.log(res.title)
        createElement(res.title)
    })
})

let putBtn = document.querySelector("#putBtn")
putBtn.addEventListener('click', function(){
    apiCall(url+"/1", "PUT", JSON.stringify({title: 'foo', body: 'bar', userId:1,}), {'Content-type': 'application/json; charset=UTF-8',}, (res, err)=>{
        if(err) {
            console.log(err)
            return err
        }
        console.log(res.title)
        createElement(res.title)      
    })
})

let deleteBtn = document.querySelector("#deleteBtn")
deleteBtn.addEventListener('click', function(){
    apiCall(url+"/1", "DELETE", "", "", (res, err)=>{
        if(err) {
            console.log(err)
            return err
        }
        console.log("deleted")
        console.log(res)
    })
})