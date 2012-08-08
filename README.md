conf2json
=========

__"sweet recursion"__

I often have to deal with large and unreadable XML files in the form:

    <a Name="b">
    	<a Name="c">see</a>
    	<a Name="d">it's</a>
    	<a Name="1">
    		<a Name="t">
    			hard
    		</a>
    		<a Name="x">to</a>
    	</a>
    </a>
    <a Name="z">read</a>

 This script pretty much converts it to JSON, which means I can read it a lot easier.

     {
	    "b": {
	        "c": "see",
	        "d": "it's",
	        "1": {
	            "t": "hard",
	            "x": "to"
	        }
	    },
	    "z": "read"
	}

OK, that example is not particularly impressive, but given that <code>a</code> in my case is a 12-char word, nested elements can become *very* difficult to easily read.

The file I'm referring to is large (45k lines) so this file accepts an XPATH to the element you want to start from. Useful for me.

## Requirements

The only node module required is <code>elementtree</code>. Get this:

    npm install elementtree -g

## Usage

It's just basic at the minute:

- <code>file</code> variable holds location of file to parse
- <code>xpath</code> variable holds the parsing start point.

After that run the script:

    node conf2json.js