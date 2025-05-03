function showAttributesForVertex(vertex)
{
  var type = vertex.split('/')[0];
  if (type=='transaction' && concise==true) {
    return false;
  }
  return true;
}
