import { User } from '../../userModel';
import { getLikedJoys } from '../../api/user';

interface ProfileViewProps {
    loggedInUser: User | null;
}

function ProfileView({ loggedInUser }: ProfileViewProps) {
    const user = loggedInUser;
    return (
        <div className="bg-red-300 text-black min-h-screen bg-fixed">
            <h1>Hi {user?.username}</h1>
        </div>
    );
}

export default ProfileView;
