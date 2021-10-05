const yargs = require('yargs')
var uniqid = require('uniqid'); 

const student = require('./modules/student')
yargs.command({
    command: "getAllStudents",
    handler: function(){
        console.log(student.getAll())
    }
})

yargs.command({
    command:"addStudent",
    builder:{
        id:{
            type:"number",
            default: uniqid()
        },
        name:{
            type:"string",
            demandOption:true
        },
        age:{
            type: "number",
            demandOption:true
        },
        grade:{
            type:"number",
            default:0
        },
        email:{
            type:"string",
            demandOption:true
        } 
    },
    handler:function(argv){
        let st = {
            id: argv.id,
            name: argv.name,
            age:argv.age,
            grade:argv.grade,
            email:argv.email
        }
        student.addStudent(st)
    }
})

yargs.command({
    command:"findStudent",
    builder:{
        id:{
            type:"string",
            demandOption:true
        }
    },
    handler: function(argv){
        student.findStudent(argv.id)
    }
})

yargs.command({
    command:"deleteStudent",
    builder:{
        id:{
            type:"string",
            demandOption:true
        }
    },
    handler: function(argv){
        student.deleteStudent(argv.id)
    }
})

yargs.command({
    command:"updateStudent",
    builder:{
        id:{
            type:"string",
            demandOption:true
        },
        name:{
            type:"string",
        },
        age:{
            type: "number",
        },
        grade:{
            type:"number",
        },
        email:{
            type:"string",
        } 
    },
    handler: function(argv){
        let st = {
            id: argv.id,
        }
        if(argv.name) st.name = argv.name
        if(argv.age) st.age = argv.age
        if(argv.grade) st.grade = argv.grade
        if(argv.email) st.email = argv.email
        student.updateStudent(argv.id, st)
    }
})

yargs.argv