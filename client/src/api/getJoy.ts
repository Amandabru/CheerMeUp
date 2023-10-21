import { ExistingJoy } from '../Types';
//import { API_URL } from './config';

// searchParam: the parameter to check after in the database, are the following for the different types:
// meme: "url"
// activities: "text"
// joke & news: "apiId"
// searchParamValue: the actual value for the searchParam, so for instance the url for a meme.
// type: it is the type of joy to be get, e.g. meme, joke etc

// returns an object with the attribute exists that is either true or false. If the attribute is true, it also returns the id of the
// object that should be sent to the patchLike endpoint.
export async function getJoy(
    searchParam: string,
    searchParamValue: string | number,
    type: string
): Promise<ExistingJoy> {
    const response = await fetch(
        `/api/joyExists/${type}/${searchParam}/${searchParamValue}`
    );
    return response.json();
}
