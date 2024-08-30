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
  multiMetaVertices = {};
  var result = "";

  // Start of the dot string
  result += 'digraph {\n';

  // The vertices
  for (const [key, value] of Object.entries(vertices)) {
    var vertex = key;
    result += 'vertex_' + vertex.replace("/","_");
    result += ' [labelType="html" class="' + vertexClass(vertex) + '" label="';
    result += renderVertexAsHtml(vertex, value.attributes, value.inPoints, value.outPoints);
    result += '"];\n';

    // The arcs for the vertex
    // Also adds items to multiMetaVertices
    result += renderVertexArcsAsDot(vertex, value.inPoints, value.outPoints);
  }

  // The multiMetaVertices
  for (const [key, value] of Object.entries(multiMetaVertices)) {
    var metaVertexName = key;
    var parentName = 'vertex_' + value.parent.replace("/","_");
    result += metaVertexName;
    result += ' [labelType="html" label="';
    result += value.label;
    result += '"];\n';

    // The arc for the metavertex
    var isOut = value.isOut;
    if( isOut ) {
      result += parentName + ' -> ' + metaVertexName + ';\n';
    } else {
      result += metaVertexName + ' -> ' + parentName + ';\n';
    }
    // The "n others" coming off of the multiMetaVertex
    var othersCount = calculateMultiMetaVertexOthersCount(metaVertexName);
    if( othersCount > 0 )
    {
      result += metaVertexName + "_others";
      result += ' [labeltype="html" label ="';
      result += '' + othersCount + ' others"];\n';

      // The arc to "n others"
      if( isOut ) {
        result += metaVertexName + ' -> ' + metaVertexName + '_others;\n';
      } else {
        result += metaVertexName + '_others -> ' + metaVertexName + ';\n';
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

function renderArcFromMetaVertexAsDot(metaVertexA, vertexB)
{
  var dotResult = "";
  dotResult += metaVertexA + " -> vertex_" + vertexB.replace("/","_") + ";\n";
  return dotResult;
}

function renderArcToMetaVertexAsDot(metaVertexA, vertexB)
{
  var dotResult = "";
  dotResult += "vertex_" + vertexB.replace("/","_") + " -> " + metaVertexA + ";\n";
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
        // Will it have a metavertex at the multi-end?
        if (arcEndpointExistsAndIsMulti(vertexB, labelB)) {
          var metaVertexName = addMultiMetaVertexIfNotExist(vertexB, labelB, true);
          dotResult += renderArcFromMetaVertexAsDot(metaVertexName, vertexA);
          multiMetaVertices[metaVertexName].linkCount++;
        } else {
          // Direct link, non-multi at other ent (no metavertex)
          dotResult += renderArcAsDot(vertexB, vertexA)
        }
      }
    }
  }
  if( vertexAInLinks.hasOwnProperty("single") ) {
    for (const [key, value] of Object.entries(vertexAInLinks.single)) {
      vertexB = value["otherVertex"];
      labelB = value["otherLabel"];
      if (bothVerticesPresent(vertexA, vertexB)) {
        // Will it have a metavertex at the multi-end?
        if (arcEndpointExistsAndIsMulti(vertexB, labelB)) {
          var metaVertexName = addMultiMetaVertexIfNotExist(vertexB, labelB, true);
          dotResult += renderArcFromMetaVertexAsDot(metaVertexName, vertexA);
          multiMetaVertices[metaVertexName].linkCount++;
        } else {
          // Direct link, non-multi at other ent (no metavertex)
          dotResult += renderArcAsDot(vertexB, vertexA)
        }
      }
    }
  }

  if( vertexAOutLinks.hasOwnProperty("multi") ) {
    for (const [key, value] of Object.entries(vertexAOutLinks.multi)) {
      vertexB = value["otherVertex"];
      labelB = value["otherLabel"];
      if (bothVerticesPresent(vertexA, vertexB)) {
        // Will it have a metavertex at the multi-end?
        if (arcEndpointExistsAndIsMulti(vertexB, labelB)) {
          var metaVertexName = addMultiMetaVertexIfNotExist(vertexB, labelB, false);
          dotResult += renderArcToMetaVertexAsDot(metaVertexName, vertexA);
          multiMetaVertices[metaVertexName].linkCount++;
        } else {
          // Direct link, non-multi at other ent (no metavertex)
          dotResult += renderArcAsDot(vertexA, vertexB)
        }
      }
    }
  }
  if( vertexAOutLinks.hasOwnProperty("single") ) {
    for (const [key, value] of Object.entries(vertexAOutLinks.single)) {
      vertexB = value["otherVertex"];
      labelB = value["otherLabel"];
      if (bothVerticesPresent(vertexA, vertexB)) {
        // Will it have a metavertex at the multi-end?
        if (arcEndpointExistsAndIsMulti(vertexB, labelB)) {
          var metaVertexName = addMultiMetaVertexIfNotExist(vertexB, labelB, false);
          dotResult += renderArcToMetaVertexAsDot(metaVertexName, vertexA);
          multiMetaVertices[metaVertexName].linkCount++;
        } else {
          // Direct link, non-multi at other ent (no metavertex)
          dotResult += renderArcAsDot(vertexA, vertexB)
        }
      }
    }
  }
  return dotResult;
}

function addMultiMetaVertexIfNotExist(vertex, label, isOut)
{
  var metaVertexName = "metavertex_" + vertex.replace("/","_") + "_" + label;
  if(!multiMetaVertices.hasOwnProperty(metaVertexName)) {
    multiMetaVertices[metaVertexName] = {parent: vertex, label: label, linkCount: 0, isOut: isOut};
  }
  return metaVertexName;
}
