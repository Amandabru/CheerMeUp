import { useState, useEffect } from 'react';
import { AnimationsView } from './AnimationsView';
import { User } from '../userModel';

const AnimationPresenter = ({ user }: { user: User | null }) => {
    const [smileyState, setSmileyState] = useState('normal');
    const [isVisible, setIsVisible] = useState(true);

    setTimeout(() => {
        setIsVisible(false);
    }, 6000);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSmileyState('happy');
        }, 2000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    if (isVisible) {
        return <AnimationsView smileyState={smileyState} user={user} />;
    } else {
        return null;
    }
};

export default AnimationPresenter;
