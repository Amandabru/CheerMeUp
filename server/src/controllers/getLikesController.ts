import { Request, Response } from 'express';
import JoyModel from '../models/Joys';

export async function getLikesController(req: Request, res: Response) {
    const likedJoy = req.body;
    const type = likedJoy.type;

    let searchParamValue: number | string;

    if(type == "joke" || type == "news"){
        searchParamValue = likedJoy.apiId;
    }
    else if(type == "meme"){
        searchParamValue = likedJoy.url;
    }
    else{
        searchParamValue = likedJoy.text;
    }

    const searchParam = Object.keys(likedJoy).find(key => likedJoy[key] === searchParamValue);

    const existingJoy = await JoyModel.findOne({
        [`content.${searchParam}`]: searchParamValue, type: type
      }).exec();

    if(existingJoy){
        JoyModel.updateOne({ _id: existingJoy._id}, {$inc: {likes: 1}, $set: {lastLiked: Date.now()}}).exec()
        .then((result:any) => {
            // Is only false if both updates don't work
            if (result.acknowledged) {
              res.status(200).send('Update successful');
            } else {
              res.status(304).send('No documents were modified');
            }
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
          });;
    }
    else{
        const Joy = await JoyModel.create({
            type: type,
            likes: 1,
            content: {
                title: likedJoy.hasOwnProperty("title") ? likedJoy.title : "",
                text: likedJoy.hasOwnProperty("text") ? likedJoy.text : "",
                apiId: likedJoy.hasOwnProperty("apiId") ? likedJoy.apiId : 0,
                url: likedJoy.hasOwnProperty("url") ? likedJoy.url : "",
                image: likedJoy.hasOwnProperty("image") ? likedJoy.image : "",
            }
        })  
        .then((createdJoy) => {
            if (createdJoy) {
                res.status(201).json(createdJoy);
            } else {
                res.status(500).send("Failed to create the document");
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Internal Server Error");
        });
    }
  }
  