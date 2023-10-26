import { Tecnico } from "./Tecnico.js";


const GeneradorDeTecnicos = {
    tecnicosGenerados: [],
    legajos: [],

    leerYGenerarTecnicos(matrizDatos){
        let i = 0;
        for( i = 0 ; i < matrizDatos.length; i++ ){
            GeneradorDeTecnicos.tecnicosGenerados[i]= new Tecnico();
            GeneradorDeTecnicos.tecnicosGenerados[i].setLegajo(matrizDatos[i][1]);
            GeneradorDeTecnicos.tecnicosGenerados[i].setNombre(matrizDatos[i][0]);
            GeneradorDeTecnicos.tecnicosGenerados[i].setSkill(matrizDatos[i][2]);
            GeneradorDeTecnicos.tecnicosGenerados[i].setHorario(matrizDatos[i][3]);
            GeneradorDeTecnicos.tecnicosGenerados[i].setDisponible(matrizDatos[i][4]);
        };
        GeneradorDeTecnicos.generarListadoConLegajos();   
    }
    ,
    generarListadoConLegajos(){
        let i = 0 ;
        let dato = "";
        for(i=0; i< GeneradorDeTecnicos.tecnicosGenerados.length;i++){
            dato = GeneradorDeTecnicos.tecnicosGenerados[i].getLegajoTecnico();
            GeneradorDeTecnicos.legajos.push(dato);
         }
    }
    ,
    
    getLegajos(){
        return GeneradorDeTecnicos.legajos;
    }

}

export {GeneradorDeTecnicos}