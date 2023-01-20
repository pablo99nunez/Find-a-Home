import React from "react";
import { useState } from "react";

export const useCreateDog = () =>{

const [crear, setCrear] = useState({
    nombre: "",
    descripcion: "",
    fecha_de_nacimiento: "",
    tamaño: "",
    foto: ""
})


return{crear}
}