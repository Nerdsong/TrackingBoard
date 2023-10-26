
  
  class Tecnico{
    #legajoTenico = "";
    #nombre = "";
    #skill = "";
    #horario = "";
    #disponible = "";

    getLegajoTecnico(){
        return this.#legajoTenico;
    }

    setLegajo(legajo){
        this.#legajoTenico = legajo;
    }

    getNombre(){
        return this.#nombre;
    }

    setNombre(nombre){
        this.#nombre = nombre;
    }

    getSkill(){
        return this.#skill;
    }

    setSkill(skill){
        this.#skill = skill;
    }

    getHorario(){
        return this.#horario;
    }

    setHorario(horario){
        this.#horario = horario;
    }

    getDisponible(){
        return this.#disponible;
    }

    setDisponible(disponible){
        this.#disponible = disponible;
    }


}

export {Tecnico}; 