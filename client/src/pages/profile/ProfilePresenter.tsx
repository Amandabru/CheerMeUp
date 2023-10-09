import { getLoggedInUser } from '../../api/user';
import { User } from '../../userModel';
import ProfileView from './profileView';

interface ProfileViweProps {
    loggedInUser: User | null;
}

function ProfilePresenter({ loggedInUser }: ProfileViweProps) {
    const user = loggedInUser;

    return <ProfileView loggedInUser={user} />;
}

export default ProfilePresenter;
