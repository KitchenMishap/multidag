function renderSingleHtmlStringAsDot(str) {
  var result = "";

  // Start of the dot string
  result += 'digraph {\n';

  // The node
  result += 'thesinglevertex';
  result += ' [labelType="html" label="';
  result += str;
  result += '"];\n';

  // The end of the dot string
  result += '}\n';

  inputGraph.value = result;
  tryDraw();

  return
}

function renderAllVerticesAsDot() {
  var result = "";

  // Start of the dot string
  result += 'digraph {\n';

  // The vertices
  for (const [key, value] of Object.entries(vertices)) {
    result += 'vertex_' + key.replace("/","_");
    result += ' [labelType="html" label="';
    result += renderVertexAsHtml(value.attributes, value.links);
    result += '"];\n';
  }

  // The end of the dot string
  result += '}\n';

  inputGraph.value = result;
  tryDraw();

  return
}
