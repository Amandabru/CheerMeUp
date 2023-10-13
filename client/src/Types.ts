export type SuggestionType = {
    text: string;
};

export type NewsType = {
    source: string;
    author: string;
    title: string;
    text: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
};

export type MemeType = {
    title: string;
    url: string;
};

export type JokeType = {
    text: string;
    apiId: number;
};

export type DataBaseType = {
    id: string;
    type: string;
    likes: number;
    content: JokeType | MemeType | NewsType;
    lastliked: Date;
};

export type JoyToUpdateType = {
    id?: string;
    type: string;
    searchParamValue: string | number;
};

export type DataStructure = {
    jokes: Array<JokeType>;
    suggestions: Array<SuggestionType>;
    memes: Array<MemeType>;
    news: Array<NewsType>;
};

export type ExistingJoy = {
    exists: boolean;
    id?: string;
};
