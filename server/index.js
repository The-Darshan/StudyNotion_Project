const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const {cloudinaryConnect} = require("./config/cloudinary")
const fileUpload = require("express-fileupload");
const cors = require("cors")

app.use(express.json())
app.use(cookieParser())

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

app.use(
	cors({
		origin:"https://study-notion-project-iota.vercel.app/",
	})
)


const Connection = require("./config/Database")
Connection();
app.get("/",function(req,res){
    res.send("Welcome to StudyNotion.")
})

const route = require("./routes/UserRoute")
const courseRoute = require("./routes/courseRoutes")
const profileRoute = require("./routes/profileRoutes")
const paymentRoute = require("./routes/paymentRoute")
const contactRoute = require("./routes/contactRoute")
app.use("/api/v1",route)
app.use("/api/v1/course",courseRoute)
app.use("/api/v1/profile",profileRoute)
app.use("/api/v1/payment",paymentRoute)
app.use("/api/v1/contact",contactRoute)

cloudinaryConnect();

app.listen(4000,()=>{
    console.log("Server Started at port")
})
