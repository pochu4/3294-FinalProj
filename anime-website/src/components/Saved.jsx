import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Saved() {

    const [savedAnime, setSavedAnime] = useState(() => {

        const savedFavs = localStorage.getItem("favs");

        return savedFavs ? JSON.parse(savedFavs) : [];

    });

    useEffect(() => {

        const savedFavs = JSON.parse(localStorage.getItem("favs")) || [];


        fetch("https://api.jikan.moe/v4/anime")
            .then(response => response.json())
            .then(data => {

                const favAnime = data.data.filter(allAnime => savedFavs.includes(allAnime.mal_id));

                setSavedAnime(favAnime);

            })

    }, []);


    return (

        <div>
            <h1>This is your saved</h1>
            <ul>
                {savedAnime.map((anime) => (
                    <li key={anime.mal_id}>{anime.title}</li>
                ))}
            </ul>

            <Link to="/">Go to Home</Link>
        </div>

    )

}

export default Saved;