// Functions instigated by user actions (button presses etc)

function addVertex(partialUrl)
{
  resetZoom()
  updateAddVertexAndRedraw(partialUrl, vertexSubdir);
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
  updateAddVerticesAndRedraw(verticesToOpen, vertexSubdir);
}

function toggleVertexFlag(vertex)
{
  updateTogggleVertexFlagAndRedraw(vertex);
}
