document.addEventListener("DOMContentLoaded", () => {


    const randomNumber = Math.floor(Math.random() *14) + 1;

    //TODO eliminar antes de lanzar el juegp
    console.debug("numero aleatorio: " + randomNumber);
    const imagenes = document.querySelectorAll(".cheems-card img");

    imagenes.forEach((img, index) =>{
        const id = index +1;
        img.dataset.id = id;

        img.addEventListener("click", () => {
            if (id == randomNumber){
                img.src = window.IMG_BAD;
                //alert("perdiste")
                imagenes.forEach((otraImg) => {
                    if (otraImg !== img) {
                        otraImg.src = window.IMG_BAD;}
                });

            }else{
                img.src = window.IMG_OK;
                //alert("ganaste")
                
            }


        })


    })


})