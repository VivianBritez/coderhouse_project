const express = require('express')
const app = express()
const routes = require('./routers/index');
const PORT = process.env.PORT || 3000;
const path = require('path')
const handlebars = require('express-handlebars');
const { Server } = require('socket.io')
const http = require('http')
const socketHandler = require('./utils/socket');
const mongoose = require('mongoose')


const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
//connect to database
mongoose.connect(mongoUri).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});



app.use(express.json());
app.use('/', routes)
// Middleware para servir archivos estáticos
app.use(express.static(`${path.resolve('src')}/public`));

app.engine('hbs', handlebars.engine({
  extname: "hbs",
  defaultLayout: "main"
}));
//set hbs
app.set("view engine", "hbs");
app.set("views", `${path.resolve('src')}/views`);

const httpServer = http.createServer(app)
const io = new Server(httpServer);
socketHandler(io)


httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
