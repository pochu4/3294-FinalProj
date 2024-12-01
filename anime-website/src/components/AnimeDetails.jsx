import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function AnimeDetails() {

    const { id } = useParams();
    const [anime, setAnime] = useState(null)

    useEffect(() => {
        // Jikan REST API https link for animes by id!
        fetch(`https://api.jikan.moe/v4/anime/${id}`)
            // Turn response intro json
            .then(response => response.json())
            // same thing as the home.jsx, gets the jikan data from within the data object defined in json
            .then(dataObj => setAnime(dataObj.data));
    }, []);

    if (!anime) {
        return <div>Loading..</div>
    }

    return (
        <>
            <Link to="/">Return to List</Link>
            <h1>{anime.title}</h1>
            <img src={anime.images.jpg.image_url} alt={anime.title} />
            <p>{anime.status}</p>
            <p>{anime.synopsis}</p>
        </>
    )

}

export default AnimeDetails;