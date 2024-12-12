import React, { useEffect, useState} from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import { useParams } from 'react-router-dom'
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import Favorite from './Sections/Favorite';
import LikeDislikes from './Sections/LikeDislikes';
import Comment from './Sections/Comment';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';
import Axios from 'axios';

function MovieDetail() {
    const { movieId } = useParams();
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [Comments, setComments] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    
    useEffect(() => {     
        const variable = { movieId }   
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {                                
                setMovie(response)
            })

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {                
                setCasts(response.cast)
            })

        Axios.post('/api/comment/getComments', variable)
            .then(response => {
                if (response.data.success) {                    
                    setComments(response.data.comments)
                }
            })
            .catch(error => {
                alert('코멘트 정보를 가져오는 것을 실패 하였습니다.')
            })
    }, [movieId])

    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment));
    }
    
    const toggleAcotrView = () => {
        setActorToggle(!ActorToggle)
    }

    return (
        <div>
            {/* Header */}
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={Movie.original_title}
                text={Movie.overview}
            />
            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite 
                        movieInfo={Movie}
                        movieId={movieId}
                        userFrom={localStorage.getItem('userId')}
                    />
                </div>

                {/* Movie Info */}
                <MovieInfo movie={Movie}/>
                <br />
                {/* Actors Grid */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleAcotrView}> Toggle Actor View </button>
                </div>
                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                {cast.profile_path && 
                                    <GridCards 
                                        image={cast.profile_path ?
                                            `${IMAGE_BASE_URL}w500${cast.profile_path}` : null }                                
                                        characterName={cast.name}
                                    />                            
                                }
                            </React.Fragment>
                        ))}
                    </Row>
                }
                <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0'}}>
                    <LikeDislikes 
                        movie
                        userId={localStorage.getItem('userId')}
                        movieId={movieId}
                    />
                </div>
                <h2>Share yout opinions about {Movie.original_title}</h2>
                <hr />
                <Comment 
                    refreshFunction = {refreshFunction}
                    commentLists={Comments}
                    movieId={movieId}
                />
            </div>
        </div>
    )
}

export default MovieDetail
