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


export type MemeType = {
    type: string,
    title: string;
    url: string;
};

export type JokeType = {
    type: string,
    text: string;
    apiId: number;
};

export type ContentType = {
    id: string,
    title: string, 
    text: string,
    apiId: number,
    url: string,
    image: string,
}

export type DataBaseType = {
    id: string,
    type: string,
    likes: number,
    content: ContentType,
    lastliked: Date,
}

