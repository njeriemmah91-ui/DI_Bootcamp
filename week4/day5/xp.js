async function fetchData(url, errorMessage) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(errorMessage + " " + response.status);
  }

  return await response.json();
}

async function runAll() {
  try {
    // Exercise 1: Hilarious GIFs
    const gifs1 = await fetchData(
      "https://api.giphy.com/v1/gifs/search?q=hilarious&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My",
      "Giphy Exercise 1 Error:"
    );
    console.log("Hilarious GIFs:", gifs1);

    // Exercise 2: Sun GIFs (10 results, offset 2)
    const gifs2 = await fetchData(
      "https://api.giphy.com/v1/gifs/search?q=sun&limit=10&offset=2&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My",
      "Giphy Exercise 2 Error:"
    );
    console.log("Sun GIFs:", gifs2);

    // Exercise 3: Star Wars API
    const starship = await fetchData(
      "https://www.swapi.tech/api/starships/9/",
      "SWAPI Error:"
    );
    console.log("Starship:", starship.result);

  } catch (error) {
    console.log("Something went wrong:", error.message);
  }
}

runAll();