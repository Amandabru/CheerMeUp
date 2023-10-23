import { useState } from 'react';
import { PiHeart, PiHeartFill } from 'react-icons/pi';

interface HeartIconProps {
    isSolid: boolean;
}

function HeartIcon(props: HeartIconProps) {
    const [effect, setEffect] = useState<boolean>(false);

    if (props.isSolid) {
        return (
            <PiHeartFill
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
        <PiHeart
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
