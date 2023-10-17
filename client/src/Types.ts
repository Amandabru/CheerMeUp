export type ActivityType = {
    type: string;
    text: string;
};

export type NewsType = {
    type: string;
    source: string;
    author: string;
    title: string;
    text: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
};

export type MemeType = {
    type: string;
    title: string;
    url: string;
};

export type JokeType = {
    type: string;
    text: string;
    apiId: number;
};

export type DataBaseType = {
    id: string;
    type: string;
    likes: number;
    content: JokeType | MemeType | NewsType;
    lastLiked: Date;
};

export type JoyToUpdateType = {
    id?: string;
    type: string;
    searchParamValue: string | number;
};

export type DataStructure = {
    jokes: Array<JokeType>;
    activities: Array<ActivityType>;
    memes: Array<MemeType>;
    news: Array<NewsType>;
};

export type ExistingJoy = {
    exists: boolean;
    id?: string;
};

export type MessageType = {
    message: string,
}
