const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // Importa o middleware cors
const tarefaRoute = require('./routes/tarefa');

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'https://anotatarefas.netlify.app',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

// Rotas
app.use('/api/tarefa', tarefaRoute);

// Porta
const port = process.env.PORT || 3000;

// Iniciar servidor
app
    .listen(port, "localhost", function () {
        console.log(`Server is running on port ${port}.`);
    })
    .on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            console.log("Error: address already in use");
        } else {
            console.log(err);
        }
    });