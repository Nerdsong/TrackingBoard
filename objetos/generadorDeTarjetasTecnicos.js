import { TarjetaTecnico } from "./TarjetaTecnico.js";

const GeneradorTarjetasTecnicos = {
    tarjetasTecnicosGeneradas: [],

    generarTarjetas(listadoTecnicos){
        let i = 0;
        for( i = 0 ; i < listadoTecnicos.length; i++ ){
            GeneradorTarjetasTecnicos.tarjetasTecnicosGeneradas[i]= new TarjetaTecnico(listadoTecnicos[i].getLegajoTecnico(),
                listadoTecnicos[i].getNombre(),
                listadoTecnicos[i].getSkill(),
                listadoTecnicos[i].getHorario(),
                listadoTecnicos[i].getDisponible()
            )
        }
    },

    mostrarTarjetasTecnicos(){
        
        let i = 0;
        let horario_clase="";
        let dispo_tecnico="";
        document.querySelector("#contenido").innerHTML = "";
        for(i=0; i < GeneradorTarjetasTecnicos.tarjetasTecnicosGeneradas.length;i++){
            if(GeneradorTarjetasTecnicos.tarjetasTecnicosGeneradas[i].horario == "06:00 A 15:00" || GeneradorTarjetasTecnicos.tarjetasTecnicosGeneradas[i].horario == "6:00 A 15:00"){
                horario_clase = "horario_1";
            }
            else if(GeneradorTarjetasTecnicos.tarjetasTecnicosGeneradas[i].horario == "07:00 A 16:00" || GeneradorTarjetasTecnicos.tarjetasTecnicosGeneradas.horario == "7:00 A 16:00"){
                horario_clase = "horario_2";
            }
            else if(GeneradorTarjetasTecnicos.tarjetasTecnicosGeneradas[i].horario == "08:00 A 17:00" || GeneradorTarjetasTecnicos.tarjetasTecnicosGeneradas.horario == "8:00 A 17:00"){
                horario_clase = "horario_3";
            }
            else if(GeneradorTarjetasTecnicos.tarjetasTecnicosGeneradas[i].horario == "09:00 A 18:00" || GeneradorTarjetasTecnicos.tarjetasTecnicosGeneradas[i].horario == "9:00 A 18:00"){
                horario_clase = "horario_4";
            }
            else if(GeneradorTarjetasTecnicos.tarjetasTecnicosGeneradas[i].horario == "10:00 A 19:00"){
                horario_clase = "horario_5";
            }
            else{
                horario_clase = "horario_6";
            }

            if(GeneradorTarjetasTecnicos.tarjetasTecnicosGeneradas[i].disponible == "NO DISPONIBLE"){
                dispo_tecnico = "no_disponible";
            }
            else{
                dispo_tecnico="";
            }
            document.querySelector("#contenido").innerHTML += `
            <div class="row row-cols-1" id="${GeneradorTarjetasTecnicos.tarjetasTecnicosGeneradas[i].legajoTecnico}"> 
                <div class="card-tecnico text-bg-dark ${dispo_tecnico} mb-3">
                    <div class="card-body">
                        <h6 class="card-title">${GeneradorTarjetasTecnicos.tarjetasTecnicosGeneradas[i].nombre}</h6><br>
                        <h6 class="card-title">${GeneradorTarjetasTecnicos.tarjetasTecnicosGeneradas[i].legajoTecnico}</h6></br>
                        <h6 class="card-title">${GeneradorTarjetasTecnicos.tarjetasTecnicosGeneradas[i].horario}</h6>
                        <p class="card-text">${GeneradorTarjetasTecnicos.tarjetasTecnicosGeneradas[i].skill}  ${GeneradorTarjetasTecnicos.tarjetasTecnicosGeneradas[i].disponible}</p>
                        <div class="${horario_clase}"><br></div>
                    </div>
                </div>
            </div>
                `
        }
    }
}

export {GeneradorTarjetasTecnicos};