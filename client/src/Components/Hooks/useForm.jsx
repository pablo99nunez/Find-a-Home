import React from "react";
import { useState } from "react";

export    const data = [
          { key: "1", value: "Perro" },
          { key: "2", value: "Gato" },
          { key: "3", value: "Otro" },
        ];
      
        export   const [selected, setSelected] = useState("");
      
        export    const [crear, setCrear] = useState({
          name: "",
          description: "",
          birthday: "",
          size: "",
          profilePic: "",
        });
      
  export const [error, setError] = useState({
          name: "",
          description: "",
          birthday: "",
          size: "",
          profilePic: "",
        });
      
