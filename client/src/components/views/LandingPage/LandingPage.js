import { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';

function LandingPage() {
    const [Movies, setMovies] = useState([])
    const [MainMovieIamge, setMainMovieIamge] = useState(null)

    useEffect(() => {
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

      fetch(endpoint)
        .then(response => response.json())
        .then(response => {
            console.log(response.results);
            setMovies([response.results])
            setMainMovieIamge(response.results[0])
        })
    }, [])

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
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button> Load More </button>
            </div>
        </div>
    )
}

export default LandingPage
