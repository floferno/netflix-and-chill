import React, { useEffect, useState } from 'react'
import axios from 'axios'
import requests from './requests'

function Banner() {
    const baseUrl = "https://api.themoviedb.org/3"
    const [movie, setMovie] = useState([])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`${baseUrl}${requests.fetchNetflixOriginals}`)
            const random = Math.floor(Math.random() * request.data.results.length - 1)
            console.log(request)
            setMovie(request.data.results[random])
            return request
        }
        fetchData()
    }, [])

    function truncate(str, max) {
        return str?.length > max ? str.substr(0, max - 1) + '…' : str;
    }

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center center"
            }}>
            <div className="banner__contents">
                <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__desc">{truncate(movie?.overview, 150)}</h1>
            </div>

            <div className="banner--fadeBottom"></div>
        </header>
    )
}

export default Banner