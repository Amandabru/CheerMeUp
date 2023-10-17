import { User } from '../userModel';
import './animations.css';

export const AnimationsView = ({
    smileyState,
    user
}: {
    smileyState: string;
    user: User | null;
}) => {
    return (
        <div className="smileyOuterContainer">
            <div className="smileyContainer">
                <div className={`smiley ${smileyState}`}>
                    <div className="eyes">
                        <div className="eye leftEye"></div>
                        <div className="eye rightEye"></div>
                    </div>
                    <div className="mouth"></div>
                    <div className="chat chat-start speechBubble">
                        <div className="chat-bubble">
                            Hi {user?.username}! You look radiant today!
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
