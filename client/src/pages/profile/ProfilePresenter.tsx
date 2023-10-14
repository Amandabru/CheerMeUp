import ProfileView from './ProfileView';
import { CheerModel } from '../../models/model';
import { User } from '../../userModel';
import promiseNoData from '../../PromiseNoData';
import useModelProp from '../../hooks/useModelProp';
import { useState, useEffect } from 'react';
import { DataStructure, MemeType } from '../../Types';

function ProfilePresenter({ model, user }: { model: CheerModel; user: User }) {
    const likedJoys: DataStructure = useModelProp(model, 'likedJoys');

    return (
        <ProfileView
            loggedInUser={user}
            likedMemes={likedJoys.memes}
            likePost={(meme: MemeType) => model.likeOrUnlikeMeme(meme)}
        ></ProfileView>
    );
}

export default ProfilePresenter;
