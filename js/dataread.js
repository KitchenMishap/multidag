function bothVerticesPresent(vertexA, vertexB)
{
  return( vertices.hasOwnProperty(vertexA)
    && vertices.hasOwnProperty(vertexB) );
}

function arcEndpointExistsAndIsMulti(vertex, label)
{
  if( !vertices.hasOwnProperty(vertex) ) {
    return false;
  }
  if (vertices[vertex].inPoints.hasOwnProperty(label) ) {
    if (vertices[vertex].inPoints[label].hasOwnProperty("totalCount")) {
      return true;
    }
  }
  if (vertices[vertex].outPoints.hasOwnProperty(label) ) {
    if (vertices[vertex].outPoints[label].hasOwnProperty("totalCount")) {
      return true;
    }
  }
  return false;
}

function calculateMultiMetaVertexOthersCount(metaVertexName) {
  var linkCount = multiMetaVertices[metaVertexName].linkCount;
  var parentVertex = multiMetaVertices[metaVertexName].parent;
  var label = multiMetaVertices[metaVertexName].label;
  var inLinks = vertices[parentVertex].inPoints;
  if (inLinks.hasOwnProperty(label)) {
    var isMulti = inLinks[label].hasOwnProperty("totalCount");
    if (isMulti) {
      var totalCount = inLinks[label]["totalCount"];
      return totalCount - linkCount;
    }
  }
  var outLinks = vertices[parentVertex].outPoints;
  if (outLinks.hasOwnProperty(label)) {
    var isMulti = outLinks[label].hasOwnProperty("totalCount");
    if (isMulti) {
      var totalCount = outLinks[label]["totalCount"];
      return totalCount - linkCount;
    }
  }
  return -1;  // I don't think this should happen
}

// Call with outLinks=false for in links
function multiLinksVerticesNotYetOpen(sourceVertex, linkLabel, outLinks)
{
  var links = outLinks ? vertices[sourceVertex].outPoints : vertices[sourceVertex].inPoints;
  if( !links.hasOwnProperty(linkLabel) ) {
    return [];
  }
  if( links[linkLabel].hasOwnProperty("vertexSelection") ) {
    if( links[linkLabel]["vertexSelection"].hasOwnProperty("otherVertices") ) {
      var otherVertices = links[linkLabel]["vertexSelection"]["otherVertices"];
      var verticesToKeep = [];
      for(vertex of otherVertices) {
        if( !vertices.hasOwnProperty(vertex) ) {
          verticesToKeep.push(vertex);
        }
      }
      return verticesToKeep;
    }
  }
  return [];

}

function vertexClass(vertex) {
  return vertex.split('/')[0];
}

function vertexTitle(vertex) {
  var candidate = vertex.split('/')[0];
  return candidate.toUpperCase();
}
