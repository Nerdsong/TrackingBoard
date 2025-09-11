class Servicio{
    #legajoServicio ="";
    SR = 0;
    #task = 0;
    #nombreDelSitio = "";
    #direccion = "";
    #tipoServicio = "";
    #severidad = "";
    #scheduleStart = "";
    #requestedBy = ""; 
    #status = "";
    #serviceTag = "";
    #comentario="Sin comentarios";
    #estadoDeTarjeta="";
    
    getLegajoServicio(){
        return this.#legajoServicio;
    }

    setLegajoServicio(legajo){
        let auxiliarLegajo;
        auxiliarLegajo = legajo.toUpperCase();
        this.#legajoServicio = auxiliarLegajo.substring(0, 8);
    }

    getSR(){
        return this.SR;   
    };

    setSR(numeroSR){
        this.SR= numeroSR;
    }  
    
    getTask(){
        return this.#task;
    }
    
    setTask(numeroTask){
        this.#task = numeroTask;
    }

    getNombreDelSitio(){
        return this.#nombreDelSitio;
    }

    setNombreDelSitio(nombre){
        this.#nombreDelSitio= nombre;
    }

    getDireccion(){
        return this.#direccion;
    }

    setDireccion(direccion){
        this.#direccion = direccion;
    }

    getTipoDeServicio(){
        return this.#tipoServicio;
    }

    setTipoDeServicio(tipo){
        this.#tipoServicio = tipo;
    }

    getSeveridad(){
        return this.#severidad;
    }

    setSeveridad(severidad){
        this.#severidad = severidad;
    }

    setComentario(comentario){
        this.#comentario = comentario;
    }

    getComentario(){
        return this.#comentario;
    }

    setEstadoDeTarjeta(estado){
        this.#estadoDeTarjeta = estado;
    }

    getEstadoDeTarjeta(){
        return this.#estadoDeTarjeta;
    }

    //Acá se toman los datos provenientes de un objeto "fecha" y se pasan a string. 
    getScheduleStart(){

        let options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          };
          
          let formatter = new Intl.DateTimeFormat('en-US', options);
          let dateString = formatter.format(this.#scheduleStart);
          
        let scheduleStartEnString = dateString;
        return scheduleStartEnString;
    }

    setScheduleStart(fechaHora){
        this.#scheduleStart = fechaHora;
    }

    //Acá se toman los datos provenientes de un objeto "fecha" y se pasan a string con la diferencia de que si el campo está vacio se sustituye con "----vacio---".
    getRequestedBy(){
        
        let options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          };
          
          let formatter = new Intl.DateTimeFormat('en-US', options);

          if (isNaN(this.#requestedBy)) {
            return "*----Vacio----*";
          } 
          else {
          let dateString = formatter.format(this.#requestedBy);

          let RequestedbyEnString = dateString;
        return RequestedbyEnString;}

    }

    setRequestedBy(fechaHora){
        this.#requestedBy = fechaHora;
    }

    getStatus(){
        return this.#status;
    }

    setStatus(status){
        this.#status = status;
    }

    getServiceTag(){
        return this.#serviceTag;
    }

    setServiceTag(serviceTag){
        this.#serviceTag = serviceTag;
    }

};

export {Servicio};