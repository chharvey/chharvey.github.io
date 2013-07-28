MathJax.Hub.Config({
	messageStyle: 'normal',
	menuSettings: {
		zoom: 'Click',
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
			RR: '{\\mathbb\{R\}}',
		},
	},
	'HTML-CSS': {
	},
});

MathJax.Ajax.loadComplete('http://chharvey.net16.net/core/scripts/mathjax-localconfig.js');