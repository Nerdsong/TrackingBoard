import { GeneradorDeServicios } from "./generadorDeServicios.js";
import { Servicio } from "./Servicio.js";

const manejadorDeDatos = {
    finalizados:[],
    actuales:[],
    nuevos:[],
    setFinalizados(array){
        manejadorDeDatos.finalizados = array;
    },
    getFinalizados(){
        return manejadorDeDatos.finalizados;
    },
    setActuales(array){
        manejadorDeDatos.actuales = array.slice()
    },
    getActuales(){
        return manejadorDeDatos.actuales;
    },
    setNuevos(array){
        manejadorDeDatos.nuevos = array;
    },
    getNuevos(){
        return manejadorDeDatos.nuevos;
    },

    async compararActualesYNuevos(){

        if(manejadorDeDatos.actuales.length === 0){
            manejadorDeDatos.setActuales(await manejadorDeDatos.getNuevos())
            
        }
        else{ 
          //la primera iteracion es sobre cada elemento del array "Actuales" 
            let limiteIteraciones = manejadorDeDatos.actuales.length;  
            let i = 0;
            let servicioActualExisteEnNuevos = false;
            let comentario = "";
            let estadoTarjeta = "";
            let numeroDeservicio = "";
            let servicioActual = "";
            let indexNuevo = "";

            
            for(i = 0; i < limiteIteraciones ; i ++) {
                //comprueba si el elemento del array "actuales" existe en el array "nuevos", si existe, elimina del array "nuevos" el elemento repetido. 
                servicioActual = manejadorDeDatos.actuales[i];
                numeroDeservicio = servicioActual.getSR();
                servicioActualExisteEnNuevos = manejadorDeDatos.nuevos.some(servicio => servicio.getSR() == numeroDeservicio);
                
                if(servicioActualExisteEnNuevos){
                    comentario = servicioActual.getComentario();
                    estadoTarjeta = servicioActual.getEstadoDeTarjeta();
                    

                    indexNuevo = manejadorDeDatos.nuevos.findIndex(servicio => servicio.getSR() == numeroDeservicio)
                    
                    manejadorDeDatos.nuevos[indexNuevo].setComentario(comentario);
                    manejadorDeDatos.nuevos[indexNuevo].setEstadoDeTarjeta(estadoTarjeta);
                    console.log(manejadorDeDatos.nuevos[indexNuevo]);
                    console.log("se ha añadido el comentario " + comentario)
                    console.log("se añade status tarjeta " + estadoTarjeta)
                } 
                //si el elemento del array "actuales" no existe en el array "nuevos", lo elimina del array "actuales" y lo guarda en una array "finalizados"
                else{
                    manejadorDeDatos.finalizados.push(manejadorDeDatos.actuales[i])
                    //para eliminar el elemento se aprovecha la variable del iterador
                    //al borrar un elemento se le resta una iteracion a la variable para evitar saltos, por que el array se estaría achicando. 
                    
                }

            };
            // luego toma los elementos del array "nuevos" que no se eliminaron porque no estaban en el array "actuales" y los incluye a "actuales"
            manejadorDeDatos.setActuales(manejadorDeDatos.getNuevos());
            console.log(manejadorDeDatos.getActuales())
        }
        
    } 
} 

export {manejadorDeDatos}