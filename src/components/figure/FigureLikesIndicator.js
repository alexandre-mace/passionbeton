import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {IconButton} from "@material-ui/core";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axios from "axios";
import useIp from "../../hooks/useIp";
import {apiAddress} from "../../data/config/api";
import {useRecoilState} from "recoil";
import {figureSelector} from "../../data/selectors/figureSelector";

const FigureLikesIndicator = ({figure}) => {
    const ip = useIp();
    const [figureState, setFigureState] = useRecoilState(figureSelector(figure.id));

    const handleLike = (e, isLike) => {
        e.preventDefault();
        e.stopPropagation();

        axios.patch(apiAddress + '/figures/' + figure.id + '/' +(isLike ? 'like': 'dislike'), {
            'like': ip
        })
            .then(async function (response) {
                const figureResponse = await axios.get(apiAddress + '/figures/' + figure.id)
                setFigureState(figureResponse.data)
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
        <div className={"medias-indicator figure-likes"}>
            <div className={"like-indicator"}>{figure.likes ? figure.likes.length : 0}</div>
            <IconButton aria-label="like" className={"like-button"} name={'like'}  onClick={(e) => handleLike(e, !userAlreadyLikedComment(ip, figure.likes))}>
                {userAlreadyLikedComment(ip, figure.likes)
                    ? <FavoriteIcon className={'color-black'}/>
                    : <FavoriteBorderIcon  className={'color-black'}/>
                }
            </IconButton>
        </div>
    )
}

export default FigureLikesIndicator;