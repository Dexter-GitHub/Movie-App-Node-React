import React from 'react'
import { Descriptions } from 'antd'

function MovieInfo(props) {
    let { movie } = props;

    return (
        <Descriptions title="Movie Info" bordered column={{
            xs: 1,  // 화면이 매우 작을 때 열 1개
            sm: 2,  // 화면이 작을 때 열 2개
            md: 2,  // 화면이 중간 크기일 때 열 3개
            lg: 3,  // 화면이 클 때 열 4개
        }}>
            <Descriptions.Item label="Title">{movie.original_title}</Descriptions.Item>
            <Descriptions.Item label="release_date">{movie.release_date}</Descriptions.Item>
            <Descriptions.Item label="revenue">{movie.revenue}</Descriptions.Item>
            <Descriptions.Item label="runtime">{movie.runtime}</Descriptions.Item>
            <Descriptions.Item label="vote_average" span={{
                xs: 1, 
                sm: 2, 
                md: 2, 
                lg: 2,
            }}>
                {movie.vote_average}
            </Descriptions.Item>
            <Descriptions.Item label="vote_count">{movie.vote_count}</Descriptions.Item>
            <Descriptions.Item label="status">{movie.status}</Descriptions.Item>
            <Descriptions.Item label="popularity">{movie.popularity}</Descriptions.Item>
        </Descriptions>
    )
}

export default MovieInfo
