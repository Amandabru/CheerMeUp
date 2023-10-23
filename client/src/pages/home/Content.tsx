import { DataBaseType, MemeType, JokeType, NewsType } from '../../Types';
import { MemeCard, NewsCard, JokeCard } from '../../components/Card';
import React from 'react';

function Content({
    data,
    view,
    position
}: {
    data: DataBaseType[] | React.ReactElement;
    view: 'most' | 'recently';
    position?: 'left' | null;
}) {
    if (React.isValidElement(data)) {
        // Display data from promiseNoData
        return data;
    }

    const joys = Array.isArray(data) ? data : [];

    if (joys.length === 0) {
        if (view === 'most') {
            return (
                position === 'left' && (
                    <div>Most liked content not available</div>
                )
            );
        } else if (view === 'recently') {
            return (
                position === 'left' && (
                    <div>Most liked content not available</div>
                )
            );
        }
    }

    return joys.map((joy, index) => {
        let cardComponent = null;

        if (joy.type === 'meme') {
            cardComponent = (
                <MemeCard
                    key={index}
                    image={(joy.content as MemeType).url}
                    numberLikes={joy.likes}
                ></MemeCard>
            );
        } else if (joy.type === 'news') {
            cardComponent = (
                <NewsCard
                    key={index}
                    title={(joy.content as NewsType).title}
                    image={(joy.content as NewsType).urlToImage}
                    text={(joy.content as NewsType).text}
                    author={(joy.content as NewsType).author}
                    published={(joy.content as NewsType).publishedAt}
                    source={(joy.content as NewsType).source}
                    url={(joy.content as NewsType).url}
                    numberLikes={joy.likes}
                ></NewsCard>
            );
        } else if (joy.type === 'joke') {
            cardComponent = (
                <JokeCard
                    key={index}
                    text={(joy.content as JokeType).text}
                    numberLikes={joy.likes}
                ></JokeCard>
            );
        }

        return cardComponent;
    });
}

export default Content;
