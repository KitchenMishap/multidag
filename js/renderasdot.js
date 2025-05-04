// Functions that render things in the "dot" graph lanuage

function renderAllAsDot() {
  multiMetaVertices = {};
  var result = "";

  // Start of the dot string
  result += 'digraph {\n';

  // The vertices
  for (const [key, value] of Object.entries(vertices)) {
    var vertex = key;
    var vertexName = 'vertex_' + vertex.replace("/", "_");
    result += vertexName;
    result += ' [labelType="html" class="' + vertexClass(vertex) + '" label="';
    result += renderVertexAsHtml(vertex, value.attributes, value.inPoints, value.outPoints);
    result += '"];\n';

    // The arcs for the vertex
    result += renderVertexArcsAsDot(vertex, value.inPoints, value.outPoints);

    // The "n others" coming into the vertex
    if( value.inPoints.hasOwnProperty("multi") ) {
      for (const [key, value2] of Object.entries(value.inPoints.multi)) {
        label = key;
        var othersInCount = calculateVertexOthersInCount(vertex, label);
        if (othersInCount > 0) {
          var nextToOpen = findOthersInNextToOpen(vertex, label);
          result += vertexName + "_othersin";
          result += ' [labelType="html" label="';
          result += '' + othersInCount + ' others ';
          if (nextToOpen !== null) {
            result += renderOthersNextButton(nextToOpen, label, vertex);
          }
          result += '"];\n';
          // The arc to "n others" in
          result += vertexName + '_othersin -> ' + vertexName + ';\n';
        }
      }
    }

    // The "n others" going out of the vertex
    if( value.outPoints.hasOwnProperty("multi") ) {
      for (const [key, value2] of Object.entries(value.outPoints.multi)) {
        label = key;
        var othersOutCount = calculateVertexOthersOutCount(vertex, label);
        if (othersOutCount > 0) {
          var nextToOpen = findOthersOutNextToOpen(vertex, label);
          result += vertexName + "_othersout";
          result += ' [labelType="html" label="';
          result += '' + othersOutCount + ' others ';
          if (nextToOpen !== null) {
            result += renderOthersNextButton(nextToOpen, label, vertex);
          }
          result += '"];\n';
          // The arc to "n others" out
          result += vertexName + " -> " + vertexName + '_othersout' + ';\n';
        }
      }
    }
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

function renderVertexArcsAsDot(vertexA, vertexAInLinks, vertexAOutLinks)
{
  var dotResult = "";
  if( vertexAInLinks.hasOwnProperty("multi") ) {
    for (const [key, value] of Object.entries(vertexAInLinks.multi)) {
      vertexB = value["otherVertex"];
      labelB = value["otherLabel"];
      if (bothVerticesPresent(vertexA, vertexB)) {
        // Direct link, we don't have metavertices in this version of the fn
        dotResult += renderArcAsDot(vertexB, vertexA)
      }
    }
  }
  if( vertexAInLinks.hasOwnProperty("single") ) {
    for (const [key, value] of Object.entries(vertexAInLinks.single)) {
      vertexB = value["otherVertex"];
      labelB = value["otherLabel"];
      if (bothVerticesPresent(vertexA, vertexB)) {
        // Direct link, we don't have metavertices in this version of the fn
        dotResult += renderArcAsDot(vertexB, vertexA)
      }
    }
  }

  if( vertexAOutLinks.hasOwnProperty("multi") ) {
    for (const [key, value] of Object.entries(vertexAOutLinks.multi)) {
      vertexB = value["otherVertex"];
      labelB = value["otherLabel"];
      if (bothVerticesPresent(vertexA, vertexB)) {
        // Direct link, we don't have metavertices in this version of the fn
        dotResult += renderArcAsDot(vertexA, vertexB)
      }
    }
  }
  if( vertexAOutLinks.hasOwnProperty("single") ) {
    for (const [key, value] of Object.entries(vertexAOutLinks.single)) {
      vertexB = value["otherVertex"];
      labelB = value["otherLabel"];
      if (bothVerticesPresent(vertexA, vertexB)) {
        // Direct link, we don't have metavertices in this version of the fn
        dotResult += renderArcAsDot(vertexA, vertexB)
      }
    }
  }
  return dotResult;
}
