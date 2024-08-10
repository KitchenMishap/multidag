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
