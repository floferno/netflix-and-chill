import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")
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

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("")
        } else {
            movieTrailer(movie?.title || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search)
                    setTrailerUrl(urlParams.get('v'))
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => {
                    return (
                        <img
                            onClick={() => handleClick(movie)}
                            key={movie.id}
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            src={`${imgBaseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.title}
                        />
                    )
                })
                }
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row