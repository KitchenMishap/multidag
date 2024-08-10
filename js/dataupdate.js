function updateAddVertexAndRedraw(partialUrl) {
  // Online for a vertex, we have attributes and links to describe it
  var attr = null;
  var lnk = null;

  fetchAndParseJsonResponse("vertices/" + partialUrl + "/attributes.json")
    .then((jsonAttributes) => {
      // We have the JSON for the attributes
      attr = jsonAttributes;
      // Now fetch the links
      return fetchAndParseJsonResponse("vertices/" + partialUrl + "/links.json");
    })
    .then((jsonLinks) => {
      // We have received the valid json for attributes AND links
      lnk = jsonLinks;
      // Now display it all
      vertices[partialUrl] = {attributes: attr, links: lnk};
      renderAllAsDot();
    })
    .catch( (reason)=> {
      console.log("There was an error fetching or parsing the attributes.json or links.json file for vertex " + partialUrl);
      console.log("Error:");
      console.log(reason);
      // Render the error in-place on the graph
      vertices[partialUrl] = {attributes: {"Error:":"Whilst fetching or parsing vertex info"}, links: {}};
      renderAllAsDot();
    });
}

function updateRemoveVertexAndRedraw(partialUrl) {
  delete vertices[partialUrl];
  renderAllAsDot();
}

function updateAddVerticesAndRedraw(partialUrlArray) {
  recurseAddVertices(partialUrlArray)   // Gather the required data
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
function recurseAddVertices(partialUrlArray) {
  var attr = null;
  var lnk = null;

  return new Promise((resolve, reject) => {
    if (partialUrlArray.length == 0) {
      resolve(null);
    } else {
      var partialUrl = partialUrlArray.pop();
      fetchAndParseJsonResponse("vertices/" + partialUrl + "/attributes.json")
        .then((jsonAttributes) => {
          // We have the JSON for the attributes
          attr = jsonAttributes;
          // Now fetch the links
          return fetchAndParseJsonResponse("vertices/" + partialUrl + "/links.json");
        })
        .then((jsonLinks) => {
          // We have received the valid json for attributes AND links (for one entry)
          lnk = jsonLinks;
          // Now store what we've found
          vertices[partialUrl] = {attributes: attr, links: lnk};
          // Go on to continue with the slightly smaller array
          return recurseAddVertices(partialUrlArray);
        })
        .then((nullvar) => {
          resolve(null);
        })
        .catch((reason) => {
          console.log("Error fetching or parsing attributes.json or links.json for vertex " + partialUrl);
          console.log("Reason given:")
          console.log(reason);
          reject(reason);
        })
    }
  });
}
