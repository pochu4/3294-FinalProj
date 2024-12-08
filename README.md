JIKAN API - https://jikan.moe/


# Final Project - MDIA 3294 - Johann Chua

This is my final project for MDIA 3294 where I create a 3-page React.js application that queries an API, displays a single result page, and allows users to save results.

I chose to use the JIKAN API - https://jikan.moe/ which is a database for anime and manga. 

In the simple 3 page website I created using react, Users will be able to browse the homepage for top animes (based off My Anime List), make searches for an anime, and save them. 

## Setup
### Project Creation
```bash
npx create-vite@latest assignment2-JohannC --template react
cd assignment2-JohannC
npm run dev
```
### Tailwind
```bash 
npm install tailwindcss@latest postcss@latest autoprefixer@latest --save,
"./src/**/*.{js,ts,jsx,tsx}" #Into the tailwind config file
@tailwind base, @tailwind components, @tailwind utilities #Into index.css
```

### React Router
```bash 
npm install react-router-dom --save
```

## Features
### Homepage
- Search Bar
- View Saved Button
- Top animes from Jikan API w/ title of show and button to view more

### Bookmarks page
- Showcases saved animes made by the users and is saved into local storage

### Detail Page
- Anime Title, Statues, # of episodes, rating, duration per ep
- Genre, Characters, and the show's synopsis

### Problems

I want to display the top animes but when creating the search, I used the fetch request for ALL animes, which causes problems when adding them to favs, It will either show only the top animes saved or all the animes excluding top animes that were saved, needed to be saved by the id 
EDIT: By saving each by its own mal_id i was able to save any even when the main page shows only the "top" anime results
