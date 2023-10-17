import { useState } from 'react';
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs';

interface HeartIconProps {
    isSolid: boolean;
}

function HeartIcon(props: HeartIconProps) {
    const [effect, setEffect] = useState<boolean>(false);

    if (props.isSolid) {
        return (
            <BsSuitHeartFill
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
        <BsSuitHeart
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
