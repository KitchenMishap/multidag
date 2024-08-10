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
    var vertex = key;
    result += 'vertex_' + vertex.replace("/","_");
    result += ' [labelType="html" label="';
    result += renderVertexAsHtml(value.attributes, value.links);
    result += '"];\n';

    // The arcs for the vertex
    result += renderVertexArcsAsDot(vertex, value.links);
  }

  // The end of the dot string
  result += '}\n';

  inputGraph.value = result;
  tryDraw();

  return
}

function renderArcAsDot(vertexA, vertexB)
{
  var dotResult = "";
  dotResult += "vertex_" + vertexA.replace("/","_") + " -> vertex_" + vertexB.replace("/","_") + ";\n";
  return dotResult;
}

function renderVertexArcsAsDot(vertexA, vertexALinks)
{
  var dotResult = "";
  if( vertexALinks.hasOwnProperty("singlein") ) {
    for (const [key, value] of Object.entries(vertexALinks.singlein))
    {
      console.log("Found a link");
      vertexB = value.partialUrl;
      if( bothVerticesPresent(vertexA, vertexB) ) {
        console.log("Both present");
        dotResult += renderArcAsDot(vertexB, vertexA)
      }
    }
  }
  return dotResult;
}
