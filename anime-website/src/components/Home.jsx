import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {

    const [anime, setAnime] = useState([]);

    const [searchTerm, setSearchTerm] = useState("")

    const [favs, setFavs] = useState(() => {

        const savedFavs = localStorage.getItem("favs");

        return savedFavs ? JSON.parse(savedFavs) : [];
    })

    // Search Function
    const searchAnime = () => {

        // Instead of using the looping through function for the search queries, I wanted to be able to search for anime that is outside of the fetched data for top anime
        fetch(`https://api.jikan.moe/v4/anime?q=${searchTerm}`)
            .then(response => response.json())
            .then(dataObj => {
                // ~56 minutes in the class recording
                // const filteredAnimes = dataObj.filter((loopAnime) => {

                //     return loopAnime.title.toLowerCase().includes(searchTerm.toLowerCase())

                // });

                // Updates the current state of dataObj with the new search query made by user
                setAnime(dataObj.data);

            })
            .catch((error) => {
                console.log("Error Fetching Anime Data", error);
            });

    };

    const toggleFav = (animeID) => {
        // If animeID already included, remove
        if (favs.includes(animeID)) {


            const filteredAnimes = favs.filter(favId => favId !== animeID);
            setFavs(filteredAnimes);
            localStorage.setItem("favs", JSON.stringify(filteredAnimes));
        } else {


            // If not add
            const updatedFavs = [...favs, animeID];
            setFavs(updatedFavs);
            localStorage.setItem("favs", JSON.stringify(updatedFavs));
        }

    };


    useEffect(() => {

        // Jikan REST API https link for top animes 
        fetch("https://api.jikan.moe/v4/top/anime")
            // When response is sent, turn the response into json
            .then((response) => {
                return response.json();
            })
            // gets data array and sets it into dataObj(state)
            .then((dataObj) => {
                // Jikan structures its responses with a "data" object in the JSON that contains the animes details   
                setAnime(dataObj.data);
            })
            // catch error if an error is returned above.
            .catch((error) => {
                console.log("Error Fetching Anime Data"), error;
            });

    }, [])

    return (
        <>
            <h1>Anime App</h1>
            <input type="text"
                placeholder="Search an Anime!"
                value={searchTerm}
                // Everytime it changes it changes the searchTerm
                onChange={(event) => { setSearchTerm(event.target.value) }}
            />
            <button onClick={searchAnime}>Search</button>

            <Link to="/saved">Go to Your Favorites</Link>


            {anime.map((anime) => (

                <div key={anime.mal_id}>
                    <Link to={`/anime/${anime.mal_id}`}>{anime.title}</Link>
                    
                    <button onClick={() => { toggleFav(anime.mal_id) }}>{favs.includes(anime.mal_id) ? "Remove" : "Add to Favourites"}</button>

                </div>

            ))}

        </>
    )
}

export default Home;