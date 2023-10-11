import { useState, useEffect } from 'react';
import { AnimationsView } from './AnimationsView';

const AnimationPresenter = () => {
    const [smileyState, setSmileyState] = useState('normal');
    useEffect(() => {
        const timer = setTimeout(() => {
            setSmileyState('happy');
        }, 2000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return <AnimationsView smileyState={smileyState} />;
};

export default AnimationPresenter;
