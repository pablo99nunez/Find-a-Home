const nameRegex = /^[a-zA-Z][a-zA-Z\s]{0,13}[a-zA-Z]$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const whatsappRegex = /([+]*\d{2,})*\s?\d{3}[-]?\d{6}/;
const validate = {
  registrationScreen: (clave,valor) => {
    if(clave==='firstName' ){
      return nameRegex.test(valor) ? "":"Nombre incorrecto";
    }
    if(clave==='lastName'){
      return nameRegex.test(valor) ? "":"Apellido incorrecto";
    }
    if(clave==='email'){
      return emailRegex.test(valor) ? "":"Error en el email";
    }
    if(clave==='password'){
      console.log(valor.length);
      return valor.length >= 6 ? "" : "Contraseña debe tener 6 caracteres o más";
    }
    
  },
  Register_First_Steps: (clave,valor) => {
    if(clave==='phone'){
      return whatsappRegex.test(valor) ? "": "Complete como el ejemplo: +54 9 11 5334-4567";
    }}

  
};


module.exports = validate;
