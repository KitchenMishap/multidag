// Functions that read the data we're holding in this browser

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
  if (vertices[vertex].inPoints.hasOwnProperty("multi")) {
    if (vertices[vertex].inPoints.multi.hasOwnProperty(label)) {
      return true;
    }
  }
  if (vertices[vertex].outPoints.hasOwnProperty("multi")) {
    if (vertices[vertex].outPoints.multi.hasOwnProperty(label)) {
      return true;
    }
  }
  return false;
}

function calculateMultiMetaVertexOthersCount(metaVertexName) {
  var linkCount = multiMetaVertices[metaVertexName].linkCount;
  var parentVertex = multiMetaVertices[metaVertexName].parent;
  var label = multiMetaVertices[metaVertexName].label;
  if( vertices[parentVertex].inPoints.hasOwnProperty("multi") ) {
    var inLinksMulti = vertices[parentVertex].inPoints.multi;
    if (inLinksMulti.hasOwnProperty(label)) {
      var totalCount = inLinksMulti[label]["totalCount"];
      return totalCount - linkCount;
    }
  }
  if( vertices[parentVertex].outPoints.hasOwnProperty("multi") ) {
    var outLinksMulti = vertices[parentVertex].outPoints.multi;
    if (outLinksMulti.hasOwnProperty(label)) {
      var totalCount = outLinksMulti[label]["totalCount"];
      return totalCount - linkCount;
    }
  }
  return -1;  // I don't think this should happen
}

// Call with outLinks=false for in links
function multiLinksVerticesNotYetOpen(sourceVertex, linkLabel, outLinks)
{
  var linksMulti = outLinks ? vertices[sourceVertex].outPoints.multi : vertices[sourceVertex].inPoints.multi;
  if( !linksMulti.hasOwnProperty(linkLabel) ) {
    return [];
  }
  if( linksMulti[linkLabel].hasOwnProperty("vertexSelection") ) {
    if( linksMulti[linkLabel]["vertexSelection"].hasOwnProperty("otherVertices") ) {
      var otherVertices = linksMulti[linkLabel]["vertexSelection"]["otherVertices"];
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
  var type = vertex.split('/')[0];
  var index = vertex.split('/')[1];
  return type.toUpperCase() + " " + index;
}
