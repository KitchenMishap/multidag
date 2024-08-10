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

function renderAllAsDot() {
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

  // The metavertices
  for (const [key, value] of Object.entries(metaVertices)) {
    var metaVertexName = key;
    var parentName = 'vertex_' + value.parent.replace("/","_");
    result += metaVertexName;
    result += ' [labelType="html" label="';
    result += value.label;
    result += '"];\n';

    // The arc for the metavertex
    result += parentName + ' -> ' + metaVertexName + ';';
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

function renderArcFromMetaVertexAsDot(metaVertexA, vertexB)
{
  var dotResult = "";
  dotResult += metaVertexA + " -> vertex_" + vertexB.replace("/","_") + ";\n";
  return dotResult;
}

function renderVertexArcsAsDot(vertexA, vertexALinks)
{
  var dotResult = "";
  if( vertexALinks.hasOwnProperty("singleIn") ) {
    for (const [key, value] of Object.entries(vertexALinks.singleIn))
    {
      vertexB = value.otherVertex;
      labelB = value.otherLabel;
      if( bothVerticesPresent(vertexA, vertexB) ) {
        // Will it have a metavertex at the multi-end?
        if( arcEndpointExistsAndIsMulti(vertexB, labelB) )
        {
          var metaVertexName = addMetaVertexIfNotExist(vertexB, labelB)
          dotResult += renderArcFromMetaVertexAsDot(metaVertexName, vertexA);
        } else {
          // Direct link (no metavertex)
          dotResult += renderArcAsDot(vertexB, vertexA)
        }

      }
    }
  }
  return dotResult;
}

function addMetaVertexIfNotExist(vertex, label)
{
  // We simply overwrite if it exists
  var metaVertexName = "metavertex_" + vertex.replace("/","_") + "_" + label;
  metaVertices[metaVertexName] = {parent:vertex, label:label};
  return metaVertexName;
}
