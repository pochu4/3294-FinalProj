import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import IonIcon from "@reacticons/ionicons";

function AnimeDetails() {

    const { id } = useParams();

    const [anime, setAnime] = useState(null);

    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        // Jikan REST API https link for animes by id!
        fetch(`https://api.jikan.moe/v4/anime/${id}`)
            // Turn response intro json
            .then(response => response.json())
            // same thing as the home.jsx, gets the jikan data from within the data object defined in json
            .then(dataObj => setAnime(dataObj.data));
    }, [id]);

    // Fetch Characters - Different https://
    useEffect(() => {
        fetch(`https://api.jikan.moe/v4/anime/${id}/characters`)
            .then((response) => response.json())
            .then((dataObj) => setCharacters(dataObj.data));
    }, [id]);

    if (!anime) {
        return <div>Loading..</div>
    }

    return (
        // Based off the api's structuring, data is followed by the name (title, mal_id, status, episodes, etc.)
        <div className="bg-zinc-900 text-white">

            <div className="w-10/12 mx-auto py-8">

                <Link to="/">
                    <div className="flex">
                        <IonIcon name="chevron-back-outline" size="24px" />
                        <h1 className="text-xl">Go Back</h1>
                    </div>
                </Link>

                <div className="md:flex md:justify-between mt-8 gap-12">
                    <div className="w-full max-w-96">
                        <img src={anime.images.jpg.image_url} alt={anime.title} className="w-full h-auto object-cover" />
                    </div>
                    <div className="">
                        <h1 className="text-3xl font-medium">{anime.title}</h1>
                        <div className="flex mt-4 gap-4">
                            <p className="text-lg bg-gradient-to-r from-purple-800 to-blue-800 p-4 rounded-xl bg-purple-300">{anime.status}</p>
                            <p className="text-lg bg-gradient-to-r from-purple-800 to-blue-800 p-4 rounded-xl">{anime.episodes} Episodes</p>
                            <div className="flex justify-center items-center bg-gradient-to-r from-purple-800 to-blue-800 p-4 rounded-xl gap-2">
                                <IonIcon name="star"></IonIcon>
                                <p className="text-lg ">{anime.score}</p>
                            </div>
                            <p className="text-lg bg-gradient-to-r from-purple-800 to-blue-800 p-4 rounded-xl">{anime.duration}</p>
                        </div>
                        <p className="my-8">{anime.synopsis}</p>
                        {anime.genres.map((genre) => (
                            // Key for map
                            <span key={genre.mal_id} className="mr-2 border mt-4 border-purple-800 p-4 bg-zinc-900 rounded-lg">
                                {genre.name}
                            </span>
                        ))}
                    </div>
                </div>

            </div>

            <div className="w-10/12 mx-auto">
                <h1 className="text-neutral-50 text-2xl md:text-3xl lg:text-4xl font-bold border-l-4 border-violet-500 pl-4">
                    Characters
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {characters.map((character) => (
                        <div key={character.character.mal_id} className="border p-4 m-4">
                            <img className="w-full h-48 object-cover rounded-lg"
                                src={character.character.images.jpg.image_url}
                                alt={character.character.name}
                            />
                            <p className="text-lg font-bold mt-2">{character.character.name}</p>
                            <p className="text-sm text-white">Role: {character.role}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>

        //     <Link to="/">
        //         <div className="flex">
        //             <IonIcon name="chevron-back-outline" color="black" size="24px" />
        //             <h1>Go Back</h1>
        //         </div>
        //     </Link>
        //    <h1>{anime.title}</h1>
        //     <img src={anime.images.jpg.image_url} alt={anime.title} />
        //     <p>{anime.status}</p>
        //     <p>{anime.status}</p>

    )

}

export default AnimeDetails;