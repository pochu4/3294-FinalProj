import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Ensure you import useParams for route parameters

function Hero() {
  const { id } = useParams();  // You may want to dynamically fetch anime based on the `id` parameter
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    // Jikan REST API https link for animes by id!
    fetch(`https://api.jikan.moe/v4/anime/40028`)
    // Turn response intro json
      .then(response => response.json())
      // same thing as the home.jsx, gets the jikan data from within the data object defined in json
      .then(dataObj => setAnime(dataObj.data));
  }, [id]);

  if (!anime) {
    return <div>Loading..</div>;
  }


  return (
    <div className="h-20 bg-blue-200">
        div.
    </div>
  );
}

export default Hero;
