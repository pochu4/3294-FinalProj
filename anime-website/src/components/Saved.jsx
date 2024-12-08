import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import IonIcon from "@reacticons/ionicons";

function Saved() {


    const [savedAnime, setSavedAnime] = useState([]);

    useEffect(() => {
        // Get saved anime IDs from localStorage
        const savedFavs = JSON.parse(localStorage.getItem("favs")) || [];

        // fetch only the saved data (id)
        const fetchSavedAnime = async () => {
            try {
                const animePromises = savedFavs.map((id) =>
                    fetch(`https://api.jikan.moe/v4/anime/${id}`)
                        .then((response) => response.json())
                        .then((dataObj) => dataObj.data)
                );

                const animeData = await Promise.all(animePromises);
                setSavedAnime(animeData);
            } catch (error) {
                console.error("Failed to fetch saved anime:", error);
            }
        };

        fetchSavedAnime();
    }, []);


return (

    <div className="bg-zinc-900 text-white">

        <div className="w-10/12 mx-auto py-8">

            <img src="../src/assets/pochita.png" alt="Pochita Chainsaw man" className="mx-auto max-w-96"/>

            <Link to="/">
                <div className="flex">
                    <IonIcon name="chevron-back-outline" size="24px" />
                    <h1 className="text-xl">Back To Home</h1>
                </div>
            </Link>

            <h1 className="text-neutral-50 text-2xl md:text-3xl lg:text-4xl font-bold border-l-4 border-violet-500 pl-4 my-12">
                Your Saved Anime
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {savedAnime.map((anime) => (
                    <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id} className="rounded-xl overflow-hidden shadow-xl bg-white transform transition-transform duration-300 hover:scale-105">
                        <img className="w-full h-64 object-cover" src={anime.images.jpg.image_url} alt={anime.title} />
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">{anime.title}</h2>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    </div>


)

}

export default Saved;