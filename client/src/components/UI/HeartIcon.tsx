import { useState } from 'react';
import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/Ti';

interface HeartIconProps {
    isSolid: boolean;
}

function HeartIcon(props: HeartIconProps) {
    const [effect, setEffect] = useState<boolean>(false);

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
