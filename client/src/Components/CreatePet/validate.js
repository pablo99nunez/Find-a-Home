export const validate = (input)=>{

let err = {}
const nameRegex = /^[a-zA-Z ]{0,10}$/;

if(nameRegex.test(input.name)) err.name = "El nombre debe tener un maximo de 10 caracteres"

}