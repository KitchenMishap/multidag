function renderJsonObjectAsHtml(json) {
  htmlResult = '<table>'
  for([k,v] of Object.entries(json)) {
    htmlResult += '<tr><th>' + sanitizeHTML(k) + ':</th><td>' + sanitizeHTML(v) + '</td></tr>'
  }
  htmlResult += '</table>';
  return htmlResult;
}

function renderVertexAsHtml(vertex, attributes, links) {
  htmlResult = '';

  // Buttons at the top
  if (links.hasOwnProperty("singleIn")) {
    for (singleIn of links.singleIn) {
      // Only show button if links to vertex not yet shown
      if( !vertices.hasOwnProperty(singleIn.otherVertex) ) {
        var addAction = "addVertex('" + singleIn.otherVertex + "')";
        var label = singleIn.label;
        htmlResult += "<button type='button' tooltip='" + label + "' onclick=" + addAction + ">+</button>";
      }
    }
  }
  var removeAction = "removeVertex('" + vertex + "')";
  htmlResult += "<button type='button' onclick=" + removeAction + ">X</button>";

  htmlResult += '<table>'
  for([k,v] of Object.entries(attributes)) {
    htmlResult += '<tr><th>' + sanitizeHTML(k) + ':</th><td>' + sanitizeHTML(v) + '</td></tr>'
  }
  htmlResult += '</table>';
  return htmlResult;
}
