import { manejadorDeEventos } from "./objetos/manejadorDeEventos.js";

const drop_dom_element_1 = document.getElementById("drop_dom_element_1");
const drop_dom_element_2 = document.getElementById("drop_dom_element_2");
const checkbox_element = document.getElementById("checkbox-hide");

let contenido = document.getElementById("contenido");

drop_dom_element_1.addEventListener("drop",manejadorDeEventos.handleDropAsync_1, false);

drop_dom_element_2.addEventListener("drop",manejadorDeEventos.handleDropAsync_2, false);

drop_dom_element_2.addEventListener("dragenter",manejadorDeEventos.handleDragEnter,false);
drop_dom_element_2.addEventListener("dragleave",manejadorDeEventos.handleDragLeave,false);

checkbox_element.addEventListener("change", ()=>{
    
    if(checkbox_element.checked){
        manejadorDeEventos.handleCheckBox_checked();
    }
    else{
        manejadorDeEventos.handleCheckBox_unChecked();
    }
}, false);

contenido.addEventListener("click",manejadorDeEventos.clickEnBotonDeTarjeta);

