import React from "react";
import { Link } from "react-router-dom";

const TopAnime = ({ anime, favs, toggleFav }) => {
    return (
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
    );
};

export default TopAnime;