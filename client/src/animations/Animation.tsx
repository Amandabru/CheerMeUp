import './animation.css';
import { useState, useEffect } from 'react';

const Animation = () => {
    const [smileyState, setSmileyState] = useState('normal');
    useEffect(() => {
        const timer = setTimeout(() => {
            setSmileyState('happy');
        }, 2000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            <div className="smileyContainer">
                <div className={`smiley ${smileyState}`}>
                    <div className="eyes">
                        <div className="eye leftEye"></div>
                        <div className="eye rightEye"></div>
                    </div>
                    <div className="mouth"></div>
                </div>
            </div>
        </>
    );
};

export default Animation;
