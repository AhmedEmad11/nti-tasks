const customer = document.querySelector('#customer')
const heads = [
    { inForm: "customerName", inView: "customer name" },
    { inForm: "customerBalance", inView: "customer balance" },
]
saveDataToStorage = (data) => {
    localStorage.setItem('customers', JSON.stringify(data))
}
getDataFromStorage = () => {
    let customers
    try {
        customers = JSON.parse(localStorage.getItem('customers'))
        if (!Array.isArray(customers)) throw new Error()
    }
    catch (e) {
        customers = []
    }
    return customers
}

getCurrentTime = () => {
    let date = new Date()
    let ms = date.getMilliseconds()
    return ms.toString()
}

const customers = getDataFromStorage()
addForm=document.querySelector('#addForm')
withdrawForm=document.querySelector('#withdrawForm')

if (customer) {
    customer.addEventListener('submit', function (e) {
        e.preventDefault()
        let customer = {}
        heads.forEach(h => {
            customer.id = getCurrentTime()
            customer[h.inForm] = this.elements[h.inForm].value
        })
        customers.push(customer)
        saveDataToStorage(customers)
        this.reset()
        window.location.replace('index.html')
    })

}
const createMyOwnElements = (element, parent, txt = "", classes = "", attributes = "") => {
    let el = document.createElement(element)
    parent.appendChild(el)
    if (txt != '') el.textContent = txt
    if (classes != "") el.classList = classes
    return el
}
const drawTable = (customers) => {
    table.textContent=""
    let thead = createMyOwnElements('thead', table)
    createMyOwnElements('th', thead, '#')
    heads.forEach(h => createMyOwnElements("th", thead, h.inView))
    createMyOwnElements('th', thead, 'actions')
    let tbody = createMyOwnElements('tbody', table)
    if (customers.length == 0) {
        let tr = createMyOwnElements('tr', tbody)
        let td = createMyOwnElements('td', tr, "no data")
        td.colSpan = "3"
    }
    else {
        customers.forEach((customer, i) => {
            let tr = createMyOwnElements('tr', tbody)
            createMyOwnElements('td', tr, i+1)
            heads.forEach((h, i) => createMyOwnElements('td', tr, customer[h.inForm]))
            let td = createMyOwnElements('td', tr)
            let delbtn = createMyOwnElements('button', td, "Delete", "btn btn-danger mx-3")
            delbtn.addEventListener('click',  function() { deleteItem(i) } )
            let addBtn = createMyOwnElements('button', td, "Add Balance", "btn btn-warning mx-3")
            addBtn.addEventListener('click', function(e){
                addForm.classList.remove('d-none')
                localStorage.setItem('editIndex', i)
            })
            let withdrawBtn = createMyOwnElements('button', td, "Withdraw Balance", "btn btn-warning mx-3")
            withdrawBtn.addEventListener('click', function(e){
                withdrawForm.classList.remove('d-none')
                localStorage.setItem('editIndex', i)
            })
            
        })
    }
}
if (addForm) {
    addForm.addEventListener('submit', function(e){
        e.preventDefault()
        let i = localStorage.getItem('editIndex')
        let currentCustomer = customers[i]
        let currentBalance = Number(currentCustomer.customerBalance)
        try {
            currentBalance += Number(addForm.elements.balanceToAdd.value)
            if(Number(addForm.elements.balanceToAdd.value) >= 10000) {
                throw new Error()
            } else {
                let newCustomer = {
                    customerId: currentCustomer.customerId,
                    customerName : currentCustomer.customerName,
                    customerBalance :currentBalance
                }
                customers[i]=newCustomer
                saveDataToStorage(customers)
                addForm.classList.add('d-none')
                drawTable(customers)
            }
            
        } catch (error) {
            alert("can't add 10000 or more")
        }
        })   
}

if (withdrawForm) {
    withdrawForm.addEventListener('submit', function(e){
        e.preventDefault()
        let i = localStorage.getItem('editIndex')
        let currentCustomer = customers[i]
        let currentBalance = Number(currentCustomer.customerBalance)
        try {
            currentBalance -= Number(withdrawForm.elements.balanceToWithdraw.value)
            if(Number(withdrawForm.elements.balanceToWithdraw.value) > currentBalance) {
                throw new Error()
            } else {
                let newCustomer = {
                    customerId: currentCustomer.customerId,
                    customerName : currentCustomer.customerName,
                    customerBalance :currentBalance
                }
                customers[i]=newCustomer
                saveDataToStorage(customers)
                withdrawForm.classList.add('d-none')
                drawTable(customers)
            }
            
        } catch (error) {
            alert("can't withdraw more than the current balance")
        }
        })   
}


const deleteItem = (index)=>{
    customers.splice(index, 1)
    saveDataToStorage(customers)
    drawTable(customers)
}

const table = document.querySelector('#tableData')
if (table) {
    drawTable(customers)
}