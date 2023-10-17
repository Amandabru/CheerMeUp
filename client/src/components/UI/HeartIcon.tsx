import React from 'react';
import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti';

interface HeartIconProps {
    isSolid: boolean;
    style?: React.CSSProperties;
}

function HeartIcon(props: HeartIconProps) {
    const [effect, setEffect] = React.useState(false);

    if (props.isSolid) {
        return (
            <TiHeartFullOutline
                className={`${
                    effect && 'animate-pulse'
                }  cursor-pointer transform scale-150`}
                onClick={() => {
                    setEffect(true);
                }}
                onAnimationEnd={() => setEffect(false)}
            />
        );
    }
    return (
        <TiHeartOutline
            className={`${
                effect && 'animate-pulse'
            }  cursor-pointer transform scale-150`}
            onClick={() => {
                setEffect(true);
            }}
            onAnimationEnd={() => setEffect(false)}
        />
    );
}

export default HeartIcon;
