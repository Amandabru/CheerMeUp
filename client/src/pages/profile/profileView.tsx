import { User } from '../../userModel';
import { getLikedJoys } from '../../api/user';
import { CheerModel } from '../../models/model';

function ProfileView({
    model,
    user,
    directToLogin
}: {
    model: CheerModel;
    user: User | null;
    directToLogin: Function;
}) {
    return (
        <div className="bg-red-300 text-black min-h-screen bg-fixed">
            <div className="flex justify-center text-3xl font-bold">
                <h1 className="mt-10">Hi {user?.username}</h1>
                <h1 className="mt-10">liked joys in progress</h1>
            </div>
        </div>
    );
}

export default ProfileView;
