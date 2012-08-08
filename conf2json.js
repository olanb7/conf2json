var fs = require('fs'),
	et = require('elementtree'),
	file = 'example.xml',
	data = fs.readFileSync(file).toString(),
	etree =  et.parse(data),
	json = {};


/**
 * Show attributes with empty values in the output.
 * If true empty attributes are given empty object values ({}).
 *
 * @type {Boolean}
 */
var showEmpty = true,

/**
 * The indentation applied to the JSON ouput
 *
 * @type {String}
 */
	jsonIndentation = "  ";


/**
 * This function recursively steps through the opwvconfig from the root element
 * passed and converts the values in name:value pairs.
 * @param  {Object} a The root element.
 * @param  {Object} b The JSON output object
 */
var conf2json = function(a, b) {

	var name, text;

	for (var i = 0; i < a._children.length; i++) {

		name = a._children[i].attrib.Name;

		if (showEmpty || a._children[i].text) {
	
			// text seems to be '\r\n   ' style string when value is object
			text = a._children[i].text.replace(/\s+/g," ") || {};

			if (text === " ") {
				text = {};
			}

			b[name] = text;
		}
		conf2json(a._children[i], b[name]);
	}
	return JSON.stringify(b, null, jsonIndentation);
};

var xpath = './/longTagName[@Name="Startpoint"]',
	root = etree.findall(xpath)[0],
	opwv = conf2json(root, json);

console.log(opwv);