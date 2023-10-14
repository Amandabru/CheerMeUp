import { CheerModel } from '../../models/model';
import HomeView from './HomeView';
import { User } from '../../userModel';
import { getPopular } from '../../api/getPopular';
import { useEffect, useState } from 'react';
import { DataBaseType, JokeType, MemeType, NewsType } from '../../Types';
import useModelProp from '../../hooks/useModelProp';
import usePromise from '../../hooks/usePromise';
import promiseNoData from '../../PromiseNoData';

function HomePresenter({
    model,
    user,
    directToLogin
}: {
    model: CheerModel;
    user: User | null;
    directToLogin: Function;
}) {
    const [promiseMostLiked, setPromiseMostLiked] = useState<Promise<
        DataBaseType[]
    > | null>(null);
    const [dataMostLiked, errorMostliked] = usePromise(promiseMostLiked);

    const [promiseRecentlyLiked, setPromiseRecentlyLiked] = useState<Promise<
        DataBaseType[]
    > | null>(null);
    const [dataRecentlyLiked, errorRecentlyLiked] =
        usePromise(promiseRecentlyLiked);

    const likedJoys = useModelProp(model, 'likedJoys');

    useEffect(() => {
        async function getPopularJoys() {
            try {
                setPromiseMostLiked(getPopular(20, 'likes'));
                setPromiseRecentlyLiked(getPopular(20, 'recentlyLiked'));
            } catch (error) {
                console.log(error);
            }
        }
        getPopularJoys();
    }, []);
    return (
        promiseNoData(
            promiseMostLiked,
            dataMostLiked,
            errorMostliked,
            'Could not fetch most liked joys'
        ) ||
        promiseNoData(
            promiseRecentlyLiked,
            dataRecentlyLiked,
            errorRecentlyLiked,
            'Could not fetch recently liked joys'
        ) || (
            <HomeView
                user={user}
                mostLikedJoys={dataMostLiked}
                recentlyLikedJoys={dataRecentlyLiked}
                likedJoys={likedJoys}
                likeMeme={(meme: MemeType) => {
                    model.likeOrUnlikeMeme(meme);
                }}
                likeJoke={(joke: JokeType) => {
                    model.likeOrUnlikeJoke(joke);
                }}
                likeNews={(news: NewsType) => {
                    model.likeOrUnlikeNews(news);
                }}
                showUserMustLogin={() => directToLogin()}
            />
        )
    );
}

export default HomePresenter;
