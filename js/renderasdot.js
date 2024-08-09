function renderSingleHtmlStringAsDot(str) {
  var result = "";

  // Start of the dot string
  result += 'digraph {\n';

  // The node
  result += 'thesinglevertex';
  result += ' [labelType="html" label="';
  result += str;
  result += '"];\n';

  // The end of the dot string
  result += '}\n';

  inputGraph.value = result;
  tryDraw();

  return
}
