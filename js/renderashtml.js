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
  htmlResult += renderLinkButtons(vertex, inPoints, outLinks);

  // Title with X button
  var removeAction = "removeVertex('" + vertex + "')";
  buttonHtml = "<button type='button' onclick=" + removeAction + ">X</button>";
  htmlResult += "<h3 class='title'>" + vertexTitle(vertex) + "&nbsp;&nbsp;" + buttonHtml + "</h3>";

  // Attributes
  htmlResult += '<table>'
  for([k,v] of Object.entries(attributes)) {
    htmlResult += '<tr><th>' + sanitizeHTML(k) + ':</th><td>' + sanitizeHTML(v) + '</td></tr>'
  }
  htmlResult += '</table>';

  // outPoint Buttons at the bottom
  outLinks = true;
  htmlResult += renderLinkButtons(vertex, outPoints, outLinks);

  htmlResult += "</div>";
  return htmlResult;
}

// outLinks should be false for inLinks (ie for buttons at the top)
function renderLinkButtons(vertex, links, outLinks)
{
  sOutLinks = outLinks ? "true" : "false";
  htmlResult = "";
  for(const [k,v] of Object.entries(links)) {
    var linkLabel = k;

    // If it has a totalCount, it is a multi link
    if( v.hasOwnProperty("totalCount") ) {
      var otherVertices = multiLinksVerticesNotYetOpen(vertex, linkLabel, outLinks);
      if( otherVertices.length > 0 ) {
        var addMultiAction = "addMultiLink('" + vertex + "','" + linkLabel + "'," + sOutLinks + ")";
        var class_ = vertexClass(otherVertices[0]);
        htmlResult += "<button type='button' class='" + class_ + "' onclick=" + addMultiAction + ">+" + linkLabel + "</button>";
      }
    } else {
      // No totalCount, so it is a single link
      var otherVertex = v["otherVertex"];
      // Only show the button if it links to a vertex that is not yet shown
      if( !vertices.hasOwnProperty(otherVertex) ) {
        var addAction = "addVertex('" + otherVertex + "')";
        var class_ = vertexClass(otherVertex);
        htmlResult += "<button type='button' class='" + class_ + "' onclick=" + addAction + ">+" + linkLabel + "</button>";
      }
    }
  }
  return htmlResult;
}
