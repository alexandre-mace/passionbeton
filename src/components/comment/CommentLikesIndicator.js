import React, {useState} from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {IconButton} from "@material-ui/core";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axios from "axios";
import useIp from "../../hooks/useIp";
import {apiAddress} from "../../data/config/api";
import {useRecoilState} from "recoil";
import {postSelector} from "../../data/selectors/postSelector";

const CommentLikesIndicator = ({comment, post}) => {
    const ip = useIp();
    const [postState, setPostState] = useRecoilState(postSelector(post.id));

    const handleLike = (e, isLike) => {
        e.preventDefault();
        e.stopPropagation();

        axios.patch(apiAddress + '/comments/' + comment.id + '/' +(isLike ? 'like': 'dislike'), {
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

    const userAlreadyLikedComment = (ip, likes) => {
        if (!likes) {
            return false
        }
        return likes.includes(ip)
    }

    return (
        <div className={"medias-indicator comment-likes"}>
            <div className={"like-indicator"}>{comment.likes ? comment.likes.length : 0}</div>
            <IconButton aria-label="like" className={"like-button"} name={'like'}  onClick={(e) => handleLike(e, !userAlreadyLikedComment(ip, comment.likes))}>
                {userAlreadyLikedComment(ip, comment.likes)
                    ? <FavoriteIcon className={'color-black'}/>
                    : <FavoriteBorderIcon  className={'color-black'}/>
                }
            </IconButton>
        </div>
    )
}

export default CommentLikesIndicator;