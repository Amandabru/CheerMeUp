import './animations.css';

export const AnimationsView = ({ smileyState }: { smileyState: string }) => {
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
