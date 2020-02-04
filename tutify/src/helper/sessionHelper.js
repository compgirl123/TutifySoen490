export function sessionLogout(err) {   
    console.error("An error occured while checking the current session: "+err)
    console.log("Inside sessionLogout")
    localStorage.clear();
    window.location.reload(); 
}