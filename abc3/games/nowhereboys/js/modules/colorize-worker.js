onmessage = function (e) {
	var i,n,pix;
	pixobj=e.data.pix;
	pix=pixobj.data;
	multiplyColor=e.data.multiplyColor;


		for (i = 0, n = pix.length; i < n; i += 4) {
		    pix[i  ] = (multiplyColor[0]* pix[i  ] / 127); // red
		    pix[i+1] = (multiplyColor[1]* pix[i+1] / 127); // green
		    pix[i+2] = (multiplyColor[2]* pix[i+2] / 127); // blue
		    // pix[i+3] is alpha channel (ignored)
		}
	postMessage(pixobj);

}