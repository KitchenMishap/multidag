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

function addMultiLink(sourceVertex, multiLinkLabel, outLinks)
{
  resetZoom();
  var verticesToOpen = multiLinksVerticesNotYetOpen(sourceVertex, multiLinkLabel, outLinks);
  updateAddVerticesAndRedraw(verticesToOpen);
}
