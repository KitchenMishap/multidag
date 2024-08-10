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
  return (vertices[vertex].links.hasOwnProperty("multiOut")
          && vertices[vertex].links.multiOut.hasOwnProperty(label));
}

function calculateMultiMetaVertexOthersCount(metaVertexName)
{
  linkCount = multiMetaVertices[metaVertexName].linkCount;
  parentVertex = multiMetaVertices[metaVertexName].parent;
  label = multiMetaVertices[metaVertexName].label;
  links = vertices[parentVertex].links;
  if( links.hasOwnProperty("multiOut") ) {
    if( links.multiOut.hasOwnProperty(label) ) {
      var totalCount = links.multiOut[label].totalCount
      return totalCount - linkCount;
    }
  }
  if( links.hasOwnProperty("multiIn") ) {
    if( links.multiIn.hasOwnProperty(label) ) {
      var totalCount = links.multiIn[label].totalCount
      return totalCount - linkCount;
    }
  }
  return 0;
}

function multiOutsNotYetOpen(sourceVertex, multiOutLabel)
{
  var links = vertices[sourceVertex].links;
  if (links.hasOwnProperty("multiOut")) {
    if (links.multiOut.hasOwnProperty(multiOutLabel)) {
      var verticesToOpen = links.multiOut[multiOutLabel].arcSelection.vertices;
      console.log("candidate verticesToOpen:");
      console.log(verticesToOpen);
      var verticesToKeep = [];
      for(vertex of verticesToOpen) {
        if( !vertices.hasOwnProperty(vertex) ) {
          verticesToKeep.push(vertex);
        }
      }
      console.log("verticesToOpen:");
      console.log(verticesToKeep);
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
