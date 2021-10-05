const fs = require('fs')
const validator = require('validator')

const readData = () =>{
    let data
    try{
        data = JSON.parse(fs.readFileSync('data.json'))
        if(!Array.isArray(data)) throw new Error()
    }
    catch(e){
        data=[]
    }
    return data
}
const writeData = (allStudents)=>{
    fs.writeFileSync('data.json', JSON.stringify(allStudents))
}

class Student{
    static getAll(){
        return readData()
    }
    static addStudent(studentData){
       if(!validator.isEmail(studentData.email)) return console.log('invalid email')
        let all= readData()
        all.push(studentData)
        writeData(all)
    }
    static findStudent(studentId){
        let all = readData()
        let single = all.find(stu=> stu.id == studentId)
        if(!single) return console.log('student not found')
        console.log(single)
    }

    static deleteStudent(studentId){
        let all = readData()
        let newList = all.filter(element=> element.id == studentId)
        if(newList.length < all.length) {
            writeData(newList)
        }
        else console.log("not found")
    }

    static updateStudent(studentId, newStudent){
        let all = readData()
        let singleIndex = all.findIndex(stu=> stu.id == studentId)
        if (singleIndex == -1) {
            return console.log('student not found')
        }
        if(!validator.isEmail(newStudent.email)) return console.log('invalid email')
        if(newStudent.name) all[singleIndex].name = newStudent.name
        if(newStudent.age) all[singleIndex].age = newStudent.age
        if(newStudent.grade) all[singleIndex].grade = newStudent.grade
        if(newStudent.email) all[singleIndex].email = newStudent.email
        writeData(all)
    }
    
}

module.exports = Student