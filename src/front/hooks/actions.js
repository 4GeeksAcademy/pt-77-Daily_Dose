export const signup = async (dispatch, payload) => {
  try {
    let response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        password: payload.password,
      }),
    });

    let data = await response.json();

    if (response.ok) {
      dispatch({
        type: "set_user",
        payload: { user: data.user_id },
      });
    }

    if (response.ok) {
      console.log("Signup successful:", data);
    } else {
      throw new Error(data.msg || "Signup failed");
    }
  } catch (error) {
    console.error("Signup failed:", error.message);
    throw error; 
  }
};

export const login = async (dispatch, payload) => {
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      sessionStorage.setItem("access_token", data.access_token);
      dispatch({
        type: "set_user",
        payload: {
          user: data.user || null,
          access_token: data.access_token,
        },
      });
    } else {
      console.error("Login failed:", data);
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const getUser = async (dispatch, payload) => {
  let token = sessionStorage.getItem("access_token")
  try {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/private", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const data = await response.json();
    if (response.ok) {
      dispatch({
        type: "set_user",
        payload: {
          user: data.user,
          access_token: token,
        },
      });
    } else {
      console.error("Token rejected:", data);
    }
  } catch (error) {
    console.error("getUser failed:", error);
  }
};


export const logout = (dispatch) => {
  sessionStorage.removeItem("access_token");
  dispatch({
    type: "set_user",
    payload: { user: null, access_token: null },
  });
};

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export const fetchRecommendations = async (genre) => {
  const results = [];

  try {
    for (let page = 1; page <= 2; page++) {
      const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${genre}&type=movie&page=${page}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "True") {
        results.push(...data.Search);
      } else {
        console.warn(`OMDb API error (page ${page}):`, data.Error);
        break;
      }
    }

    return results.map((movie) => ({
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      type: movie.Type,
      imdbID: movie.imdbID
    }));
  } catch (error) {
    console.error("OMDb fetch error:", error);
    return [];
  }
};


export const fetchBooksByGenre = async (genre) => {
  try {
    const results = [];

    // Fetch two pages (0–9, 10–19)
    for (let startIndex of [0, 10]) {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=10&startIndex=${startIndex}`
      );
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const books = data.items.map((book) => {
          const volume = book.volumeInfo;
          return {
            title: volume.title || "Untitled",
            author: volume.authors?.join(", ") || "Unknown",
            image: volume.imageLinks?.thumbnail || "",
            type: "📚 Book",
            url:
              volume.infoLink ||
              `https://www.google.com/search?q=${encodeURIComponent(volume.title)}`
          };
        });
        results.push(...books);
      }
    }

    return results;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};


export const updateUser = async (dispatch, store, updatedUser) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/update_profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + store.access_token,
      },
      body: JSON.stringify(updatedUser),
    });

    if (res.ok) {
      dispatch({
        type: "set_user",
        payload: { user: updatedUser, access_token: store.access_token },
      });
      return true;
    } else {
      console.error("Failed to update profile");
      return false;
    }
  } catch (err) {
    console.error("Error updating:", err);
    return false;
  }
};

export const getSongsByGenre = async (genre) => {
  const url = `https://itunes.apple.com/search?term=${genre}&entity=song&limit=20`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return data.results.map((song) => ({
      trackId: song.trackId,
      trackName: song.trackName || "Untitled",
      artistName: song.artistName || "Unknown Artist",
      collectionName: song.collectionName || "Unknown Album",
      artworkUrl100: song.artworkUrl100 || "",
      previewUrl: song.previewUrl || "",
      trackViewUrl: song.trackViewUrl || "#",
      type: "music" 
    }));
  } catch (err) {
    console.error("Failed to fetch songs:", err);
    return [];
  }
};

