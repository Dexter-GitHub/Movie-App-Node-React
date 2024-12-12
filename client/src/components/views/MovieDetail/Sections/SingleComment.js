import React, { useState } from 'react'
import { Avatar } from 'antd'
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import LikeDislikes from './LikeDislikes';
import Axios from 'axios';

function SingleComment(props) {
    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")
    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }

    const onHandleChange = (event) => {
        setCommentValue(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (user.userData.isAuth) {
            if (CommentValue !== "") {
                const varibles = {
                    content: CommentValue,
                    writer: user.userData._id,
                    movieId: props.movieId,
                    responseTo: props.comment._id
                }

                Axios.post('/api/comment/saveComment', varibles)
                    .then(response => {
                        if (response.data.success) {
                            console.log(response.data.result)
                            setCommentValue("")
                            setOpenReply(false)
                            props.refreshFunction(response.data.result)
                        }
                    })
                    .catch (error => {
                        alert('코멘트를 저장하지 못했습니다.')
                        console.error(error)
                    }) 
            }
        }
        else {
            navigate('/login')
        }
    }

    const actions = [
        <LikeDislikes 
            userId={localStorage.getItem('userId')}
            commentId={props.comment._id}
            key={`like-dislike-${props.comment._id}`}
        />,
        <span onClick={onClickReplyOpen} 
            style={{ marginLeft: '1rem', cursor: "pointer" }}
            key="comment-basic-reply-to">
            Reply to 
        </span>
    ];

    return (
        <div>
            <div style={{ display: 'flex', alignItems: "center", marginTop: "15px"}}>
                <Avatar src={props.comment.writer.image} alt="User Avatar" style={{ marginBottom: "25px"}}/>
                <div style={{ marginTop: "5px", marginLeft: "10px" }}>
                    <span style={{ marginBottom: "8px", fontWeight: "bold", color: "#808080" }}>
                        {props.comment.writer.name}
                    </span>
                    <p style={{ marginTop: "5px", marginLeft: "5px" }}>
                        {props.comment.content}
                    </p>
                </div>
            </div>
            <div style={{ marginLeft: '50px' }}>
                {actions}
            </div>
            {OpenReply &&
                <form style={{ display: 'flex', margin: '10px 0' }} onSubmit={onSubmit}>
                    <textarea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onHandleChange}
                        value={CommentValue}
                        placeholder='write some comments'
                    />
                    <br />
                    <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
                        Submit
                    </button>
                </form>
            }
        </div>
    )
}

export default SingleComment
