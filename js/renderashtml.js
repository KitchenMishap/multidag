function renderJsonObjectAsHtml(json) {
  htmlResult = '<table>'
  for([k,v] of Object.entries(json)) {
    htmlResult += '<tr><th>' + sanitizeHTML(k) + ':</th><td>' + sanitizeHTML(v) + '</td></tr>'
  }
  htmlResult += '</table>';
  return htmlResult;
}

function renderVertexAsHtml(attributes, links) {
  htmlResult = '';

  if (links.hasOwnProperty("singlein")) {
    for (singlein of links.singlein) {
      action = "addVertex('" + singlein.partialUrl + "')";
      label = singlein.label;
      htmlResult += "<button type='button' tooltip='" + label + "' onclick=" + action + ">+</button>";
    }
  }

  htmlResult += '<table>'
  for([k,v] of Object.entries(attributes)) {
    htmlResult += '<tr><th>' + sanitizeHTML(k) + ':</th><td>' + sanitizeHTML(v) + '</td></tr>'
  }
  htmlResult += '</table>';
  return htmlResult;
}
