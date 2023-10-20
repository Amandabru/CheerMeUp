import { useParams } from 'react-router-dom';
import { getVerify } from '../../api/getVerify';
import { useEffect, useState } from 'react';
import usePromise from '../../hooks/usePromise';
import promiseNoData from '../../PromiseNoData';
import { MessageType } from '../../Types';

function VerifyPresenter() {
    const { userId, uniqueString } = useParams();
    const [promise, setPromise] = useState<Promise<MessageType> | null>(null);
    const [data, error] = usePromise(promise);

    useEffect(() => {
        async function getVerify1() {
            const data = await getVerify(userId, uniqueString);
            setPromise(Promise.resolve(data));
        }
        getVerify1();
    }, [userId, uniqueString]);

    return (
        promiseNoData(
            promise,
            data,
            error,
            'Could not verify email address',
            'bg-gradient-to-r from-pink-300 to-[#ff82c9] dark:from-[#611d4d] dark:to-[#4d173d]'
        ) || (
            <div>
                <h2 className="absolute top-[44%]  md:top-[32%] text-2xl font-light left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-80 md:w-144">
                    {(data as MessageType)?.message}
                </h2>
            </div>
        )
    );
}

export default VerifyPresenter;
