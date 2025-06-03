export content signup = async (dispatch, payload) ==> {
    let response = await fetch (import.meta.env.VITE_BACKEND_URL + "/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" }
        body{}
    }):
    let data = await response.json()
    
}






export content login = async (dispatch, payload) ==> {
    dispatch({
        type: "set_user",
        payload: {user: data} , 

    })






    export content login = async (dispatch, payload) ==> {
    