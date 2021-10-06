const fs = require('fs')
const { number } = require('yargs')

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
const writeData = (allCustomers)=>{
    fs.writeFileSync('data.json', JSON.stringify(allCustomers))
}

class customer{
    static getAll(){
        return readData()
    }
    static addCustomer(customerData){
        let all= readData()
        all.push(customerData)
        writeData(all)
    }
    static findCustomer(customerId){
        let all = readData()
        let single = all.find(customer=> customer.id == customerId)
        if(!single) return console.log('customer not found')
        console.log(single)
    }

    static deleteCustomer(customerId){
        let all = readData()
        let newList = all.filter(customer=> customer.id != customerId)
        console.log(customerId)
        console.log(newList)
        if(newList.length < all.length) {
            writeData(newList)
        }
        else console.log("customer not found")
    }

    static addBalance(customerId, balanceToAdd){
        let all = readData()
        let singleIndex = all.findIndex(customer=> customer.id == customerId)
        if (singleIndex == -1) {
            return console.log('customer not found')
        }
        let currentBalance = Number(all[singleIndex].balance)
        if(Number(balanceToAdd) > 10000) return console.log("can't add more than 10000")
        currentBalance += Number(balanceToAdd)
        all[singleIndex].balance= currentBalance.toString()
        writeData(all)
    }

    static withdraw(customerId, balanceToWithdraw){
        let all = readData()
        let singleIndex = all.findIndex(customer=> customer.id == customerId)
        if (singleIndex == -1) {
            return console.log('customer not found')
        }
        let currentBalance = Number(all[singleIndex].balance)
        if(Number(balanceToWithdraw) > all[singleIndex].balance) return console.log(`withdraw more than the current balance which is ${all[singleIndex].balance}`)
        currentBalance -= Number(balanceToWithdraw)
        all[singleIndex].balance= currentBalance.toString()
        writeData(all)
    }
    
}

module.exports = customer