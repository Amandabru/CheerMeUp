import { User } from '../../userModel';
import NavBarView from './NavBarView';
import * as userApi from '../../api/user';
import { useState, useEffect } from 'react';

const compliments: string[] = [
    `Hope you have a lovely day!`,
    `Are you a parking ticket? Because you’ve got FINE written all over you.`,
    `If beauty were a crime, you'd be serving a life sentence.`,
    `Are you made of copper and tellurium? Because you're Cu-Te.`,
    `If you were a vegetable, you'd be a cute-cumber.`,
    `Hello there! I hope your day is as amazing as you are.`,
    `Hey! Wishing you a day full of sunshine, smiles, and good vibes.`,
    `Good day to you! Remember, you're capable of incredible things.`,
    `Hey, you! Your presence makes the world a better place. Have a fantastic day!`,
    `You look very handsome today!`,
    `You have a great smile; it's contagious!`,
    `Your smile must be a black hole because it's irresistibly pulling everyone in!`,
    `If you were a fruit, you’d be a fineapple – juicy, sweet, and absolutely refreshing!`,
    `You're so cool, you make ice cubes jealous!`,
    `Your determination and hard work inspire me. You're destined for greatness.`,
    `Remember, the best way to predict your future is to create it. You've got this!`,
    `Every day is a new page in the book of your life. Write a great story!`,
    `Keep your eyes on the stars and your feet on the ground. You're destined for greatness.`
];

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
    const [compliment, setCompliment] = useState<string | null>(null);

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
            onGiveCompliment={() => {
                setCompliment(
                    compliments[Math.floor(Math.random() * compliments.length)]
                );
            }}
            onRemoveCompliment={() => {
                setCompliment(null);
            }}
            compliment={compliment}
        />
    );
}

export default NavBarPresenter;
