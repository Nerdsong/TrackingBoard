import {ejecutarLecturaYProcesoDeDatos} from "../funcionesDeLectura/ejecutarLecturaYProcesoDeDatos.js";
import { manejadorDeDatos } from "./manejadorDeDatos.js";

const manejadorDeEventos = {
    datosCSV_1:"",
    datosCSV_2:"",

    handleDropAsync_1: async (e) => { 
        e.stopPropagation();
        e.preventDefault();
        
        e.target.classList.add("drop");
        e.target.classList.remove("over-drop");
      
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
        e.target.classList.remove("over-drop");
      
        const f = e.dataTransfer.files[0]; 
        const data = await f.arrayBuffer(); 
        const workbook = XLSX.read(data); 
        
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const csv = XLSX.utils.sheet_to_csv(worksheet);
        
        manejadorDeEventos.datosCSV_2 = csv;

        ejecutarLecturaYProcesoDeDatos(manejadorDeEventos.datosCSV_1, manejadorDeEventos.datosCSV_2);
    },
    
    handleDragEnter: async (e)=>{
        e.stopPropagation();
        e.preventDefault();

        e.target.classList.add("over-drop");
    }
    ,
    handleDragLeave: async (e)=>{
        e.stopPropagation();
        e.preventDefault();

        e.target.classList.remove("over-drop");
    }
    ,

    handleCheckBox_checked: async (e) =>{
        console.log("worked")
        let dateNodeList = document.querySelectorAll('[name="schedule-start-DOM"]');
        dateNodeList.forEach(node => {
            // Obtenemos el texto y removemos espacios extra
            const texto = node.textContent.trim();
            // Separamos la fecha de la hora usando la coma
            const [fecha, hora] = texto.split(","); // fecha = "06/17/2024", hora = " 14:00"
            // Comparamos con "hoy"
            const hoy = new Date();
            const diaHoy = `${(hoy.getMonth()+1).toString().padStart(2,'0')}/${hoy.getDate().toString().padStart(2,'0')}/${hoy.getFullYear()}`;
            // Validamos
            if (fecha === diaHoy) {
                
                node.parentElement.parentElement.parentElement.parentElement.classList.add("hiding-card");
                setTimeout(() => {
                    node.parentElement.parentElement.parentElement.classList.add("hiden-text")
                }, 300);
            } 
            else {
            }       
        });
    }
    ,
    handleCheckBox_unChecked: async (e) =>{
        console.log("worked2")
        let dateNodeList = document.querySelectorAll('[name="schedule-start-DOM"]');
        dateNodeList.forEach(node => {
            // Obtenemos el texto y removemos espacios extra
            const texto = node.textContent.trim();
            // Separamos la fecha de la hora usando la coma
            const [fecha, hora] = texto.split(","); // fecha = "06/17/2024", hora = " 14:00"
            // Comparamos con "hoy"
            const hoy = new Date();
            const diaHoy = `${(hoy.getMonth()+1).toString().padStart(2,'0')}/${hoy.getDate().toString().padStart(2,'0')}/${hoy.getFullYear()}`;
            // Validamos
            if (fecha === diaHoy) {
                node.parentElement.parentElement.parentElement.parentElement.classList.remove("hiding-card");
                setTimeout(() => {
                     node.parentElement.parentElement.parentElement.classList.remove("hiden-text")
                }, 300);
                
            } 
            else {
            }       
        });
    }
    ,
    async clickEnBotonDeTarjeta(evento) {
    if (evento.target.closest("button") != null) {
        let numeroDeServicio = evento.target.closest(".card").id;
        let indexDelServicio = manejadorDeDatos.actuales.findIndex(
            servicio => servicio.getSR() == numeroDeServicio
        );

        if (evento.target.closest("button").classList.contains("boton-tarjeta-coment")) {
            
            let tarjeta = evento.target.closest(".card");
            let divComentario = tarjeta.querySelector("#comentario"); // 🎯 directo al div dentro de la tarjeta

            // crear input temporal
            let input = document.createElement("input");
            input.classList.add("input-comentario");
            input.value = divComentario.textContent.trim();

            divComentario.replaceWith(input);
            input.focus();

            input.addEventListener("blur", async () => {
                divComentario.textContent = input.value;
                input.replaceWith(divComentario);
                await manejadorDeDatos.actuales[indexDelServicio].setComentario(input.value);
                console.log("se ha agregado el comentario " + input.value);
            });
        } 
        else if (evento.target.closest("button").classList.contains("boton-tarjeta-urgent")) {
            
            let tarjetaContenedora = evento.target.closest(".card");

            if (tarjetaContenedora.classList.contains("tarjeta-pendiente")) {
                tarjetaContenedora.classList.remove("tarjeta-pendiente");
                tarjetaContenedora.classList.add("tarjeta-confirmada");
                await manejadorDeDatos.actuales[indexDelServicio].setEstadoDeTarjeta("tarjeta-confirmada");
            } 
            else if (tarjetaContenedora.classList.contains("tarjeta-confirmada")) {
                tarjetaContenedora.classList.remove("tarjeta-confirmada");
                tarjetaContenedora.classList.add("tarjeta-alternativa");
                await manejadorDeDatos.actuales[indexDelServicio].setEstadoDeTarjeta("tarjeta-alternativa");
            } 
            else if (tarjetaContenedora.classList.contains("tarjeta-alternativa")){
                tarjetaContenedora.classList.remove("tarjeta-alternativa");
                await manejadorDeDatos.actuales[indexDelServicio].setEstadoDeTarjeta("")
            }
            else {
                tarjetaContenedora.classList.add("tarjeta-pendiente");
                await manejadorDeDatos.actuales[indexDelServicio].setEstadoDeTarjeta("tarjeta-pendiente");
            }
        }
    }
    }
}

//revisar como manejar eventos con async y await para que la funcion que ejecuta el código a partir de los datos preparados no deba incluirse en ninguna de estas funciones sino que sea independiente. 
export {manejadorDeEventos};