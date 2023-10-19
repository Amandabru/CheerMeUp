import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

function PaginationButtons({
    count,
    onDecrement,
    onIncrement,
    position
}: {
    count: number;
    onDecrement: () => void;
    onIncrement: () => void;
    position?: 'bottom' | null;
}) {
    return (
        <div className="flex justify-center items-center !scroll-smooth">
            {count ? (
                <button
                    className="btn btn-accent mt-10 mr-10"
                    onClick={() => {
                        onDecrement();
                        position === 'bottom' && window.scrollTo(0, 0);
                    }}
                >
                    <AiOutlineArrowLeft style={{ scale: '2' }} />
                </button>
            ) : null}
            {count < 2 ? (
                <button
                    className="btn btn-accent mt-10"
                    onClick={() => {
                        onIncrement();
                        position === 'bottom' && window.scrollTo(0, 0);
                    }}
                >
                    <AiOutlineArrowRight style={{ scale: '2' }} />
                </button>
            ) : null}
        </div>
    );
}

export default PaginationButtons;
