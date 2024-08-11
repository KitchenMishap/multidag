function addVertex(partialUrl)
{
  resetZoom()
  updateAddVertexAndRedraw(partialUrl);
}

function removeVertex(partialUrl)
{
  resetZoom();
  updateRemoveVertexAndRedraw(partialUrl);
}

function addMultiOut(sourceVertex, multiOutLabel)
{
  resetZoom();
  var verticesToOpen = multiOutsNotYetOpen(sourceVertex, multiOutLabel);
  updateAddVerticesAndRedraw(verticesToOpen);
}
