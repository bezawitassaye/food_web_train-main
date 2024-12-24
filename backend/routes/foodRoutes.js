import express from"express"

import { addFood,listfood ,removefood} from "../controllers/foodcontrollers.js"
import multer from "multer"

const foodRouter = express.Router()

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload = multer({storage:storage})
foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listfood)
foodRouter.post("/remove",removefood)


export default foodRouter;