import { escrituraTarjeta } from "../funcionesDeEscritura/escrituraTarjeta.js";

const GeneradorTarjetasServicios = {

    verificarLegajo(array, legajo){
        return array.includes(legajo);
    },
    
    mostrarTarjetasServiciosGeneradas(listadoTecnicos,listado){
        let s=0;
        for( s = 0 ; s < listado.length; s++ ){
            if(this.verificarLegajo(listadoTecnicos,listado[s].getLegajoServicio())){
                    document.querySelector(`#${listado[s].getLegajoServicio()}`).innerHTML += 
                        escrituraTarjeta(
                            listado[s].getStatus(),
                            listado[s].getSR(),
                            listado[s].getTask(),
                            listado[s].getServiceTag(),
                            listado[s].getNombreDelSitio(),
                            listado[s].getDireccion(),
                            listado[s].getTipoDeServicio(),
                            listado[s].getSeveridad(),
                            listado[s].getRequestedBy(),
                            listado[s].getScheduleStart(),
                            listado[s].getComentario(),
                            listado[s].getEstadoDeTarjeta()
                        )
                    ; 
            }
            else{} 
        }  
    } 
}

export {GeneradorTarjetasServicios}