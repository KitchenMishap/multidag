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

  if (links.hasOwnProperty("singleIn")) {
    for (singleIn of links.singleIn) {
      action = "addVertex('" + singleIn.otherVertex + "')";
      label = singleIn.label;
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
