// Functions that update the data we're holding in this browser

function updateAddVertexAndRedraw(partialUrl, subdirForVertices) {
  // Pass on to the array handling version
  var partialUrlArray = [];
  partialUrlArray[0] = partialUrl;
  updateAddVerticesAndRedraw(partialUrlArray, subdirForVertices);
}

// Specifying different values for subdirForVertices amounts to asking for a different multidag (directed acyclic graph) from the server
function updateAddLookupAndRedraw(hashOrAddress, subdirForVertices) {
  // Pass on to the array handling version
  var hashesAddressesArray = [];
  hashesAddressesArray[0] = hashOrAddress;
  updateAddLookupsAndRedraw(hashesAddressesArray, subdirForVertices);
}

function updateRemoveVertexAndRedraw(partialUrl) {
  delete vertices[partialUrl];
  renderAllAsDot();
}

// Specifying different values for subdirForVertices amounts to asking for a different multidag (directed acyclic graph) from the server
function updateAddVerticesAndRedraw(partialUrlArray, subdirForVertices) {
  recurseAddVertices(partialUrlArray, subdirForVertices)   // Gather the required data
    .then((nullvar)=>{
      renderAllAsDot();                 // Draw everything
    })
    .catch((reason) => {
    console.log("Could not updateAddVerticesAndRedraw()");
    console.log("Reason:");
    console.log(reason);
  });
}

// A recursive function that deals with the last item in the array, until there are none left
// For each vertex, reads the OPTIONAL files attributes.json, in.json, out.json.
// A missing file just results in an empty object and is perfectly useful and valid.
// A json file that does not parse is however an error.
// Specifying different values for subdirForVertices amounts to asking for a different multidag (directed acyclic graph) from the server
function recurseAddVertices(partialUrlArray, subdirForVertices) {
  var attr = null;
  var inLinks = null;
  var outLinks = null;

  return new Promise((resolve, reject) => {
    if (partialUrlArray.length == 0) {
      resolve(null);
    } else {
      var partialUrl = partialUrlArray.pop();
      var allowMissingFile = true;
      fetchAndParseJsonResponse(subdirForVertices + partialUrl + "/attributes.json", allowMissingFile)
        .then((jsonAttributes) => {
          // We have the JSON for the attributes
          attr = jsonAttributes;
          // Now fetch the inLinks
          return fetchAndParseJsonResponse(subdirForVertices + partialUrl + "/in.json", allowMissingFile);
        })
        .then((jsonInLinks) => {
          // We have the json for the inLinks
          inLinks = jsonInLinks;
          // Now fetch the outLinks
          return fetchAndParseJsonResponse(subdirForVertices + partialUrl + "/out.json", allowMissingFile);
        })
        .then((jsonOutLinks) => {
          // We have the json for the outLinks
          outLinks = jsonOutLinks;
          // We have received the valid json (or empty objects for missing files) for the three optional files
          // Now store what we've found
          vertices[partialUrl] = {attributes: attr, inPoints: inLinks, outPoints: outLinks};

          // Go on to continue with the slightly smaller array
          return recurseAddVertices(partialUrlArray, subdirForVertices);
        })
        .then((nullvar) => {
          resolve(null);
        })
        .catch((reason) => {
          console.log("Error parsing attributes.json, in.json or out.json for vertex " + partialUrl);
          console.log("Reason given:")
          console.log(reason);
          reject(reason);
        })
    }
  });
}

// Specifying different values for subdirForVertices amounts to asking for a different multidag (directed acyclic graph) from the server
function updateAddLookupsAndRedraw(hashesAddressesArray, subdirForVertices) {
  recurseAddLookups(hashesAddressesArray, subdirForVertices)   // Gather the required data
    .then((nullvar)=>{
      renderAllAsDot();                 // Draw everything
    })
    .catch((reason) => {
      console.log("Could not updateAddLookupsAndRedraw()");
      console.log("Reason:");
      console.log(reason);
    });
}

// A recursive function that deals with the last item in the array, until there are none left
// For each item, http lookup is performed to check if its a known address, block or transaction hash.
// If it is, loads the three associated json files adds the associated vertex.
// Specifying different values for subdirForVertices amounts to asking for a different multidag (directed acyclic graph) from the server
function recurseAddLookups(hashesAddressesArray, subdirForVertices) {
  var myUrl = null;
  var attr = null;
  var inLinks = null;
  var outLinks = null;

  return new Promise((resolve, reject) => {
    if (hashesAddressesArray.length == 0) {
      resolve(null);
    } else {
      var addressOrHash = hashesAddressesArray.pop();
      var allowMissingFile = true;
      fetchAndParseJsonResponse("lookup/" + addressOrHash + "/thingy.json", false)
        .then((url) => {
          myUrl = url.partialUrl;
          return myUrl;
        })
        .then((partialUrl) => {
          return fetchAndParseJsonResponse(subdirForVertices + partialUrl + "/attributes.json", allowMissingFile);
        })
        .then((jsonAttributes) => {
          // We have the JSON for the attributes
          attr = jsonAttributes;
          // Now fetch the inLinks
          return fetchAndParseJsonResponse(subdirForVertices + myUrl + "/in.json", allowMissingFile);
        })
        .then((jsonInLinks) => {
          // We have the json for the inLinks
          inLinks = jsonInLinks;
          // Now fetch the outLinks
          return fetchAndParseJsonResponse(subdirForVertices + myUrl + "/out.json", allowMissingFile);
        })
        .then((jsonOutLinks) => {
          // We have the json for the outLinks
          outLinks = jsonOutLinks;
          // We have received the valid json (or empty objects for missing files) for the three optional files
          // Now store what we've found
          vertices[myUrl] = {attributes: attr, inPoints: inLinks, outPoints: outLinks};

          // Go on to continue with the slightly smaller array
          return recurseAddVertices(hashesAddressesArray, subdirForVertices);
        })
        .then((nullvar) => {
          resolve(null);
        })
        .catch((reason) => {
          console.log("Error parsing attributes.json, in.json or out.json for vertex " + myUrl);
          console.log("Reason given:")
          console.log(reason);
          reject(reason);
        })
    }
  });
}

function updateTogggleVertexFlagAndRedraw(partialUrl) {
  if (vertices[partialUrl].hasOwnProperty('flagged')) {
    delete vertices[partialUrl].flagged;
  } else {
    vertices[partialUrl].flagged = true;
  }
  renderAllAsDot();
}
