apiReq = async(url, cb)=>{
    try{
        let data = ""
        let options = {
            host : "api.football-data.org",
            path: `${url}`,
            method : "GET",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'X-Auth-Token': `${process.env.APIKEY}`
            }
        }
        
        const request = http.request(options, (response)=>{
            let result = ""
            if(response.statusCode == 200)
            {
                response.on('data', (dataPart)=>{
                    result += dataPart.toString()
                })
                
                response.on('end', async()=>{
                    data = JSON.parse(result)
                    
                })
            } else {
                throw new Error("error getting data from api")
            }
        })
        request.end()
        console.log(data)
        cb(data)

    } catch(e){
        console.log({
            apiStatus: false,
            data: e.message,
            message:"error getting data from api"
        })
    }
}

module.exports = apiReq