import { API_URL } from './config';

type JokeType = {
  error: boolean;
  category: string;
  type: string;
  joke: string;
  flags: FlagType;
  id: number;
  safe: boolean;
  lang: string;
};

type FlagType = {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
  explicit: boolean;
};

export async function getJoke(): Promise<JokeType> {
  const response = await fetch(`${API_URL}/jokes`);
  return response.json();
}
