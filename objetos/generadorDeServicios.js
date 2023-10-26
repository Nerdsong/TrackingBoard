import { Servicio } from "./Servicio.js";

const GeneradorDeServicios = {
    serviciosGenerados: [],

    //este metodo sólo ubica el index en el que se encuentra determinada columna y retorna la posición.

    ubicarColumnaDe( nombreDeColumna, matrizDeDatos){
        let ubicacion = "noExiste";
        let ultimaFila = (matrizDeDatos.length) - 1 ; // este dato es util porque al ordenar la matriz por fecha, la fila que contiene los titulos de las columnas queda de ultima. 

        for(ubicacion=0; ubicacion < matrizDeDatos[0].length;ubicacion ++ ){
            if(nombreDeColumna == matrizDeDatos[0][ubicacion]){
                console.log(ubicacion);
                return ubicacion
            }
            else if(nombreDeColumna == matrizDeDatos[ultimaFila][ubicacion]){
                return ubicacion
            }
            else {};
        };
        return  ubicacion; 
    },

    //este comportamiento debería ordenar la matriz basándose en la fecha de la columna Schedule start luego de convertir las fechas en objetos "fecha"

    odernarMatrizPorFecha(matrizDatos){

        let columnaFechaYHoraSinSeparar = GeneradorDeServicios.ubicarColumnaDe("Schedule Start",matrizDatos);

        GeneradorDeServicios.convertirColumnaDeFechaYHoraEnObjetoFecha(matrizDatos,"Schedule Start");
        GeneradorDeServicios.convertirColumnaDeFechaYHoraEnObjetoFecha(matrizDatos,"Requested By"); //convertimos la columna ReqBy en objeto fecha por cuestiones de estetica. 

        function mergeSort(arr) {
            if (arr.length <= 1) {
              return arr;
            }
          
            const mitad = Math.floor(arr.length / 2);
            const izquierda = arr.slice(0, mitad);
            const derecha = arr.slice(mitad);
          
            return merge(mergeSort(izquierda), mergeSort(derecha));
        }
          
        function merge(izquierda, derecha) {
            let resultado = [];
            let izquierdaIndex = 0;
            let derechaIndex = 0;
          
            while (izquierdaIndex < izquierda.length && derechaIndex < derecha.length) {
              if (izquierda[izquierdaIndex][columnaFechaYHoraSinSeparar] < derecha[derechaIndex][columnaFechaYHoraSinSeparar]) {
                resultado.push(izquierda[izquierdaIndex]);
                izquierdaIndex++;
              } else {
                resultado.push(derecha[derechaIndex]);
                derechaIndex++;
              }
            }
          
            return resultado.concat(izquierda.slice(izquierdaIndex)).concat(derecha.slice(derechaIndex));
          }

        const MATRIZ_ORDENADA = mergeSort(matrizDatos);
        
        return MATRIZ_ORDENADA;

    },

    //este metodo sólo convierte la string en un objeto "fecha"
    convertirColumnaDeFechaYHoraEnObjetoFecha(matrizDatos,ScheduleStartORequestedBy){
        let columnaFechaYHoraSinSeparar = GeneradorDeServicios.ubicarColumnaDe(ScheduleStartORequestedBy,matrizDatos);
        let i = 1;
        for(i=1;i < matrizDatos.length;i++){
            //Esta parte del código es para cubrir un problema que se genera cuando la celda donde debería estar la fecha está completamente vacia, porque por defecto suele traer un espacio y la toma como texto. 
            if(matrizDatos[i][columnaFechaYHoraSinSeparar] == "" || matrizDatos[i][columnaFechaYHoraSinSeparar] == undefined){
                matrizDatos[i][columnaFechaYHoraSinSeparar] = "08-06-2023 00:00:00";
            }
            else{};
            //---------------------------------------------------------------
            
            var dateString = matrizDatos[i][columnaFechaYHoraSinSeparar];
            var dateParts = dateString.split(" "); // Dividir la cadena en fecha y hora
            var date = dateParts[0].split("-"); // Dividir la parte de la fecha por "-"
            var time = dateParts[1].split(":"); // Dividir la parte de la hora por ":"
            
            // Crear un objeto de fecha en JavaScript
            var year = parseInt(date[2]);
            var month = parseInt(date[0]) - 1; // Restar 1 porque los meses en JavaScript comienzan desde 0
            var day = parseInt(date[1]);
            var hour = parseInt(time[0]);
            var minute = parseInt(time[1]);
            var second = parseInt(time[2]);
            
            var dateObject = new Date(year, month, day, hour, minute, second);
            
            matrizDatos[i][columnaFechaYHoraSinSeparar]= dateObject;
        }
    },


    //este methodo deberia recibir la matriz ordenada. 

    leerYGenerarServicios(matrizDatos){

        let matrizOrdenada = GeneradorDeServicios.odernarMatrizPorFecha(matrizDatos);
        console.log(matrizOrdenada);

        let i = 0;
        for( i = 0 ; i < matrizOrdenada.length; i++ ){
            GeneradorDeServicios.serviciosGenerados[i] = new Servicio ();
            GeneradorDeServicios.serviciosGenerados[i].setLegajoServicio(GeneradorDeServicios.verificarSiColumnaExisteYDevolverInfo(matrizOrdenada,i,"CE Code"));
            GeneradorDeServicios.serviciosGenerados[i].setSR(GeneradorDeServicios.verificarSiColumnaExisteYDevolverInfo(matrizOrdenada,i,"SR#"));
            GeneradorDeServicios.serviciosGenerados[i].setTask(GeneradorDeServicios.verificarSiColumnaExisteYDevolverInfo(matrizOrdenada,i,"TASK#"));
            GeneradorDeServicios.serviciosGenerados[i].setNombreDelSitio(GeneradorDeServicios.verificarSiColumnaExisteYDevolverInfo(matrizOrdenada,i,"Site Name"));
            GeneradorDeServicios.serviciosGenerados[i].setDireccion(GeneradorDeServicios.verificarSiColumnaExisteYDevolverInfo(matrizOrdenada,i,"Address"));
            GeneradorDeServicios.serviciosGenerados[i].setTipoDeServicio(GeneradorDeServicios.verificarSiColumnaExisteYDevolverInfo(matrizOrdenada,i,"SR Type"));
            GeneradorDeServicios.serviciosGenerados[i].setSeveridad(GeneradorDeServicios.verificarSiColumnaExisteYDevolverInfo(matrizOrdenada,i,"Severity"));
            GeneradorDeServicios.serviciosGenerados[i].setScheduleStart(GeneradorDeServicios.verificarSiColumnaExisteYDevolverInfo(matrizOrdenada,i,"Schedule Start"));
            GeneradorDeServicios.serviciosGenerados[i].setRequestedBy(GeneradorDeServicios.verificarSiColumnaExisteYDevolverInfo(matrizOrdenada,i,"Requested By"));
            GeneradorDeServicios.serviciosGenerados[i].setStatus(GeneradorDeServicios.verificarSiColumnaExisteYDevolverInfo(matrizOrdenada,i,"Status"));
            GeneradorDeServicios.serviciosGenerados[i].setServiceTag(GeneradorDeServicios.verificarSiColumnaExisteYDevolverInfo(matrizOrdenada,i,"Service Tag"));
        }
    },

    //este metodo verifica que la columna exista, si no existe retorna un téxto indicando que debe añadirse 

    verificarSiColumnaExisteYDevolverInfo(matriz, iterador, columnaABuscar){
        let columnaAuxiliar =  GeneradorDeServicios.ubicarColumnaDe(columnaABuscar,matriz);
        let mensajeDecolumnaNoEncontrada = "Añadir columna al perfil de ECM";

        if(columnaAuxiliar!= "noExiste" ){
            return matriz[iterador][columnaAuxiliar];
        }
        else{
            console.log(mensajeDecolumnaNoEncontrada)
            return mensajeDecolumnaNoEncontrada;
        }
    }
}

export {GeneradorDeServicios};