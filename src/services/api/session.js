function getSession(){
    const token = localStorage.getItem("session")
    return token?{Authorization: `Bearer ${token}`}:null;
}
function removeSession(){
    localStorage.removeItem("session");
}

function saveSession(token){
    localStorage.setItem("session", token);
}

export default {
    getSession,
    removeSession,
    saveSession
}