import React from 'react';
import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/Ti';

interface HeartIconProps {
    isLiked: boolean;
    style?: React.CSSProperties;
}

function HeartIcon(props: HeartIconProps) {
    if (props.isLiked) {
        return <TiHeartFullOutline style={props.style} />;
    }
    return <TiHeartOutline style={props.style} />;
}

export default HeartIcon;
