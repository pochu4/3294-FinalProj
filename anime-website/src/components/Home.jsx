import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../index.css';

import Hero from "./HeroSection";
import TopAnime from "./TopAnime";

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
            <div className="bg-gray-800 text-white">
                <input type="text"
                    placeholder="Search an Anime!"
                    value={searchTerm}
                    // Everytime it changes it changes the searchTerm
                    onChange={(event) => { setSearchTerm(event.target.value) }}
                />
                <button onClick={searchAnime}>Search</button>

                <Link to="/saved">Go to Your Favorites</Link>

                <Hero />

                <div className="w-11/12 mx-auto flex flex-col gap-6 my-8">
                    <h1 className="text-neutral-50 text-2xl md:text-3xl lg:text-4xl font-bold border-l-4 border-violet-500 pl-4">
                        Top Anime
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {anime.map((anime) => (
                            <div key={anime.mal_id} className="rounded-xl overflow-hidden shadow-xl bg-white transform transition-transform duration-300 hover:scale-105">
                                <img className="w-full h-64 object-cover" src={anime.images.jpg.image_url} alt={anime.title} />
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{anime.title}</h2>
                                    <p className="text-gray-700 text-sm mb-4">
                                        {anime.synopsis.length > 100 ? `${anime.synopsis.substring(0, 100)}...` : anime.synopsis}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <Link to={`/anime/${anime.mal_id}`} className="text-blue-500 hover:text-blue-700 text-sm font-semibold">
                                            View Details
                                        </Link>
                                        <button
                                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-200"
                                            onClick={() => { toggleFav(anime.mal_id) }}
                                            type="button"
                                        >
                                            {favs.includes(anime.mal_id) ? "Remove" : "Add to Favourites"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </>
    )
}

export default Home;