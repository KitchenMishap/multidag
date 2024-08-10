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
  htmlResult += "<div class='" + vertexClass(vertex) + "'>";

  // Buttons at the top
  if (links.hasOwnProperty("singleIn")) {
    for (singleIn of links.singleIn) {
      // Only show button if links to vertex not yet shown
      if( !vertices.hasOwnProperty(singleIn.otherVertex) ) {
        var addAction = "addVertex('" + singleIn.otherVertex + "')";
        var label = singleIn.label;
        var class_ = vertexClass(singleIn.otherVertex);
        htmlResult += "<button type='button' class='" + class_ + "' onclick=" + addAction + ">+" + label + "</button>";
      }
    }
  }
  var removeAction = "removeVertex('" + vertex + "')";
  htmlResult += "<button type='button' onclick=" + removeAction + ">X</button>";

  // Title
  htmlResult += "<h3 class='title'>" + vertexTitle(vertex) + "</h3>";

  // Attributes
  htmlResult += '<table>'
  for([k,v] of Object.entries(attributes)) {
    htmlResult += '<tr><th>' + sanitizeHTML(k) + ':</th><td>' + sanitizeHTML(v) + '</td></tr>'
  }
  htmlResult += '</table>';

  // Buttons at the bottom
  if (links.hasOwnProperty("multiOut")) {
    for( const [k,v] of Object.entries(links.multiOut) ) {
      var multiOutLabel = k;
      var addMultiOutAction = "addMultiOut('" + vertex + "','" + multiOutLabel + "')";
      var outs = multiOutsNotYetOpen(vertex, multiOutLabel);
      if( outs.length > 0 ) {
        var class_ = vertexClass(outs[0]);
        htmlResult += "<button type='button' class='" + class_ + "' onclick=" + addMultiOutAction + ">+" + multiOutLabel + "</button>";
      }
    }
  }
  htmlResult += "</div>";
  return htmlResult;
}
