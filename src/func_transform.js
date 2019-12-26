export default function(prop, options) {
	var transformed = "";
	for(let i=0; i<prop.length; i++) {
        let c=prop.charAt(i);
		if(c === c.toUpperCase() && c.toLowerCase() !== c.toUpperCase()) {
			transformed += "-" + c.toLowerCase();
		} else {
			transformed += c;
		}
	}
	return transformed;
}
