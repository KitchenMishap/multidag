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
