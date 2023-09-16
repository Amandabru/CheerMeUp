import {config} from "dotenv";
import express, {Request, Response} from "express";
import mongoose from "mongoose";
import Deck from "./models/deck";
config();

const PORT = 5000;

const app = express();
app.use(express.json());

app.post('/decks', async (req:Request, res:Response) => {
    const newDeck = new Deck({
        title:req.body.title,
    });
    const cretedDeck = await newDeck.save();
    res.json(cretedDeck);
});

mongoose.connect(process.env.MONGO_URL!).then(()=> {
        console.log("listening on port " + PORT);
        app.listen(PORT);
    });