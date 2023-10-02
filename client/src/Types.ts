export type SuggestionType = {
    type: string;
    text: string;
};

export type NewsType = {
    type: string,
    apiId: number,
    title: string,
    text: string,
    url: string,
    image: string,
    author: string,
};

export type MemesCollectionType = {
    count: number;
    memes: MemeType[];
};

export type MemeType = {
    type: string,
    title: string;
    url: string;
    preview: string[];
};

export type JokeType = {
    type: string,
    text: string;
    apiId: number;
};

