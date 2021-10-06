const yargs = require('yargs')
var uniqid = require('uniqid'); 

const customer = require('./modules/customer')
yargs.command({
    command: "getAllCustomers",
    handler: function(){
        console.log(customer.getAll())
    }
})

yargs.command({
    command:"addCustomer",
    builder:{
        id:{
            type:"string",
            default: uniqid()
        },
        name:{
            type:"string",
            demandOption:true
        },
        balance:{
            type:"number",
            demandOption:true
        } 
    },
    handler:function(argv){
        let newCustomer = {
            id: argv.id,
            name: argv.name,
            balance: argv.balance
        }
        customer.addCustomer(newCustomer)
    }
})

yargs.command({
    command:"findCustomer",
    builder:{
        id:{
            type:"string",
            demandOption:true
        }
    },
    handler: function(argv){
        customer.findCustomer(argv.id)
    }
})

yargs.command({
    command:"deleteCustomer",
    builder:{
        id:{
            type:"string",
            demandOption:true
        }
    },
    handler: function(argv){
        customer.deleteCustomer(argv.id)
    }
})

yargs.command({
    command:"addBalance",
    builder:{
        id:{
            type:"string",
            demandOption:true
        },
        balanceToAdd:{
            type:"string",
        } 
    },
    handler: function(argv){
        customer.addBalance(argv.id, argv.balanceToAdd)
    }
})

yargs.command({
    command:"withdraw",
    builder:{
        id:{
            type:"string",
            demandOption:true
        },
        balanceToWithdraw:{
            type:"string",
        } 
    },
    handler: function(argv){
        customer.withdraw(argv.id, argv.balanceToWithdraw)
    }
})

yargs.argv