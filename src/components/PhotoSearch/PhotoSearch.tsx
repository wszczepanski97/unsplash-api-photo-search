import { useState } from 'react';
import { createApi } from 'unsplash-js';
import { Basic } from 'unsplash-js/dist/methods/photos/types';

export default function PhotoSearch() {
    const [query, setQuery] = useState('');
    const [pics, setPics] = useState<Basic[]>([]);
    const unsplash = createApi({
        accessKey: "lATmaY-GcbVAD6wyAVfjb1NtposhkxQeA8rWvE3nVoE",
    });
    const searchPhotos = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const photos = await unsplash.search.getPhotos({query});
        setPics(photos.response!.results);
    };
    return (
        <>
            <form className="form" onSubmit={searchPhotos}>
                <label className="label" htmlFor="query">
                    {" "}
                    📷
                </label>
                <input
                    type="text"
                    name="query"
                    className="input"
                    placeholder={`Try "dog" or "apple"`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="button">
                    Search
                </button>
            </form>
            <div className="card-list">
            {pics.map((pic) => <div className="card" key={pic.id}>
            <img
                className="card--image"
                alt={pic.alt_description as string}
                src={pic.urls.full}
                width="50%"
                height="50%"
              ></img>
            </div> )}
      </div>
        </>
    );
}