// Functions that talk to the server

function fetchFile(partialUrl)
{
  return fetch("http://localhost/multidag/data/" + partialUrl,
    {method: "get"});
}

function fetchJsonResponse(partialUrl)
{
  return new Promise((resolve, reject) => {
    return fetchFile(partialUrl)
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          console.log("Response not ok for json file " + partialUrl);
          console.log("Response is:");
          console.log(response);
          reject(response);
        }
      })
      .catch((reason) => {
        reject(reason);
      })
  })
}

function fetchAndParseJsonResponse(partialUrl) {
  return new Promise((resolve, reject) => {
    return fetchJsonResponse(partialUrl)
      .then((response) => {
        resolve(response.json());
      })
      .catch((reason) => {
        reject(reason);
      })
  })
}
