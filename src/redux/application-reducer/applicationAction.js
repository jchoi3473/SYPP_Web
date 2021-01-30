export const setApps = (apps) => ({
    type: 'SET_APPS',
    payload: apps
});  

export const requestApplication = () => (dispatch) => {
    dispatch({type: 'REQUEST_PROGRESS_PENDING'});
    fetch('http://saveyourappdevelopment.azurewebsites.net/mockdata/getapplications')
    .then(res => res.json())
    .then(data => dispatch({
        type: 'REQUEST_PROGRESS_SUCCESS',
        payload: data
    }))
    .catch(error => dispatch({
        type: 'REQUEST_PROGRESS_FAILED',
        payload: error
    }))
}

export const postApplication = (application) => (dispatch) =>{
    console.log("STRING"+JSON.stringify({application}))
    dispatch({type: 'POST_PROGRESS_PENDING'});
    fetch('http://localhost:3000/abc', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        application
      })
    })
    .then(response => response.json())
    .then(() => dispatch({
            type: 'POST_PROGRESS_SUCCESS',
        })
    ).then(requestApplication())
    .catch(error => dispatch({
        type: 'POST_PROGRESS_FAILED',
        payload: error
    }))
}
