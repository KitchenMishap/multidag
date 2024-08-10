function bothVerticesPresent(vertexA, vertexB)
{
  console.log("Looking for " + vertexA + " and " + vertexB);
  return( vertices.hasOwnProperty(vertexA)
    && vertices.hasOwnProperty(vertexB) );
}
