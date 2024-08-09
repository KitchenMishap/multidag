// Functions that talk to the server

// Returns a promise
function fetchJsonFile(partialUrl) {
  return fetch(
    "http://localhost/multidag/data/" + partialUrl,
    {
      method: "get"
    }
  );
}
