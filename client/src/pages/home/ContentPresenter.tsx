import { CheerModel } from '../../models/model';
import ContentView from './ContentView';
import { User } from '../../userModel';
import { DataBaseType, JokeType, MemeType, NewsType } from '../../Types';
import useModelProp from '../../hooks/useModelProp';

function ContentPresenter({
    model,
    user,
    directToLogin,
    joys
}: {
    model: CheerModel;
    user: User | null;
    directToLogin: Function;
    joys: DataBaseType[];
}) {
    const likedJoys = useModelProp(model);

    return (
        <ContentView
            user={user}
            joys={joys}
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
    );
}

export default ContentPresenter;
