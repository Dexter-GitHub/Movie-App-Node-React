import React, { useEffect, useMemo, useState } from 'react'
import Axios from 'axios';
import { Button } from 'antd';

function Favorite(props) {
    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)    
    let variables = useMemo (() => ({
        userFrom: props.userFrom,
        movieId: props.movieId,
        movieTitle: props.movieInfo.title,
        moviePost: props.movieInfo.backdrop_path,
        movieRunTime: props.movieInfo.runtime,
    }), [props]);

    useEffect(() => {
        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber)
                }
                else {
                    alert('숫자 정보를 가져오는데 실패 했습니다.')
                }
            })

            Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.favorited)
                }
                else {
                    alert('정보를 가져오는데 실패 했습니다.')
                }
            })
    }, [variables])
    
    const onClickFavorite = () => {        
        if (Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(!Favorited);
                    }
                    else {
                        alert('Favorite 리스트에서 지우는 것을 실패했습니다.')
                    }
                })
        }
        else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1);
                        setFavorited(!Favorited);
                    }
                    else {
                        alert('Favorite 리스트에서 추가하는 것을 실패했습니다.')
                    }
                })
        }
    }

    return (
        <div>
        {props.userFrom &&
            <Button onClick={onClickFavorite}>{Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber} </Button>            
        }
        </div>
    )
}

export default Favorite
