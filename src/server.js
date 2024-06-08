const app = require('./app')
const PORT = process.env.PORT || 3000;
const path = require('path')
const handlebars = require('express-handlebars');
const { Server } = require('socket.io')
const http = require('http')

app.engine('hbs', handlebars.engine({
  extname: "hbs",
  defaultLayout: "main"
}));
//set hbs
app.set("view engine", "hbs");
app.set("views", `${path.resolve('src')}/views`);



app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { name: 'Mundo' });
});


const httpServer = http.createServer(app)
const io = new Server(httpServer);


io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado:", socket.id, "Algo más");
})

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
