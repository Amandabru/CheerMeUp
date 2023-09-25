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
