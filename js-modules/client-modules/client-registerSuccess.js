const messageBox = document.getElementById('message');
const link = document.getElementById('link');

function loaded() {

    
    console.log("test")
    const params = new URLSearchParams(window.location.search)

    document.getElementById('link').href = `/sign-in?email=${params.get("email")}`
    messageBox.innerHTML = `${params.get("state")} successfully registered with email ${params.get("email")} `;
}
//https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript