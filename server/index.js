const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 4000;

dotenv.config()

const server = http.createServer(app);
const io = socketIo(server , {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(cookieParser());

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);

app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

const Connection = require("./config/Database");
Connection();

app.get("/", function(req, res) {
    res.send("Welcome to StudyNotion.");
});

io.on("connection", (socket) => {
    console.log('a user connected');

    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const route = require("./routes/UserRoute");
const courseRoute = require("./routes/courseRoutes");
const profileRoute = require("./routes/profileRoutes");
const paymentRoute = require("./routes/paymentRoute");
const contactRoute = require("./routes/contactRoute");
const roomRoute = require("./routes/chatRoom")

app.use("/api/v1", route);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/room",roomRoute);

cloudinaryConnect();

server.listen(PORT,()=>{
    console.log("Server Started at port")
})