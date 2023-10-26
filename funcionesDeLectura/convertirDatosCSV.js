function convertirDatosCSV(datos_en_formato_csv){
    let datos_en_formato_js = Papa.parse(datos_en_formato_csv).data;
    
    return datos_en_formato_js;
}

export {convertirDatosCSV};