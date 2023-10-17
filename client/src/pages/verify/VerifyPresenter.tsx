import {useParams} from "react-router-dom";
import { getVerify } from "../../api/getVerify";
import {useEffect, useState} from "react";
import usePromise from "../../hooks/usePromise"
import promiseNoData from "../../PromiseNoData";

function VerifyPresenter() {
    const {userId, uniqueString} = useParams();
    const [promise, setPromise] = useState<Promise<string>|null>(null);
    const [data, error] = usePromise(promise);

    useEffect(() => {
        async function getVerify1(){
            setPromise(getVerify(userId, uniqueString))
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
        ) ||
        (
        <div>
            {data.message}
        </div>
        )
    );
}

export default VerifyPresenter;
