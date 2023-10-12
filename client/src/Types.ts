export type SuggestionType = {
    type: string;
    text: string;
    liked: boolean;
};

export type NewsType = {
    type: string;
    source: { id: string; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
    liked?: boolean;
};

export type MemeType = {
    type: string;
    title: string;
    url: string;
    liked?: boolean;
};

export type JokeType = {
    type: string;
    text: string;
    apiId: number;
    liked?: boolean;
};

export type ContentType = {
    id: string;
    title: string;
    text: string;
    apiId: number;
    url: string;
    image: string;
};

export type DataBaseType = {
    id: string;
    type: string;
    likes: number;
    content: ContentType;
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
