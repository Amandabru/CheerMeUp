import { AiOutlineCheck } from 'react-icons/ai';

export const VerificationModal = ({
    directToLogin
}: {
    directToLogin: Function;
}) => {
    return (
        <dialog id="verification_modal" className="modal">
            <div className="modal-box w-80 text-center">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-2xl mb-3 text-center">
                    Verification
                </h3>
                <div className="mt-2 mb-3">
                    A verification email has been sent to you
                    <AiOutlineCheck
                        color="green"
                        className="inline mb-1 ml-2"
                    />
                </div>
                <p>When you have verified your account you can</p>
                <button
                    className="btn btn-secondary mt-2 w-full"
                    onClick={() => directToLogin()}
                >
                    Login
                </button>
            </div>
        </dialog>
    );
};
