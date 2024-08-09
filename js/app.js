// Set up zoom support
  // [ ] ToDo make rendering work nicely at any zoom value
  // (Steps to reproduce: Zoom and then click on something that changes the graph)
var svg = d3.select("svg"),
  inner = d3.select("svg g"),
  zoom = d3.zoom().on("zoom", function() {
  inner.attr("transform", d3.event.transform);
});
svg.call(zoom);

// Create and configure the renderer
var render = dagreD3.render();

var g;
var oldInputGraphValue;

function tryDraw() {
  if (oldInputGraphValue !== inputGraph.value) {
    inputGraph.setAttribute("class", "");
    oldInputGraphValue = inputGraph.value;
    try {
      g = graphlibDot.read(inputGraph.value);
    } catch (e) {
      inputGraph.setAttribute("class", "error");
      throw e;
    }

    // Set margins, if not present
    if (!g.graph().hasOwnProperty("marginx") &&
      !g.graph().hasOwnProperty("marginy")) {
      g.graph().marginx = 20;
      g.graph().marginy = 20;
    }

    g.graph().transition = function (selection) {
      return selection.transition().duration(1500);
    };

    // Render the graph into svg g
    d3.select("svg g").call(render, g);
  }
}

function getSingleString() {
  return fetchJsonFile("vertices/blockchain/attributes.json")
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      return renderSingleHtmlStringAsDot( renderJsonObjectAsHtml(json) );
    })
    .catch((error) => {
      console.log(error)
      return renderSingleHtmlStringAsDot( "Error: See Console under Developer Tools in browser");
    });
}

