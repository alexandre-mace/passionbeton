import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import axios from "axios";
import CommentLikesIndicator from "./CommentLikesIndicator";
import {apiAddress} from "../../data/config/api";
import {useRecoilState} from "recoil";
import {postSelector} from "../../data/selectors/postSelector";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: 60,
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0 20px 40px 0 rgba(41,41,211,.10)",
        borderRadius: 16
},
}));

const Comments = ({post}) => {
    const SENDING = 'SENDING'
    const SENT = 'SENT'
    const INITIAL = 'INITIAL'

    const classes = useStyles();
    const [postState, setPostState] = useRecoilState(postSelector(post.id));

    const [status, setStatus] = useState(INITIAL);
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [commentsShown, setCommentsShown] = useState(5);

    useEffect(() => {
        if (status === SENDING) {
            const data = {
                author: author,
                content: content
            };

            axios.post(apiAddress + '/comments/' + post.id, data)
                .then(async function (response) {
                    setStatus(SENT)
                    setContent('');
                    setAuthor('');
                    const postResponse = await axios.get(apiAddress + '/posts/' + post.id)
                    setPostState(postResponse.data)
                    setTimeout(() => {
                        setStatus(INITIAL)
                    }, 2000)
                    setTimeout(() => {
                        let postContainer = document.querySelector('.card-selected')
                        postContainer.scrollTo({
                            top: postContainer.scrollTop + 150,
                            behavior: "smooth"
                        });
                    },400)

                    // dispatchNotification(data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }, [status])

    return (
        <div className={"comment-section"}>
            {((post.comments && post.comments.length === 0) || !post.comments)  && <div className={"mb-4"}>Aucun commentaire.</div>}
            {post.comments && post.comments.length > 0 &&
            <List className={classes.root} aria-label="post comments">
                {[...post.comments].slice(0, commentsShown).map((comment, index) => (
                    <React.Fragment key={index}>
                        <ListItem className={"comment-item d-flex flex-column text-left align-items-start justify-content-start w-100"}>
                            <div className="d-flex justify-content-between w-100">
                                <div className={"comment-author"}>{comment.author}</div>
                                <CommentLikesIndicator comment={comment} post={post}/>
                            </div>
                            <div>{comment.content}</div>
                        </ListItem>
                        {(index + 1 !== commentsShown && !(post.comments.length < commentsShown && index + 1 === post.comments.length)) &&
                            <Divider />
                        }
                    </React.Fragment>
                ))}
            </List>
            }
            {post.comments.length - commentsShown > 0 &&
            <div className={"mt-3 mb-4 text-center"}>
                <button
                    className={`button`}
                    onClick={() => setCommentsShown((commentsShown + 5 > post.comments.length) ? post.comments.length : (commentsShown + 5))}
                >
                    Voir plus ({post.comments.length - commentsShown})
                </button>
            </div>
            }
            <div className={"my-3"}>
                <textarea style={{minHeight: '2rem'}} className={'w-100'} type="text" placeholder={"Votre message"} value={content} onChange={(event => setContent(event.target.value))}/>
                <div className={"my-2"}/>
                <div className={"d-flex justify-content-between"}>
                    <input className={"w-100"} type="text" placeholder={"Votre nom"} value={author} onChange={(event => setAuthor(event.target.value))}/>
                    <div className={"mr-2 ml-1"}/>
                    <button
                        className={`button submit-button ${status === SENDING && ' disabled'}`}
                        onClick={() => setStatus(SENDING)}
                    >
                        {status === INITIAL && 'Ajouter'}
                        {status === SENT && 'Ajouté'}
                        {status === SENDING && 'Ajout en cours'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Comments;