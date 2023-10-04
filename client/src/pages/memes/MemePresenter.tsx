import { CheerModel } from '../../models/model';
import useModelProp from '../../hooks/useModelProp';
import promiseNoData from '../../PromiseNoData';
import RandomMemeView from './RandomMemeView';
import MemeView from './MemeView';

import { useState } from 'react';

function MemePresenter() {
    return <MemeView />;
}

export default MemePresenter;
