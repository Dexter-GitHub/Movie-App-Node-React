import React, { useMemo, useState, useEffect } from 'react'
import { LikeOutlined, DislikeOutlined, LikeFilled, DislikeFilled} from '@ant-design/icons'
import Axios from 'axios'
import { Tooltip } from 'antd'

function LikeDislikes(props) {
    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [Dislikes, setDislikes] = useState(0)
    const [DislikeAction, setDislikeAction] = useState(null)
    let variable = useMemo(() => {
        return props.movie ? 
            { movieId: props.movieId, userId: props.userId } :
            {}
    }, [props])

    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                if (response.data.success) {                    
                    setLikes(response.data.likes.length)

                    response.data.likes.forEach(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                }
                else {
                    alert('Likes에 대한 정보를 가져오지 못했습니다.')
                }
            })

            Axios.post('/api/like/getDislikes', variable)
            .then(response => {
                if (response.data.success) {                    
                    setDislikes(response.data.dislikes.length)

                    response.data.dislikes.forEach(dislike => {
                        if (dislike.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })
                }
                else {
                    alert('Dislikes에 대한 정보를 가져오지 못했습니다.')
                }
            })
    }, [variable, props])
    

    const onLike = () => {
        if (LikeAction === null) {
            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes + 1);
                        setLikeAction('liked')

                        if (DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }
                    }
                    else {
                        alert('Like를 올리지 못하였습니다.')
                    }
                })
        }
        else {
            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    }
                    else {
                        alert('Like를 내리지 못하였습니다.')
                    }
                })
        }
    }

    const onDislike = () => {
        if (DislikeAction !== null) {
            Axios.post('/api/like/unDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)                        
                    }
                    else {
                        alert('Dislike를 내리지 못하였습니다.')
                    }
                })
        }
        else {
            Axios.post('/api/like/upDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')
                        
                        if (LikeAction !== null) {
                            setLikes(Likes - 1)
                            setLikeAction(null)
                        }
                    }
                    else {
                        alert('Dislike를 올리지 못하였습니다.')
                    }
                })
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span key='comment-basci-like'>
                <Tooltip title='Like'>
                    {LikeAction === 'liked' ?
                        (<LikeFilled onClick={onLike}/>) :
                        (<LikeOutlined onClick={onLike}/>) 
                    }
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Likes} </span>
            </span>            
            <span key='comment-basci-dislike' style={{ paddingLeft: '10px' }}>
                <Tooltip title='Dislike'>
                    {DislikeAction === 'disliked' ?
                        (<DislikeFilled onClick={onDislike}/>) :
                        (<DislikeOutlined onClick={onDislike}/>)
                    }
                </Tooltip>                
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Dislikes} </span>
            </span>
        </div>
    )
}

export default LikeDislikes
