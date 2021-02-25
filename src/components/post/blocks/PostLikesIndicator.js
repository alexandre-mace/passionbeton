import React, {useState} from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {IconButton} from "@material-ui/core";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axios from "axios";
import useIp from "../../../hooks/useIp";
import {apiAddress} from "../../../data/config/api";
import {useRecoilState} from "recoil";
import {postSelector} from "../../../data/selectors/postSelector";

const PostLikesIndicator = ({post}) => {
    const ip = useIp()
    const [postState, setPostState] = useRecoilState(postSelector(post.id));

    const handleLike = (e, isLike) => {
        e.preventDefault();
        e.stopPropagation();

        axios.patch(apiAddress + '/posts/' + post.id + '/' + (isLike ? 'like': 'dislike'), {
            'like': ip
        })
            .then(async function (response) {
                const postResponse = await axios.get(apiAddress + '/posts/' + post.id)
                setPostState(postResponse.data)
                // dispatchNotification(data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const userAlreadyLikedPost = (ip, likes) => {
        if (!likes || !ip) {
            return false
        }
        return likes.includes(ip)
    }

    return (
        <div className={"medias-indicator post-likes"}>
            <IconButton aria-label="like" className={"like-button"} name={'like'}  onClick={(e) => handleLike(e, !userAlreadyLikedPost(ip, post.likes))}>
                {userAlreadyLikedPost(ip, post.likes)
                    ? <FavoriteIcon className={'color-black'}/>
                    : <FavoriteBorderIcon  className={'color-black'}/>
                }
            </IconButton>
            <div className={"like-indicator"}>{post.likes ? post.likes.length : 0}</div>
        </div>
    )
}

export default PostLikesIndicator;