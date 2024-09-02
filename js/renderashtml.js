// Functions that render things as html text (typically for inclusion within dot graph language)

function renderJsonObjectAsHtml(json) {
  htmlResult = '<table>'
  for([k,v] of Object.entries(json)) {
    htmlResult += '<tr><th>' + sanitizeHTML(k) + ':</th><td>' + sanitizeHTML(v) + '</td></tr>'
  }
  htmlResult += '</table>';
  return htmlResult;
}

function renderVertexAsHtml(vertex, attributes, inPoints, outPoints) {
  var htmlResult = '';
  htmlResult += "<div class='" + vertexClass(vertex) + "'>";

  // inPoint buttons at the top
  var outLinks = false;
  if( inPoints.hasOwnProperty("multi") ){
    htmlResult += renderLinkButtonsMulti(vertex, inPoints.multi, outLinks);
  }
  if( inPoints.hasOwnProperty("single") ){
    htmlResult += renderLinkButtonsSingle(vertex, inPoints.single, outLinks);
  }
  htmlResult += renderVertexJsonLink(vertex, "in.json")

  // Title with X button
  var removeAction = "removeVertex('" + vertex + "')";
  buttonHtml = "<button type='button' onclick=" + removeAction + ">X</button>";
  htmlResult += "<h3 class='title'>" + vertexTitle(vertex) + "&nbsp;&nbsp;" + buttonHtml + "</h3>";

  // Attributes
  htmlResult += renderVertexJsonLink(vertex, "attributes.json")
  htmlResult += '<table>'
  for([k,v] of Object.entries(attributes)) {
    htmlResult += '<tr><th>' + sanitizeHTML(k) + ':</th><td>' + sanitizeHTML(v) + '</td></tr>'
  }
  htmlResult += '</table>';

  // outPoint Buttons at the bottom
  outLinks = true;
  if( outPoints.hasOwnProperty("multi") ) {
    htmlResult += renderLinkButtonsMulti(vertex, outPoints.multi, outLinks);
  }
  if( outPoints.hasOwnProperty("single") ) {
    htmlResult += renderLinkButtonsSingle(vertex, outPoints.single, outLinks);
  }
  htmlResult += renderVertexJsonLink(vertex, "out.json")

  htmlResult += "</div>";
  return htmlResult;
}

// outLinks should be false for inLinks (ie for buttons at the top)
function renderLinkButtonsMulti(vertex, links, outLinks)
{
  sOutLinks = outLinks ? "true" : "false";
  htmlResult = "";
  for(const [k,v] of Object.entries(links)) {
    var linkLabel = k;

    var otherVertices = multiLinksVerticesNotYetOpen(vertex, linkLabel, outLinks);
    if( otherVertices.length > 0 ) {
      var addMultiAction = "addMultiLink('" + vertex + "','" + linkLabel + "'," + sOutLinks + ")";
      var class_ = vertexClass(otherVertices[0]);
      htmlResult += "<button type='button' class='" + class_ + "' onclick=" + addMultiAction + ">+" + linkLabel + "</button>";
    }
  }
  return htmlResult;
}
// outLinks should be false for inLinks (ie for buttons at the top)
function renderLinkButtonsSingle(vertex, links, outLinks)
{
  sOutLinks = outLinks ? "true" : "false";
  htmlResult = "";
  for(const [k,v] of Object.entries(links)) {
    var linkLabel = k;

    // No totalCount, so it is a single link
    var otherVertex = v["otherVertex"];
    // Only show the button if it links to a vertex that is not yet shown
    if( !vertices.hasOwnProperty(otherVertex) ) {
      var addAction = "addVertex('" + otherVertex + "')";
      var class_ = vertexClass(otherVertex);
      htmlResult += "<button type='button' class='" + class_ + "' onclick=" + addAction + ">+" + linkLabel + "</button>";
    }
  }
  return htmlResult;
}
function renderVertexJsonLink(vertex, file)
{
  var result = "";
  result += "<a href='http://localhost:8000/vertices/" + vertex + "/" + file + "' target='_blank' rel='noopener noreferrer'>" + file + "</a>";
  return result;
}
