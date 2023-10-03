import React from 'react';
import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/Ti';

interface HeartIconProps {
    isSolid: boolean;
    style?: React.CSSProperties;
}

function HeartIcon(props: HeartIconProps) {
    if (props.isSolid) {
        return <TiHeartFullOutline style={props.style} />;
    }
    return <TiHeartOutline style={props.style} />;
}

export default HeartIcon;
