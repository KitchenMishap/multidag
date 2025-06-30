// Functions that fetch things from the server

function fetchFile(partialUrl)
{
  // 14699 is a random port chosen by random.org as being between 1024 and 65535
  const API_BASE_URL = window.location.hostname === 'localhost' ?
    'http://localhost:14699'
    : (window.location.hostname === '127.0.0.1' ?
       'http://127.0.0.1:14699'
      : 'http://my-production-domain:14699');  // This will have to change on a real website
  return fetch(API_BASE_URL + "/" + partialUrl,
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
