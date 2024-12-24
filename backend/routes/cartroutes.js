import express from "express"

import {addTocart,remove,getcartitem} from "../controllers/cartcontroller.js"
import authMiddleware from "../middleware/auth.js"
const cartroutes = express.Router()

cartroutes.post("/add",authMiddleware,addTocart)
cartroutes.post("/remove",authMiddleware,remove)
cartroutes.post("/get",authMiddleware,getcartitem)

export default cartroutes