
import express from "express"

const app = express();
const port = 8080;

app.get("/", (request, response) => {
    let contenidoHTML = "<h1 style='color:white; background-color:grey; font-weight:bold; font-size:1.5rem; padding:5px; text-transform:uppercase; display:flex; justify-content:center; align-items:center;'>Back end Coderhouse</h1>";
    response.end(contenidoHTML);
})

app.get("/productos", (request, response) => {
    const productos = [
        {id:1, nombre:"Bichy Cola", precio:2500},
        {id:2, nombre:"Bichy Cola sin azucar", precio:2300},
        {id:3, nombre:"Manaos", precio:2300},
        {id:4, nombre:"Manaos light", precio:1800}
    ]

    response.send(productos);
})

app.listen(port, () => {
    console.log("Servidor Activo: " + port);
})