import ProfileView from './profileView';
import { CheerModel } from '../../models/model';
import { User } from '../../userModel';
import useModelProp from '../../hooks/useModelProp';
import { DataStructure, MemeType, NewsType, JokeType } from '../../Types';
import { splitArrayInHalf } from '../../DataFunctions';

function ProfilePresenter({ model, user }: { model: CheerModel; user: User }) {
    const likedJoys: DataStructure = useModelProp(model);

    // Function to shuffle an array (Fisher-Yates shuffle)
    const shuffleArray = (array: (MemeType | NewsType | JokeType)[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    // Combine all liked items into a single array (not used becuse it did not work in ProfileView)
    const allLikedItems = [
        ...likedJoys.memes,
        ...likedJoys.news,
        ...likedJoys.jokes
    ];

    shuffleArray(allLikedItems);

    const [allLikedItems1, allLikedItems2] = splitArrayInHalf(allLikedItems);

    return (
        <ProfileView
            loggedInUser={user}
            likedJoys1={allLikedItems1}
            likedJoys2={allLikedItems2}
            likedMemes={likedJoys.memes}
            likedNews={likedJoys.news}
            likedJokes={likedJoys.jokes}
            likeMemePost={(meme: MemeType) => model.likeOrUnlikeMeme(meme)}
            likeNewsPost={(news: NewsType) => model.likeOrUnlikeNews(news)}
            likeJokePost={(joke: JokeType) => model.likeOrUnlikeJoke(joke)}
        ></ProfileView>
    );
}

export default ProfilePresenter;
