const express = require("express");
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const tarefaRoute = require('./routes/tarefa.routes');
const connectDB = require('./config/database');

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'https://anotatarefas.netlify.app',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.json());

connectDB()

// Rotas
app.use('/api/tarefa', tarefaRoute);

// Porta
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app
    .listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  })
    .on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            console.log("Error: address already in use");
        } else {
            console.log(err);
        }
    });