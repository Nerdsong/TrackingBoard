import { manejadorDeEventos } from "./objetos/manejadorDeEventos.js";

const drop_dom_element_1 = document.getElementById("drop_dom_element_1");
const drop_dom_element_2 = document.getElementById("drop_dom_element_2");
let contenido = document.getElementById("contenido");

drop_dom_element_1.addEventListener("drop",manejadorDeEventos.handleDropAsync_1, false);

drop_dom_element_2.addEventListener("drop",manejadorDeEventos.handleDropAsync_2, false);

contenido.addEventListener("click",manejadorDeEventos.clickEnBotonDeTarjeta);

