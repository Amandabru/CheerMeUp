import { Request, Response } from 'express';
import fetch from 'node-fetch';

export async function getSuggestionsController(req: Request, res: Response) {
    const type = req.params.type;
    const multipleParticipants = req.params.multipleParticipants;

    let participantsQuery: string = '';
    if (multipleParticipants == 'false') participantsQuery = 'participants=1';

    const api_url = `http://www.boredapi.com/api/activity?${participantsQuery}&type=${type}`;
    const response = await fetch(api_url);
    const data = await response.json();

    const selectedData = {
        activity: data.activity
    };

    res.json(selectedData);
}
