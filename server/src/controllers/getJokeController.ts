import { Request, Response } from 'express';
import fetch from 'node-fetch';

export async function getJokeController(req: Request, res: Response) {
    const categories = req.params.categories.split(',');
    const api_url = `https://v2.jokeapi.dev/joke/${categories.join(
        ','
    )}?safe-mode&type=single`;
    const response = await fetch(api_url);
    const data = await response.json();

    const selectedData = {
        type: 'joke',
        text: data.joke,
        apiId: data.id
    };

    res.json(selectedData);
}
