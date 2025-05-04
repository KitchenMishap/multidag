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

function calculateVertexOthersInCount(vertexName, label) {
  if (vertices[vertexName].inPoints.hasOwnProperty("multi")) {
    var inLinksMulti = vertices[vertexName].inPoints.multi;
    if (inLinksMulti.hasOwnProperty(label)) {
      var totalCount = inLinksMulti[label]["totalCount"];
      var openCount = countOpenVertices(inLinksMulti[label].vertexSelection.otherVertices);
      if (openCount==0) {
        // We don't speak of "others" when none are open at all
        return 0;
      }
      return totalCount - openCount;
    }
  }
  return -1;  // I don't think this should happen
}

function calculateVertexOthersOutCount(vertexName, label) {
  if( vertices[vertexName].outPoints.hasOwnProperty("multi") ) {
    var outLinksMulti = vertices[vertexName].outPoints.multi;
    if (outLinksMulti.hasOwnProperty(label)) {
      var totalCount = outLinksMulti[label]["totalCount"];
      var openCount = countOpenVertices(outLinksMulti[label].vertexSelection.otherVertices);
      if (openCount==0) {
        // We don't speak of "others" when none are open at all
        return 0;
      }
      return totalCount - openCount;
    }
  }
  return -1;  // I don't think this should happen
}

function findOthersInNextToOpen(vertexName, label) {
  if( vertices[vertexName].inPoints.hasOwnProperty("multi") ) {
    var inLinksMulti = vertices[vertexName].inPoints.multi;
    if (inLinksMulti.hasOwnProperty(label)) {
      var nextToOpen = nextUnopened(inLinksMulti[label].vertexSelection.otherVertices);
      return nextToOpen;
    }
  }
  return null;  // This can happen, because inLinksMulti[label].vertexSelection is only a selection
}


function findOthersOutNextToOpen(vertexName, label) {
  if( vertices[vertexName].outPoints.hasOwnProperty("multi") ) {
    var outLinksMulti = vertices[vertexName].outPoints.multi;
    if (outLinksMulti.hasOwnProperty(label)) {
      var nextToOpen = nextUnopened(outLinksMulti[label].vertexSelection.otherVertices);
      return nextToOpen;
    }
  }
  return null;  // This can happen, because outLinksMulti[label].vertexSelection is only a selection
}

function countOpenVertices(vertexArray) {
  var count = 0;
  for (const s of vertexArray) {
    if (s in vertices) {
      count++;
    }
  }
  return count;
}

function nextUnopened(vertexArray) {
  for (const s of vertexArray) {
    if (s in vertices) {
    } else {
      return s;
    }
  }
  return null;
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
  if (vertices.hasOwnProperty(vertex)) {
    if (vertices[vertex].hasOwnProperty("flagged")) {
      return 'flagged';
    }
  }
  return vertex.split('/')[0];
}

function vertexTitle(vertex, attributes, inPoints, outPoints) {
  var type = vertex.split('/')[0];
  var index = vertex.split('/')[1];
  if (type=='transaction' && concise==true) {
    return conciseTransactionTitle(vertex, attributes, inPoints, outPoints);
  }
  if (type=='txo' && concise==true) {
    return conciseTxoTitle(vertex, attributes, inPoints, outPoints);
  }
  return type.toUpperCase() + " " + index;
}

function conciseTransactionTitle(vertex, attributes, inPoints, outPoints) {
  seconds1970 = attributes.blockmediantime;
  date = new Date(seconds1970 * 1000);
  str = date.toLocaleString();
  return str;
}

function conciseTxoTitle(vertex, attributes, inPoints, outPoints) {
  var satoshis = attributes.satoshis;
  var btc = satoshis/100000000;
  if (btc < 0.001) {
    return satoshis.toString() + " sats";
  } else {
    return btc.toString() + " BTC";
  }
}
