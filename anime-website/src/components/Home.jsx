import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../index.css';
import IonIcon from "@reacticons/ionicons";


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

        // Jikan REST API https link fortop anime
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

            <div className="bg-zinc-900 text-black">

                <div className="flex flex-col justify-center items-center">
                    <img className="max-w-96" src="../src/assets/pochita.png" alt="Pochita! Logo" />
                    <div className="flex justify-between w-10/12">
                        <Link to="/saved" className="bg-violet-500 rounded-lg text-white text-md font-semibold w-24 flex justify-center items-center">Bookmarks!</Link>
                        <div className="flex">
                            <input type="text" placeholder="Search an Anime!" value={searchTerm} onChange={(event) => { setSearchTerm(event.target.value) }} id="default-input" className="rounded-tl-lg rounded-bl-lg w-96 p-2" />
                            <button onClick={searchAnime} className="bg-violet-500 flex justify-center align-center p-2 rounded-tr-lg rounded-br-lg "><IonIcon name="search-outline" color="white" size="64px"></IonIcon></button>
                        </div>
                    </div>
                </div>

                <div className="w-10/12 mx-auto flex flex-col gap-6 my-8">
                    <h1 className="text-neutral-50 text-2xl md:text-3xl lg:text-4xl font-bold border-l-4 border-violet-500 pl-4">
                        Top Anime
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                        {/* Slice limits to how many is shown */}
                        {anime.slice(0, 15).map((anime) => (
                            <div key={anime.mal_id} className="rounded-xl overflow-hidden shadow-xl bg-white transform transition-transform duration-300 hover:scale-105">
                                <img className="w-full h-64 object-cover" src={anime.images.jpg.image_url} alt={anime.title} />
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{anime.title}</h2>

                                    <div className="flex justify-between items-center">
                                        <Link to={`/anime/${anime.mal_id}`} className="text-violet-500 hover:text-violet-700 text-sm font-semibold">
                                            View Details
                                        </Link>
                                        <button
                                            className="text-black font-medium rounded-lg text-sm py-2.5"
                                            onClick={() => { toggleFav(anime.mal_id) }}
                                            type="button"
                                        >
                                            {favs.includes(anime.mal_id) ? <IonIcon name="heart" size="32px" color="red" /> : <IonIcon name="heart-outline" size="32px" color="red"/>}
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