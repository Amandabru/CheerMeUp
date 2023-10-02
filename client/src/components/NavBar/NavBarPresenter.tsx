import { User } from '../../userModel';
import NavBarView from './NavBarView';
import * as userApi from '../../api/user';

interface NavBarProps {
    loggedInUser: User | null;
    onSignUpClicked: () => void;
    onLoginClicked: () => void;
    onLogoutSuccessful: () => void;
}

function NavBarPresenter({
    loggedInUser,
    onSignUpClicked,
    onLoginClicked,
    onLogoutSuccessful
}: NavBarProps) {
    async function logout() {
        try {
            await userApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }
    return (
        <NavBarView
            loggedInUser={loggedInUser}
            onLogoutClicked={() => logout()}
            onLoginClicked={onLoginClicked}
            onSignUpClicked={onSignUpClicked}
        />
    );
}

export default NavBarPresenter;
