function updateAddVertex(partialUrl) {
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
