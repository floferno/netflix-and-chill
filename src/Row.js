import React, { useState, useEffect } from 'react'
// import instance from './axios'
import axios from 'axios'

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([])
    const baseUrl = "https://api.themoviedb.org/3"
    const imgBaseUrl = "https://image.tmdb.org/t/p/original"
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`${baseUrl}${fetchUrl}`)
            setMovies(request.data.results)
            // console.log(request)
            return request
        }
        fetchData()
    }, [fetchUrl])


    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => {
                    return (
                        <img
                            key={movie.id}
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            src={`${imgBaseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.title}
                        />
                    )
                })
                }
            </div>
        </div>
    )
}

export default Row