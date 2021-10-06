const validator = require('validator')

class Validation {
    static nameValidation = (name)=> {
        if(validator.isAlpha(name) && (name.length>=3 && name.length<=20)) return true
        else return false
    }

    static emailValidation = (email) => {
        if(validator.isEmail(email)) return true
        else return false
    }

    static isUnique = (all, single, attrb) => {
        let index  = all.findIndex(el => el[attrb]==single)
        if(index == -1) return true
        return false
    }

    static jobValidation = (job) => {
        let jobs = ["dev", "ceo", "instructor", "employee"]
        if(jobs.includes(job)) return true
        else return false
    }
}

module.exports = Validation