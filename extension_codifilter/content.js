function delete_row(e)
{
	var row = e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	if(row.tagName == 'TR' && e.parentNode.parentNode.className !== 'box02a_bbsabody')
	{
		row.parentNode.replaceChild(document.createElement('TR'), row);
	}
};


var elements = document.getElementsByTagName('span');

var elementsToRemove = new Array();

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];
        if (node.nodeType === 3) {
            var text = node.nodeValue;
            var replacedText = text.replace(/[뎐삼]/gi, '[차단8]' + element.tagName );
            if (replacedText !== text) {
				elementsToRemove.push(node);				
				//var newNode = document.createTextNode(replacedText);
				//element.replaceChild(newNode, node);
				break;
            }
        }
    }
}

//alert(elementsToRemove.length);

for (var i = 0; i < elementsToRemove.length; i++)
{
	if( i===0)
	{
		//alert(elementsToRemove[i].innerHTML);
	}
	delete_row(elementsToRemove[i]);
}