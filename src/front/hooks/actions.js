export const signup = async (dispatch, payload) => {
  try {
    let response = await fetch(import.meta.env.VITE_BACKEND_URL + "/signup", {
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
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/login", {
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
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/private", {
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
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${genre}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      return data.Search.map(movie => ({
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
        type: movie.Type
      }));
    } else {
      console.warn("OMDb API error:", data.Error);
      return [];
    }
  } catch (error) {
    console.error("OMDb fetch error:", error);
    return [];
  }
};



export const fetchBooksByGenre = async (genre) => {
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}`);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      return data.items.slice(0, 5).map((book) => {
        const volume = book.volumeInfo;
        return {
          title: volume.title || "Untitled",
          author: volume.authors?.join(", ") || "Unknown",
          image: volume.imageLinks?.thumbnail || "", 
          type: "book",
        };
      });
    } else {
      console.warn("No books found for this genre.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

