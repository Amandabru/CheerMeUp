import { User } from '../../userModel';

interface ProfileViweProps {
    loggedInUser: User | null;
}

function ProfileView({ loggedInUser }: ProfileViweProps) {
    const user = loggedInUser;
    return (
        <div>
            <h1>Hi {user?.username}</h1>
        </div>
    );
}

export default ProfileView;
