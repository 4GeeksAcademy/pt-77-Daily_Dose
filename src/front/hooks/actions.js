export const signup = async (dispatch, payload) => {
  try {
    let response = await fetch(import.meta.env.VITE_BACKEND_URL + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
          user: data.user,
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

export const getUser = async (dispatch, token) => {
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

