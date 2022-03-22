document.onload = () => {

    const messageBox = document.getElementById('message');

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      console.log(params.state)

    messageBox.innerHTML = ` ${params.state} successfully registered with email ${params.email} `;
}
//https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript