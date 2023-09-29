import { API_URL } from "./config";

type SuggestionType = {
  activity: string;
  accessibility: number;
  type: string;
  participants: number;
  price: number;
};

export async function getSuggestions(
  type: string,
  multipleParticipants: boolean
): Promise<SuggestionType> {
  const response = await fetch(
    `${API_URL}/suggestions/${type}/:${multipleParticipants}`
  );
  return response.json();
}

export function apiCall(type: string, multipleParticipants: boolean) {
  return (
    fetch(`${API_URL}/suggestions/${type}/:${multipleParticipants}`)
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          throw new Error(response.statusText);
        }
      })
      // from HTTP response headers to HTTP response data
      .then((response) => response.json())
  );
}
