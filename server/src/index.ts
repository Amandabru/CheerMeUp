import express, {Request, Response} from "express";
import mongoose from "mongoose";
import Deck from "./models/deck";

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

mongoose.connect(
    'mongodb+srv://CheerMeUp:ncl00uYyCsNhWGPC@cçluster0.bb6igcp.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'
    ).then(()=> {
        console.log("listening on port " + PORT);
        app.listen(PORT);
    });