import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';

function LandingPage() {    
    const [Movies, setMovies] = useState([])
    const [MainMovieIamge, setMainMovieIamge] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)
    
    useEffect(() => {
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      fetchMovies(endpoint);
      /* 아래 주석은 Node 서버의 경고 표시를 삭제해 준다. */
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {                
                /* "..."을 사용하면 기존 배열을 수정하지 않고 새 배열을 만들 수 있다 
                 * 기존 배열의 불변성 유지 */
                setMovies([...Movies, ...response.results])    
                setMainMovieIamge(response.results[0])                
                setCurrentPage(response.page)
            })
    }

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint)
    }

    return (
        <div style={{ width: '100%', margin: '0' }}>
            {/* Main Image */}
            {MainMovieIamge && 
                <MainImage                     
                    image={`${IMAGE_BASE_URL}w1280${MainMovieIamge.backdrop_path}`}
                    title={MainMovieIamge.original_title}
                    text={MainMovieIamge.overview}
                />            
            }
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <h2>Movies by latest</h2>
                <hr />
                {/* Movie Grid Cards */}
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                landingPage
                                image={movie.poster_path ? 
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null }
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />                            
                        </React.Fragment>
                    ))}
                </Row>
            </div>            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={loadMoreItems}> Load More </button>
            </div>
        </div>
    )
}

export default LandingPage
