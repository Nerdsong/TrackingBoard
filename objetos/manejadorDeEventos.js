import {ejecutarLecturaYProcesoDeDatos} from "../funcionesDeLectura/ejecutarLecturaYProcesoDeDatos.js";
import { manejadorDeDatos } from "./manejadorDeDatos.js";

const manejadorDeEventos = {
    datosCSV_1:"",
    datosCSV_2:"",

    handleDropAsync_1: async (e) => { 
        e.stopPropagation();
        e.preventDefault();
        
        e.target.classList.add("drop");
      
        const f = e.dataTransfer.files[0]; 
        const data = await f.arrayBuffer(); 
        const workbook = XLSX.read(data); 
        
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const csv = XLSX.utils.sheet_to_csv(worksheet);
        
        manejadorDeEventos.datosCSV_1 = csv;
        
      },

    handleDropAsync_2: async (e) => { 
        e.stopPropagation();
        e.preventDefault();
        
        e.target.classList.add("drop");
      
        const f = e.dataTransfer.files[0]; 
        const data = await f.arrayBuffer(); 
        const workbook = XLSX.read(data); 
        
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const csv = XLSX.utils.sheet_to_csv(worksheet);
        
        manejadorDeEventos.datosCSV_2 = csv;

        ejecutarLecturaYProcesoDeDatos(manejadorDeEventos.datosCSV_1, manejadorDeEventos.datosCSV_2);
    },
    
    async clickEnBotonDeTarjeta(evento){
        if(evento.target.closest("button") != null){
            let numeroDeServicio = evento.target.closest(".card").id;
            let indexDelServicio = manejadorDeDatos.actuales.findIndex( servicio => servicio.getSR() == numeroDeServicio);
            if(evento.target.closest("button").className.includes("boton-tarjeta-coment") ){
                
                let botonComentario = evento.target.closest("button");
                //rutear el target hacia el elemento "primo"
                let padreBotonComentario = botonComentario.parentElement;
                
                let tioBotonComentario = padreBotonComentario.previousElementSibling
                
                let primosBotonComentario = tioBotonComentario.children
                
                let divComentario = primosBotonComentario[3] // aca ubico el elemento "primo" donde está la caja de comentarios.

                let input = document.createElement("input");

                input.classList.add("input-comentario")

                input.value = divComentario.textContent
          
                divComentario.replaceWith(input);
                
                input.focus();

                input.addEventListener('blur', async () => {
                    divComentario.textContent = input.value
                    input.replaceWith(divComentario)
                    await manejadorDeDatos.actuales[indexDelServicio].setComentario(input.value)
                    console.log(manejadorDeDatos.actuales[indexDelServicio])
                    console.log("se ha agregado el comentario " + input.value)
                })              

            }
            else if(evento.target.closest("button").className.includes("boton-tarjeta-urgent") ){
            
                let tarjetaContenedora = evento.target.closest(".card");
                
                
                if(tarjetaContenedora.className.includes("tarjeta-pendiente")){
                    
                    tarjetaContenedora.classList.remove("tarjeta-pendiente")
                    tarjetaContenedora.classList.add("tarjeta-confirmada")

                    await manejadorDeDatos.actuales[indexDelServicio].setEstadoDeTarjeta("tarjeta-confirmada")
                }
                else if(tarjetaContenedora.className.includes("tarjeta-confirmada")){
                    
                    tarjetaContenedora.classList.remove("tarjeta-confirmada")
                    await manejadorDeDatos.actuales[indexDelServicio].setEstadoDeTarjeta("")
                }
                else{
                    
                    tarjetaContenedora.classList.add("tarjeta-pendiente")
                    await manejadorDeDatos.actuales[indexDelServicio].setEstadoDeTarjeta("tarjeta-pendiente")
                }
            }
        }
        else{}
    }
}

//revisar como manejar eventos con async y await para que la funcion que ejecuta el código a partir de los datos preparados no deba incluirse en ninguna de estas funciones sino que sea independiente. 
export {manejadorDeEventos};