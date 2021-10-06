const fs = require('fs')
const yargs = require('yargs')
const Validation = require('./validation')
//read from file
const readData = ()=>{
    let data
    try {
        data = JSON.parse(fs.readFileSync('data.json'))
        if(!Array.isArray(data)) throw new Error("data is not array")
    } catch (e) {
         data = []
    }
    return data
}
//write to file
const writeData = (data)=>{
    try {
        fs.writeFileSync('data.json', JSON.stringify(data))    
    } catch (e) {
        console.log(e)
    }
    
}

//add user yarg
yargs.command({
    command:"addUser",
    builder:{
        user:{
            name:{
                type:"string",
                demandOption:true
            },
            job:{
                type:"string",
                demandOption:true
            },
            email:{
                type:"string",
                demandOption:true
            },
        }
    },
    handler: (argv)=>{
        let users = readData()

        let user = {}

        let usersCount = users.length
        if(usersCount > 0) user.id = Number(users[usersCount-1].id)+1
        else user.id = 1

        if(Validation.nameValidation(argv.name)) user.name = argv.name
        else return console.log("name is not valid")

        if(Validation.jobValidation(argv.job)) user.job = argv.job
        else return console.log("job is not valid")

        if(!Validation.isUnique(users, argv.email, "email"))return console.log("this email is already in use")
        if(Validation.emailValidation(argv.email, users)) user.email = argv.email
        else return console.log("email is not valid")

        user.tasks = []

        users.push(user)
        writeData(users)
    }
})

//add task to user yarg
yargs.command({
    command:"addTaskToUser",
    builder:{
        userId:{
            type:"string",
            demandOption:true
        },
        taskTitle:{
            type:"string",
            demandOption:true
        },
        taskDetails:{
            type:"string",
            demandOption:true
        }
    },
    handler: function(argv){
        let users = readData()
        let userIndex = users.findIndex(el=>el.id==argv.userId)
        if(userIndex==-1) return console.log("user not found")

        let task = {
            taskTitle:argv.taskTitle,
            taskDetails:argv.taskDetails,
            createdAt: new Date()
        }

        let tasks = users[userIndex].tasks
        let taskCount = tasks.length
        if(taskCount > 0) task.id = Number(users[userIndex].tasks[taskCount-1].id)+1
        else task.id = 1
        users[userIndex].tasks.push(task)
        writeData(users)
    }
})

// delete task from user yarg

yargs.command({
    command:"deleteTaskFromUser",
    builder:{
        userId:{
            type:"string",
            demandOption:true
        },
        taskId:{
            type:"string",
            demandOption:true
        }
    },
    handler: function(argv){
        let users = readData()
        let userIndex = users.findIndex(el=>el.id==argv.userId)
        if(userIndex==-1) return console.log("user not found")

        tasks = users[userIndex].tasks

        let taskIndex = tasks.findIndex(el=>el.id==argv.taskId)
        if(taskIndex==-1) return console.log("task not found")

        tasks.splice(taskIndex, 1)

        users[userIndex].tasks = tasks
        writeData(users)
    }
})

//search user

yargs.command({
    command:"searchUsers",
    builder:{
        userId:{
            type:"string",
            demandOption:true
        }
    },
    handler: function(argv){
        let users = readData()
        let userIndex = users.findIndex(el=>el.id==argv.userId)
        if(userIndex==-1) return console.log("user not found")
        console.log("user found")
        console.log(users[userIndex])
    }
})

//show all users

yargs.command({
    command:"showAllUsers",
    builder:{},
    handler: function(argv){
        let users = readData()
        if(users.length == 0) return console.log("no users")
        users.forEach(el =>{
            console.log(el.name)
        })
    }
})

//edit user

yargs.command({
    command:"editUser",
    builder:{
        userId:{
            type:"string",
            demandOption:true
        },
        name:{
            type:"string",
        },
        job:{
            type:"string",
        },
        email:{
            type:"string",
        },
    },
    handler: function(argv){
        let users = readData()
        let userIndex = users.findIndex(el=>el.id==argv.userId)
        if(userIndex==-1) return console.log("user not found")
        let user = users[userIndex]
        
        if(argv.name){
            if(Validation.nameValidation(argv.name)) user.name = argv.name
            else return console.log("name not valid")
        }

        if(argv.job){
            if(Validation.jobValidation(argv.job)) user.job = argv.job
            else return console.log("job not valid")
        }

        if(argv.email){
            if(Validation.emailValidation(argv.email) && Validation.isUnique(users, argv.email, "email")) user.email = argv.email
            else return console.log("email not valid")
        }

        users[userIndex] = user
        writeData(users)
    }
})

// delete user

yargs.command({
    command:"deleteUser",
    builder:{
        userId:{
            type:"string",
            demandOption:true
        }
    },
    handler: function(argv){
        let users = readData()
        let userIndex = users.findIndex(el=>el.id==argv.userId)
        if(userIndex==-1) return console.log("user not found")
    
        users.splice(userIndex,1)
        writeData(users)
    }
})

yargs.argv