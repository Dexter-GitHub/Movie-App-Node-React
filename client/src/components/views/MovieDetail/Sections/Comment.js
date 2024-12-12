import Axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

function Comment(props) {
    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    const [commentValue, setcommentValue] = useState("")
    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault(); /* 새로고침 방지 */        
        if (user.userData.isAuth) {
            if (commentValue !== "") {
                const variables = {
                    content: commentValue,
                    writer: user.userData._id,
                    movieId: props.movieId
                }        
                
                Axios.post('/api/comment/saveComment', variables)
                    .then(response => {
                        if (response.data.success) {                    
                            setcommentValue("");
                            props.refreshFunction(response.data.result);
                        }  
                    })
                    .catch(error => {
                        alert(' 커멘트를 저장하지 못했습니다.');
                    })
            }
        }
        else {
            navigate('/login')                 
        }
    }

    return (        
        <div>
            {/* Comment Lists */}
            {props.commentLists.length === 0 ? 
                (<div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0'}}>
                    Be the first one who shares your thoughts about this movie
                </div>):
                (props.commentLists.map((comment, index) => (
                    (!comment.responseTo &&
                        <React.Fragment key={comment._id || index}>
                            <SingleComment 
                                refreshFunction= {props.refreshFunction}
                                comment= {comment}
                                movieId= {props.movieId}
                            />
                            <ReplyComment
                                refreshFunction= {props.refreshFunction}
                                parentCommentId= {comment._id}
                                movieId= {props.movieId}
                                commentLists= {props.commentLists}
                            />
                        </React.Fragment>
                    )
                ))) 
            }
            {/* Root Comment Form */}
            <form style={{ display: 'flex', marginTop: '30px' }} onSubmit={onSubmit}>
                <textarea 
                    style={{ width: '100%', borderRadius: '5px' }}
                    placeholder='write some comments'
                    onChange={handleClick}
                    value={commentValue}
                />                
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Comment
