import ProfileView from './ProfileView';
import { CheerModel } from '../../models/model';
import { User } from '../../userModel';

function ProfilePresenter({
    model,
    user
}: {
    model: CheerModel;
    user: User | null;
}) {
    return <ProfileView loggedInUser={user}></ProfileView>;
}

export default ProfilePresenter;
