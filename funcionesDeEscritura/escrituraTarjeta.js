function escrituraTarjeta(status,numeroDeSR,numeroDeTask,serviceTag,nombreDelSitio,direccion,tipoDeServicio,severidad,requestedBy,scheduleStart,comentario,estadoDeTarjeta){
    let tarjetaHTML = `
    <div class="card ${status} ${estadoDeTarjeta}" id="${numeroDeSR}">
        <div class="card-info ">
            <div class="numeros_de_servicio">
                ${numeroDeSR} - ${numeroDeTask}
            </div>
            <div class= "nombre_del_sitio ">
                ${nombreDelSitio}
            </div>
            <div class= "contenedor_atm_direccion">
                <div class="numero_de_atm ">
                    ${serviceTag} -
                </div>
                <div class= "direccion_atm">
                    ${direccion}
                </div>
            </div>
            <div class= "tipo_servicio">
                ${tipoDeServicio}    
            </div>
            <div class= "severidad_servicio">
                ${severidad}
            </div>
            <div class= "">
                ${requestedBy}
            </div>
            <div class= "" name="schedule-start-DOM">
                ${scheduleStart}
            </div>
        </div>
</div>`;



/*-
    <div class="card-buttons-container">
        
            <button class="boton-tarjeta-coment ${status}">
                <img class="icono-tarjeta" src="iconos/coment.png" alt="IconoDeComentar">
            </button>
        
            <button class="boton-tarjeta-urgent ${status}">
                <img class="icono-tarjeta"  src="iconos/urgent.png" alt="IconoDePendiente">
            </button>
        
    </div>

*/
return tarjetaHTML;
}

export {escrituraTarjeta}