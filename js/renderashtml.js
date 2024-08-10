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
        htmlResult += "<button type='button' onclick=" + addAction + ">+" + label + "</button>";
      }
    }
  }
  var removeAction = "removeVertex('" + vertex + "')";
  htmlResult += "<button type='button' onclick=" + removeAction + ">X</button>";

  // Attributes
  htmlResult += '<table>'
  for([k,v] of Object.entries(attributes)) {
    htmlResult += '<tr><th>' + sanitizeHTML(k) + ':</th><td>' + sanitizeHTML(v) + '</td></tr>'
  }
  htmlResult += '</table><br>';

  // Buttons at the bottom
  if (links.hasOwnProperty("multiOut")) {
    for( const [k,v] of Object.entries(links.multiOut) ) {
      var multiOutLabel = k;
      var addMultiOutAction = "addMultiOut('" + vertex + "','" + multiOutLabel + "')";
      if( multiOutsNotYetOpen(vertex, multiOutLabel).length > 0 ) {
        htmlResult += "<button type='button' onclick=" + addMultiOutAction + ">+" + multiOutLabel + "</button>";
      }
    }
  }
  return htmlResult;
}
