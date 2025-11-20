document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("btn-save").addEventListener("click", saveWinner);


    const randomNumber = Math.floor(Math.random() *14) + 1;

    //TODO eliminar antes de lanzar el juegp
    console.debug("numero aleatorio: " + randomNumber);
    const imagenes = document.querySelectorAll(".cheems-card img");

    const clickCards = new Set();
    
    imagenes.forEach((img, index) =>{

        const id = index +1;
        img.dataset.id = id;

        img.addEventListener("click", () => {

        if(!clickCards.has(id)){
        clickCards.add(id);

            if (id == randomNumber){
                img.src = window.IMG_BAD;
                //alert("perdiste")
                imagenes.forEach((otraImg, index2) => {
                    otraImg.src = window.IMG_OK;
                });
                img.src = window.IMG_BAD;

            }else{
                img.src = window.IMG_OK;
                //alert("ganaste")
                if(clickCards.size === 14){
                    
                    const modal = new bootstrap.Modal(document.getElementById("modal-winner"))
                    modal.show();


                }
                
            }

        }
        })


    })

    function saveWinner(){
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();

        if (!name || !email){
            alert("LLENA LOS CAMPOS WEI");
            return;
        }
        fetch("/winner", {
            method: "POST", 
            headers: {"content-Type" : "application/json"},
            body: JSON.stringify({
                name: name,
                email: email

            })

        })
        .then(Response =>{
            if(Response.ok){
                return Response.json()
            }else{
                return Promise.reject();
            }
        })
        .then(result =>{
            if(result.success){
                alert("SE GUARDARON LOS REGISTROS BIEN")
            }else{
                alert("NO SE PUDO GUARDAR INNTENTA MAS TARDE")
            }
        })
        .catch(error =>{
            console.error("ERROR: " + error)
            alert("ERROR DE CONEXIONNNNNN")
        })
    }

});