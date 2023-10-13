import { useState, useEffect } from 'react';
import { AnimationsView } from './AnimationsView';
import { User } from '../userModel';

const AnimationPresenter = ({ user }: { user: User | null }) => {
    const [smileyState, setSmileyState] = useState('normal');
    useEffect(() => {
        const timer = setTimeout(() => {
            setSmileyState('happy');
        }, 2000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return <AnimationsView smileyState={smileyState} user={user} />;
};

export default AnimationPresenter;
