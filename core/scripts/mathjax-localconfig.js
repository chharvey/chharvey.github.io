MathJax.Hub.Config({
	messageStyle: 'normal',
	menuSettings: {
		zoom: 'None',
		zscale: '150%',
	},
	tex2jax: {
		inlineMath:  [ ['\\(' , '\\)'], ],
		displayMath: [ ['\\[' , '\\]'], ],
		ignoreClass: 'main',
		processClass: 'latex',
	},
	TeX: {
		extensions: ['action.js'],
		equationNumbers: {autoNumber: 'AMS'},
		Macros: {
//			bold: ['{\\bf #1}',1], // template
			expand: ['{\\left\(\\toggle\{\\text\{#1\}\}\{#2\}\\endtoggle\\right\)}',2],
			l: ['{\\mathsf #1}',1], // propositional variables, predicates
			RR: '{\\mathbb\{R\}}', // real numbers
		},
	},
	'HTML-CSS': {
	},
});

MathJax.Ajax.loadComplete('http://chharvey.net16.net/core/scripts/mathjax-localconfig.js');