import { User } from '../../userModel';
import { getLikedJoys } from '../../api/user';
import { MemeType } from '../../Types';
import Card from '../../components/Card';

function ProfileView({
    loggedInUser,
    likedMemes,
    likePost
}: {
    loggedInUser: User;
    likedMemes: MemeType[];
    likePost: Function;
}) {
    const user = loggedInUser;
    return (
        <div className="bg-red-300 text-black min-h-screen bg-fixed">
            <div className="flex justify-center text-3xl font-bold">
                <h1 className="mt-10">Hi {user?.username}</h1>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-20 ml-40 mr-40 mt-20">
                {likedMemes ? (
                    likedMemes.map((memeObject, index) => {
                        return (
                            <Card
                                type="meme"
                                key={index}
                                image={memeObject.url}
                                isLiked={
                                    likedMemes.find(
                                        (meme) => meme.url === memeObject.url
                                    )
                                        ? true
                                        : false
                                }
                                handleLike={() => {
                                    likePost(memeObject);
                                }}
                            ></Card>
                        );
                    })
                ) : (
                    <div>No meme data available</div>
                )}
            </section>
        </div>
    );
}

export default ProfileView;
