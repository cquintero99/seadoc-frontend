const opcinesRespuesta=document.getElementById('btnOpcinesRespuesta')

opcinesRespuesta.addEventListener('click',()=>{
    let valor=document.getElementById("inputValorP").value
    let descripcion=document.getElementById("inputDescripcionP").value

    if(valor!="" && descripcion!=""){
    document.getElementById("opcinesRespuesta").innerHTML+=`<tr><td>${"#"}</td>
    <td>${valor}</td>
    <td>${descripcion}</td></tr>`
    }


    
})



