async function getRandomGif() {
  try {
    const response = await fetch(
      "https://api.giphy.com/v1/gifs/search?q=funny&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
    );

    if (!response.ok) {
      throw new Error("Giphy Error: " + response.status);
    }

    const data = await response.json();

    const gifs = data.data;
    const randomIndex = Math.floor(Math.random() * gifs.length);
    const gifUrl = gifs[randomIndex].images.original.url;

    const img = document.createElement("img");
    img.src = gifUrl;
    document.body.appendChild(img);

  } catch (error) {
    console.log("GIF Error:", error);
  }
}

async function getData() {
  const urls = [
    "https://jsonplaceholder.typicode.com/users",
    "https://jsonplaceholder.typicode.com/posts",
    "https://jsonplaceholder.typicode.com/albums"
  ];

  try {
    const [users, posts, albums] = await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Fetch Error: " + response.status);
        }

        return await response.json();
      })
    );

    console.log("Users:", users);
    console.log("Posts:", posts);
    console.log("Albums:", albums);

  } catch (error) {
    console.log("ooooooops");
  }
}

// Run both functions
getRandomGif();
getData();