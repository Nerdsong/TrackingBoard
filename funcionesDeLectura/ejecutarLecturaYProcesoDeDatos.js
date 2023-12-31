import { convertirDatosCSV } from "./convertirDatosCSV.js";
import { GeneradorDeTecnicos } from "../objetos/generadorDeTecnicos.js";
import { GeneradorTarjetasTecnicos } from "../objetos/generadorDeTarjetasTecnicos.js";
import { GeneradorDeServicios } from "../objetos/generadorDeServicios.js";
import { GeneradorTarjetasServicios } from "../objetos/generadorDeTarjetasServicios.js";
import { manejadorDeDatos} from "../objetos/manejadorDeDatos.js"

async function ejecutarLecturaYProcesoDeDatos(datos1,datos2){
    let matrizDatosA = await convertirDatosCSV(datos1);
    let matrizDatosB = await convertirDatosCSV(datos2);

    GeneradorDeTecnicos.leerYGenerarTecnicos(matrizDatosA);
    GeneradorTarjetasTecnicos.generarTarjetas(GeneradorDeTecnicos.tecnicosGenerados);
    GeneradorTarjetasTecnicos.mostrarTarjetasTecnicos()

    GeneradorDeServicios.leerYGenerarServicios(matrizDatosB);

    await manejadorDeDatos.setNuevos(await GeneradorDeServicios.serviciosGenerados)
    await manejadorDeDatos.compararActualesYNuevos();
    //aqui entraria el manejador de matrices. 
    // Se setean las matrices de servicios generados nuevas. 
    // Se comparan mediante los métodos de comparacion
    
    GeneradorTarjetasServicios.mostrarTarjetasServiciosGeneradas(GeneradorDeTecnicos.getLegajos(),manejadorDeDatos.getActuales())
} 

export {ejecutarLecturaYProcesoDeDatos};