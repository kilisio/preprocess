export default function preprocess(func) {
	let process = require("./API.js")();
	if(typeof func === "function") {
		func(process);
	} else if(typeof func === "string") {
		process.import(func);	
	} 
	return process;
}


// var test_html = {
//     div: 'hello world'
// };
//
// var test_css = {
//     div:{
//         margin: 0,
//         padding: 0,
//         position: 'absolute',
//         width: '224px',
//         height: '30px',
// 		'background-color': '#1a0a00',
// 		'padding-left': '5px',
//         '.ul_nav': {
// 			margin: 0,
// 			padding: 0,
// 			'list-style': 'none'
// 		},
//         '.ul_nav li': {
// 			margin: 0,
// 			padding: 0,
// 			display: "inline"
// 		},
//         '.link_group': {
//             margin: 0,
//             padding: 0,
//             display: 'inline-block',
// 			':hover':{
//                 '.link_nav': {
//                     color: '#ff6600'
//                 },
//                 '.nav_img': {
//                     filter: 'invert(92%) sepia(13%) saturate(682%) hue-rotate(311deg) brightness(107%) contrast(101%)'
//                 },
//                 '.nav_img_bg': {
//                     'background-color': '#1a0a00'
//                 }
// 			}
//         },
//         '.nav_img_bg': {
// 			margin: 0,
// 			padding: 0,
// 			width: '30px',
// 			height: '30px',
// 			'margin-right': '3px',
// 			'background-color': '#fff0e6',
// 			display: 'inline-block',
// 			'border-radius': '50%',
// 			'vertical-align': 'middle'
// 		},
//         '.nav_img': {
// 			margin: '6px',
// 			padding: 0,
// 			width: '18px',
// 			height: '18px',
//             filter: 'invert(6%) sepia(76%) saturate(641%) hue-rotate(345deg) brightness(95%) contrast(104%)'
// 		},
//         '.link_nav': {
// 			margin: 0,
// 			padding: 0,
// 			'text-decoration': 'none',
// 			color: '#fff0e6',
// 			'font-family': 'forced_squaremedium',
// 			'font-size': '28px',
// 			'margin-right': '3px',
// 			'vertical-align': 'middle',
//             outline: 'none',
//             ':active :focus': {
//                 outline: 'none'
//             }
// 		}
//     }
// };
//
// preprocess(function(api){
//     api.add(test_css).compile(function(err, result){
//         console.log(result);
//     });
//     api.morph('html').add(test_html).compile(function(err, result){
//         console.log(result);
//     });
// });
