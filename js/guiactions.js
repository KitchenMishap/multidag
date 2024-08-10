function addVertex(partialUrl)
{
  updateAddVertexAndRedraw(partialUrl);
}

function removeVertex(partialUrl)
{
  updateRemoveVertexAndRedraw(partialUrl);
}

function addMultiOut(sourceVertex, multiOutLabel)
{
  var verticesToOpen = multiOutsNotYetOpen(sourceVertex, multiOutLabel);
  updateAddVerticesAndRedraw(verticesToOpen);
}
