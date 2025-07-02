function makeMatrices(w,h){
	var x = new Array(w);
		for (var i = 0; i < x.length; i++) {
			x[i] = new Array(h);
		}
	return x;
}

export default makeMatrices;
