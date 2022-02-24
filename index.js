const express = require('express')
const { Server } = require('socket.io')
const path = require('path');
const http = require('http')
const fetch = require ('node-fetch')


const app = express();
const server = http.createServer(app)
const PORT = process.env.PORT | 8080
const io = new Server(server)

// const homeRouter = require('./routes/home');
const { engine } = require('express-handlebars');
const Product = require('./models/products')
const productModel = new Product();
const upload = require('./middlewares/file');
let producto = {}


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', engine({
  layoutsDir: path.join(__dirname, './views'),
  defaultLayout: 'index'
}));

app.set('view engine', 'handlebars')
app.use("/static", express.static(path.join(__dirname, 'public')))


app.get("/", async (req, res) => {
  res.render(path.join(__dirname, './views/index.handlebars'))
});

app.post("/", upload.single("thumbnail"), async (req, res) => {
    const { title, price} = req.body;
    const thumbnail = path.join("static/img/" + req.file.filename)
    await productModel.save(title, price+"$", thumbnail).then(id =>{return id});
    res.render(path.join(__dirname, './views/index.handlebars'))
  })

io.on("connection", async (socket) => {
  console.log(socket.id)
  io.emit('index', null)
})


server.listen(PORT, () => console.log(`listening on port: ${PORT}`))