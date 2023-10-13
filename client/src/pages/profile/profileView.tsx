import { User } from '../../userModel';
import { getLikedJoys } from '../../api/user';

interface ProfileViewProps {
    loggedInUser: User | null;
}

function ProfileView({ loggedInUser }: ProfileViewProps) {
    const user = loggedInUser;
    return (
        <div>
            <h1>Hi {user?.username}</h1>
        </div>
    );
}

export default ProfileView;
