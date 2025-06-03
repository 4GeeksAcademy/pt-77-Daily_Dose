export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],
    user: null,
    access_token: sessionStorage.getItem("access_token") || null,
    favorites: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    //   case 'set_user':
    // return {
    //   ...store,
    //   user: action.payload.userId,
    // };

    case "set_user":
      const { user, access_token } = action.payload;
      if (typeof access_token == undefined) {
        sessionStorage.setItem("token", access_token);
      }

      return {
        ...store,
        user: user,
        access_token: access_token,
      };

    case "add_favorite":
      const newFavorites = [...store.favorites, action.payload];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return {
        ...store,
        favorites: newFavorites,
      };

    case "remove_favorite":
      const updatedFavorites = store.favorites.filter(
        (fav, index) => index !== action.payload
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return {
        ...store,
        favorites: updatedFavorites,
      };

    case "load_favorites":
      return {
        ...store,
        favorites: action.payload,
      };

    default:
      throw Error("Unknown action.");
  }
}
