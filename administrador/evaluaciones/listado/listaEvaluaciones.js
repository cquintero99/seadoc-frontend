
const urlBasic = "https://teacher-test-backend-production-e58a.up.railway.app";


function verListado(){
    listado() 
    .then(res=>res.json())
    .then(data=>{
        console.log(data)

    })
    .catch(error=>{
        console.log(error)
    })

}

async function listado(){
    let token = localStorage.getItem("token")
    const result=await fetch (urlBasic + "/evaluaciones",{
        headers: {
            'Content-type': 'application/json ',
            'Authorization': 'Bearer '+ token,
            'Cache-Control': 'no-store'
          }
    })

    return result
}