// Functions that talk to the server

function fetchFile(partialUrl)
{
  return fetch("http://localhost/multidag/data/" + partialUrl,
    {method: "get"});
}

// If allowMissingFile is true, a missing file will result in a resolved promise returning null
function fetchJsonResponse(partialUrl, allowMissingFile)
{
  return new Promise((resolve, reject) => {
    return fetchFile(partialUrl)
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          if( allowMissingFile ) {
            resolve(null);
          } else {
            console.log("fetchJsonResponse(): Response not ok for json file " + partialUrl);
            console.log("(allowMissingFile specified as false)");
            console.log("Response is:");
            console.log(response);
            reject(response);
          }
        }
      })
      .catch((reason) => {
        reject(reason);
      })
  })
}

function fetchAndParseJsonResponse(partialUrl, allowMissingFile) {
  return new Promise((resolve, reject) => {
    return fetchJsonResponse(partialUrl, allowMissingFile)
      .then((response) => {
        if(response==null) {
          resolve({});    // A missing file results in an empty object
        } else {
          resolve(response.json());
        }
      })
      .catch((reason) => {
        reject(reason);
      })
  })
}
