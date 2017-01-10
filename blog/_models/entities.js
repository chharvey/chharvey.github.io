module.exports = [
  { group: 'template', points: [
    {
      name   : 'null'
    , unicode: '0000'
    , html   : ''
    , latex  : ''
    , mac    : ''
    , comment: ''
    }
  ]}
, { group: 'Text Delimiters', points: [
    {
      name   : 'apostrophe'
    , unicode: '0027'
    , html   : '&apos;'
    , mac    : '\''
    , comment: '<code>&amp;apos;</code> only in XML'
    }
  , {
      name   : 'quotation mark'
    , unicode: '0022'
    , html   : '&quot;'
    , mac    : 'shift \''
    }
  , {
      name   : 'left parenthesis'
    , unicode: '0028'
    , mac    : 'shift 9'
    }
  , {
      name   : 'right parenthesis'
    , unicode: '0029'
    , mac    : 'shift 0'
    }
  , {
      name   : 'left square bracket'
    , unicode: '005b'
    , mac    : '['
    }
  , {
      name   : 'right square bracket'
    , unicode: '005d'
    , mac    : ']'
    }
  , {
      name   : 'left curly bracket'
    , unicode: '007b'
    , mac    : 'shift ['
    }
  , {
      name   : 'right curly bracket'
    , unicode: '007d'
    , mac    : 'shift ]'
    }
  , {
      name   : 'left-pointing angle bracket'
    , unicode: '2329'
    , html   : '&lang;'
    , comment: 'see U+003c for HTML delimiter'
    }
  , {
      name   : 'right-pointing angle bracket'
    , unicode: '232a'
    , html   : '&rang;'
    , comment: 'see U+003e for HTML delimiter'
    }
  ] }
, { group: 'Quotation Marks', points: [
    {
      name   : 'left single quotation mark'
    , unicode: '2018'
    , html   : '&lsquo;'
    , mac    : 'option ]'
    }
  , {
      name   : 'right single quotation mark'
    , unicode: '2019'
    , html   : '&rsquo;'
    , mac    : 'option shift ]'
    }
  , {
      name   : 'left double quotation mark'
    , unicode: '201c'
    , html   : '&ldquo;'
    , mac    : 'option ['
    }
  , {
      name   : 'right double quotation mark'
    , unicode: '201d'
    , html   : '&rdquo;'
    , mac    : 'option shift ['
    }
  , {
      name   : 'single left-pointing angle quotation mark'
    , unicode: '2039'
    , html   : '&lsaquo;'
    , mac    : 'option shift 3'
    , comment: 'single guillemet'
    }
  , {
      name   : 'single right-pointing angle quotation mark'
    , unicode: '203a'
    , html   : '&rsaquo;'
    , mac    : 'option shift 4'
    , comment: 'single guillemet'
    }
  , {
      name   : 'left-pointing double angle quotation mark'
    , unicode: '00ab'
    , html   : '&laquo;'
    , mac    : 'option \\'
    , comment: 'guillemet'
    }
  , {
      name   : 'right-pointing double angle quotation mark'
    , unicode: '00bb'
    , html   : '&raquo;'
    , mac    : 'option shift \\'
    , comment: 'guillemet'
    }
  ] }
, { group: 'Spaces', points: [
    {
      name   : 'space'
    , unicode: '0020'
    , mac    : 'spacebar'
    , comment: 'character not shown (not parsed in HTML)'
    , is_annotated: true
    }
  , {
      name   : 'no-break space'
    , unicode: '00a0'
    , html   : '&nbsp;'
    , mac    : 'option spacebar'
    , comment: 'character annotated to show width'
    , is_annotated: true
    }
  , {
      name   : 'en space'
    , unicode: '2002'
    , html   : '&ensp;'
    , comment: 'character annotated to show width'
    , is_annotated: true
    }
  , {
      name   : 'em space'
    , unicode: '2003'
    , html   : '&emsp;'
    , comment: 'character annotated to show width'
    , is_annotated: true
    }
  , {
      name   : 'figure space'
    , unicode: '2007'
    , comment: 'numerical space. character annotated to show width'
    , is_annotated: true
    }
  , {
      name   : 'zero width space'
    , unicode: '200b'
    , comment: 'character not shown (has no width)'
    , is_annotated: true
    }
  ] }
, { group: 'Dashes', points: [
    {
      name   : 'hyphen-minus'
    , unicode: '002d'
    , mac    : '-'
    , comment: 'commonly used in place of U+2010'
    }
  , {
      name   : 'hyphen'
    , unicode: '2010'
    , html   : '&hyphen;'
    }
  , {
      name   : 'figure dash'
    , unicode: '2012'
    }
  , {
      name   : 'en dash'
    , unicode: '2013'
    , html   : '&ndash;'
    , mac    : 'option -'
    }
  , {
      name   : 'em dash'
    , unicode: '2014'
    , html   : '&mdash;'
    , mac    : 'option shift -'
    }
  , {
      name   : 'soft hyphen'
    , unicode: '00ad'
    , html   : '&shy;'
    , is_annotated: true
    }
  ] }
, { group: 'Slashes', points: [
    {
      name   : 'solidus'
    , unicode: '002f'
    , mac    : '/'
    }
  , {
      name   : 'reverse solidus'
    , unicode: '005c'
    , mac    : '\\'
    }
  , {
      name   : 'fraction slash'
    , unicode: '2044'
    , html   : '&frasl;'
    , mac    : 'option shift 1'
    }
  , {
      name   : 'division slash'
    , unicode: '2215'
    }
  ] }
, { group: 'Accents & Other Punctuation', points: [
    {
      name   : 'acute accent'
    , unicode: '00b4'
    , mac    : 'option e'
    , comment: 'letter modifier'
    }
  , {
      name   : 'grave accent'
    , unicode: '0060'
    , mac    : '`'
    , comment: '<kbd>option `</kbd> letter modifier'
    }
  , {
      name   : 'cirumflex accent'
    , unicode: '005e'
    , mac    : 'shift 6'
    }
  , {
      name   : '???'
    , unicode: ''
    , mac    : 'option i'
    , comment: 'letter modifier'
    }
  , {
      name   : 'diaeresis'
    , unicode: '00a8'
    , mac    : 'option u'
    , comment: 'letter modifier'
    }
  , {
      name   : 'tilde'
    , unicode: '007e'
    , mac    : 'shift `'
    }
  , {
      name   : '???'
    , unicode: ''
    , mac    : 'option n'
    , comment: 'letter modifier'
    }
  , {
      name   : 'inverted exclamation mark'
    , unicode: '00a1'
    , html   : '&iexcl;'
    , mac    : 'option 1'
    }
  , {
      name   : 'inverted question mark'
    , unicode: '00bf'
    , html   : '&iquest;'
    , mac    : 'option shift /'
    }
  ] }
, { group: 'Miscellaneous Text Symbols', points: [
    {
      name   : 'modifier letter apostrophe'
    , unicode: '02bc'
    , comment: 'it has been suggested this replace U+2019 for contraction apostrophes'
    }
  , {
      name   : 'asterisk'
    , unicode: '002a'
    , mac    : 'shift 8'
    }
  , {
      name   : 'ampersand'
    , unicode: '0026'
    , html   : '&amp;'
    , latex  : '\\And'
    , mac    : 'shift 7'
    }
  , {
      name   : 'vertical line'
    , unicode: '007c'
    , mac    : 'shift \\'
    , comment: 'pipe / bar'
    }
  , {
      name   : 'horizontal ellipsis'
    , unicode: '2026'
    , html   : '&hellip;'
    , latex  : '\\dots'
    , mac    : 'option ;'
    }
  , {
      name   : 'bullet'
    , unicode: '2022'
    , html   : '&bull;'
    , mac    : 'option 8'
    }
  , {
      name   : 'black small square'
    , unicode: '25aa'
    }
  , {
      name   : 'section sign'
    , unicode: '00a7'
    , html   : '&sect;'
    , mac    : 'option 6'
    }
  , {
      name   : 'pillcrow sign'
    , unicode: '00b6'
    , html   : '&para;'
    , mac    : 'option 7'
    , comment: 'paragraph'
    }
  , {
      name   : 'copyright sign'
    , unicode: '00a9'
    , html   : '&copy;'
    , mac    : 'option g'
    }
  , {
      name   : 'registered sign'
    , unicode: '00ae'
    , html   : '&reg;'
    , mac    : 'option r'
    }
  , {
      name   : 'trade mark sign'
    , unicode: '2122'
    , html   : '&trade;'
    , mac    : 'option 2'
    }
  , {
      name   : 'ditto mark'
    , unicode: '3003'
    }
  ] }
, { group: 'Arrows', points: [
    {
      name   : 'leftwards arrow'
    , unicode: '2190'
    , html   : '&larr;'
    , latex  : '\\leftarrow'
    }
  , {
      name   : 'rightwards arrow'
    , unicode: '2192'
    , html   : '&rarr;'
    , latex  : '\\rightarrow or \\to'
    , comment: 'approaches'
    }
  , {
      name   : 'left right arrow'
    , unicode: '2194'
    , html   : '&harr;'
    , latex  : '\\leftrightarrow'
    }
  , {
      name   : 'upwards arrow'
    , unicode: '2191'
    , html   : '&uarr;'
    , latex  : '\\uparrow'
    }
  , {
      name   : 'downwards arrow'
    , unicode: '2193'
    , html   : '&darr;'
    , latex  : '\\downarrow'
    }
  , {
      name   : 'up down arrow'
    , unicode: '2195'
    , latex  : '\\updownarrow'
    }
  , {
      name   : 'leftwards double arrow'
    , unicode: '21d0'
    , html   : '&lArr;'
    , latex  : '\\Leftarrow or \\impliedby'
    }
  , {
      name   : 'rightwards double arrow'
    , unicode: '21d2'
    , html   : '&rArr;'
    , latex  : '\\Rightarrow or \\implies'
    , comment: 'material implication'
    }
  , {
      name   : 'left right double arrow'
    , unicode: '21d4'
    , html   : '&hArr;'
    , latex  : '\\Leftrightarrow or \\iff'
    , comment: 'material equivalence'
    }
  , {
      name   : 'upwards double arrow'
    , unicode: '21d1'
    , html   : '&uArr;'
    , latex  : '\\Uparrow'
    , comment: 'alternative denial'
    }
  , {
      name   : 'downwards double arrow'
    , unicode: '21d3'
    , html   : '&dArr;'
    , latex  : '\\Downarrow'
    , comment: 'joint denial'
    }
  , {
      name   : 'up down double arrow'
    , unicode: '21d5'
    , latex  : '\\Updownarrow'
    }
  , {
      name   : 'rightwards arrow from bar'
    , unicode: '21a6'
    , latex  : '\\mapsto'
    , comment: 'function'
    }
  , {
      name   : 'rightwards two headed arrow'
    , unicode: '21a0'
    , comment: 'injection'
    }
  , {
      name   : 'rightwards arrow with tail'
    , unicode: '21a3'
    , comment: 'surjection'
    }
  , {
      name   : 'left right arrow with vertical stroke'
    , unicode: '21f9'
    , comment: 'bijection'
    }
  ] }
, { group: 'Miscellaneous Technical Symbols', points: [
    {
      name   : 'place of interest sign'
    , unicode: '2318'
    , mac    : 'command'
    }
  , {
      name   : 'option key'
    , unicode: '2325'
    , mac    : 'option'
    }
  , {
      name   : 'up arrowhead'
    , unicode: '2303'
    , mac    : 'control'
    , comment: 'control key (Mac)'
    }
  ] }
, { group: 'Mathematical Delimiters', points: [
    {
      name   : 'mathematical left angle bracket'
    , unicode: '27e8'
    , latex  : '\\langle'
    , comment: 'bra'
    }
  , {
      name   : 'mathematical right angle bracket'
    , unicode: '27e9'
    , latex  : '\\rangle'
    , comment: 'ket'
    }
  , {
      name   : 'mathematical left double angle bracket'
    , unicode: '27ea'
    }
  , {
      name   : 'mathematical right double angle bracket'
    , unicode: '27eb'
    }
  , {
      name   : 'left ceiling'
    , unicode: '2308'
    , html   : '&lceil;'
    , latex  : '\\lceil'
    }
  , {
      name   : 'right ceiling'
    , unicode: '2309'
    , html   : '&rceil;'
    , latex  : '\\rceil'
    }
  , {
      name   : 'left floor'
    , unicode: '230a'
    , html   : '&lfloor;'
    , latex  : '\\lfloor'
    }
  , {
      name   : 'right floor'
    , unicode: '230b'
    , html   : '&rfloor;'
    , latex  : '\\rfloor'
    }
  ] }
, { group: 'Binary Relations — Logic', points: [
    {
      name   : 'logical or'
    , unicode: '2228'
    , html   : '&or;'
    , latex  : '\\lor'
    , comment: 'disjunction'
    }
  , {
      name   : 'logical and'
    , unicode: '2227'
    , html   : '&and;'
    , latex  : '\\land'
    , comment: 'conjunction'
    }
  , {
      name   : 'right tack'
    , unicode: '22a2'
    , latex  : '\\vdash'
    , comment: 'forward syntactic consequence'
    }
  , {
      name   : 'left tack'
    , unicode: '22a3'
    , latex  : '\\dashv'
    , comment: 'backward syntactic consequence'
    }
  , {
      name   : 'left and right tack'
    , unicode: '27db'
    , comment: 'logical equivalence; <code>\\dashv\\vdash</code>'
    }
  , {
      name   : 'models'
    , unicode: '22a7'
    , comment: 'forward semantic consequence (1)'
    }
  , {
      name   : 'true'
    , unicode: '22a8'
    , latex  : '\\models or \\vDash'
    , comment: 'forward semantic consequence (2)'
    }
  ] }
, { group: 'Binary Relations — Set Theory', points: [
    {
      name   : 'element of'
    , unicode: '2208'
    , html   : '&isin;'
    , latex  : '\\in'
    }
  , {
      name   : 'not element of'
    , unicode: '2209'
    , html   : '&notin;'
    , latex  : '\\notin or \\not\\in'
    }
  , {
      name   : 'has element'
    , unicode: '220b'
    , html   : '&ni;'
    , latex  : '\\owns'
    }
  , {
      name   : 'proper subset'
    , unicode: '2282'
    , html   : '&sub;'
    , latex  : '\\subset'
    }
  , {
      name   : 'proper superset'
    , unicode: '2283'
    , html   : '&sup;'
    , latex  : '\\superset'
    }
  , {
      name   : 'subset'
    , unicode: '2286'
    , html   : '&sube;'
    , latex  : '\\subseteq'
    }
  , {
      name   : 'superset'
    , unicode: '2287'
    , html   : '&supe;'
    , latex  : '\\superseteq'
    }
  , {
      name   : 'not proper subset'
    , unicode: '2284'
    , html   : '&nsub;'
    , latex  : '\\notsubset'
    }
  , {
      name   : 'not proper superset'
    , unicode: '2285'
    , html   : '&nsup;'
    , latex  : '\\notsuperset'
    }
  , {
      name   : 'union'
    , unicode: '222a'
    , html   : '&cup;'
    , latex  : '\\cup'
    }
  , {
      name   : 'intersection'
    , unicode: '2229'
    , html   : '&cap;'
    , latex  : '\\cap'
    }
  ] }
, { group: 'Binary Relations — Arithmetic', points: [
    {
      name   : 'not equal to'
    , unicode: '2260'
    , html   : '&ne;'
    , latex  : '\\ne'
    , mac    : 'option ='
    }
  , {
      name   : 'approximate'
    , unicode: '2248'
    , html   : '&asymp;'
    , latex  : '\\approx'
    , mac    : 'option x'
    }
  , {
      name   : 'less-than sign'
    , unicode: '003c'
    , html   : '&lt;'
    , latex  : '\\lt'
    , mac    : 'shift ,'
    , comment: 'also used in HTML source'
    }
  , {
      name   : 'greater-than sign'
    , unicode: '003e'
    , html   : '&gt;'
    , latex  : '\\gt'
    , mac    : 'shift .'
    , comment: 'also used in HTML source'
    }
  , {
      name   : 'less than or equal to'
    , unicode: '2264'
    , html   : '&le;'
    , latex  : '\\le'
    , mac    : 'option ,'
    }
  , {
      name   : 'greater than or equal to'
    , unicode: '2265'
    , html   : '&ge;'
    , latex  : '\\ge'
    , mac    : 'option .'
    }
  , {
      name   : 'precedes'
    , unicode: '227a'
    , latex  : '\\prec'
    , comment: 'injection into'
    }
  , {
      name   : 'succeeds'
    , unicode: '227b'
    , latex  : '\\succ'
    , comment: 'surjection onto'
    }
  , {
      name   : 'precedes above single-line equals sign'
    , unicode: '2aaf'
    , latex  : '\\preceq'
    }
  , {
      name   : 'succedes above single-line equals sign'
    , unicode: '2ab0'
    , latex  : '\\succeq'
    }
  , {
      name   : 'precedes or equal to'
    , unicode: '227c'
    , latex  : '\\preccurlyeq'
    }
  , {
      name   : 'succeeds or equal to'
    , unicode: '227d'
    , latex  : '\\succcurlyeq'
    }
  , {
      name   : 'minus sign'
    , unicode: '2212'
    , html   : '&minus;'
    , latex  : '-'
    , comment: 'same width as en dash; use hyphen in \\(\\LaTeX\\)'
    }
  , {
      name   : 'plus-minus sign'
    , unicode: '00b1'
    , html   : '&plusmn;'
    , latex  : '\\pm'
    , mac    : 'option shift ='
    }
  , {
      name   : 'minus-or-plus sign'
    , unicode: '2213'
    , latex  : '\\mp'
    }
  , {
      name   : 'dot operator'
    , unicode: '22c5'
    , html   : '&sdot;'
    , latex  : '\\cdot'
    , comment: 'dot product'
    }
  , {
      name   : 'cross product'
    , unicode: '00d7'
    , html   : '&times;'
    , latex  : '\\times'
    }
  , {
      name   : 'divide'
    , unicode: '00f7'
    , html   : '&divide;'
    , latex  : '\\div'
    , mac    : 'option /'
    }
  , {
      name   : 'low asterisk'
    , unicode: '2217'
    , html   : '&lowast;'
    , latex  : '\\ast'
    }
  , {
      name   : 'pound'
    , unicode: '0023'
    , html   : '#'
    , latex  : '\\#'
    , mac    : 'shift 3'
    }
  , {
      name   : 'circled plus'
    , unicode: '2295'
    , html   : '&oplus;'
    , latex  : '\\oplus'
    }
  , {
      name   : 'circled times'
    , unicode: '2297'
    , html   : '&otimes;'
    , latex  : '\\otimes'
    }
  ] }
, { group: 'Binary Relations — Geometry', points: [
    {
      name   : 'identical to'
    , unicode: '2261'
    , html   : '&equiv;'
    , latex  : '\\equiv'
    , comment: 'general equivalnce'
    }
  , {
      name   : 'approximately equal to'
    , unicode: '2245'
    , html   : '&cong;'
    , latex  : '\\cong'
    , comment: 'congruent'
    }
  , {
      name   : 'tilde operator'
    , unicode: '223c'
    , html   : '&sim;'
    , latex  : '\\sim'
    , comment: 'similar'
    }
  , {
      name   : 'proportional to'
    , unicode: '221d'
    , html   : '&prop;'
    , latex  : '\\varpropto'
    }
  , {
      name   : 'parallel to'
    , unicode: '2225'
    }
  , {
      name   : 'perpendicular'
    , unicode: '27c2'
    , latex  : '\\perp'
    , comment: 'see U+22a5 for <code>&amp;perp;</code>'
    }
  ] }
, { group: 'Functions', points: [
    {
      name   : 'not sign'
    , unicode: '00ac'
    , html   : '&not;'
    , latex  : '\\lnot'
    , mac    : 'option l'
    , comment: 'logical not'
    }
  , {
      name   : 'there exists'
    , unicode: '2203'
    , html   : '&exist;'
    , latex  : '\\exists'
    }
  , {
      name   : 'for all'
    , unicode: '2200'
    , html   : '&forall;'
    , latex  : '\\forall'
    }
  , {
      name   : 'complement'
    , unicode: '2201'
    , latex  : '\\complement'
    }
  , {
      name   : 'no break here'
    , unicode: '0083'
    , html   : '&fnof;'
    , mac    : 'option f'
    , comment: 'function of'
    }
  , {
      name   : 'square root'
    , unicode: '221a'
    , html   : '&radic;'
    , latex  : '\\sqrt'
    , mac    : 'option v'
    }
  , {
      name   : 'summation'
    , unicode: '2211'
    , html   : '&sum;'
    , latex  : '\\sum'
    , mac    : 'option w'
    }
  , {
      name   : 'product'
    , unicode: '220f'
    , html   : '&prod;'
    , latex  : '\\prod'
    , mac    : 'option shift p'
    }
  , {
      name   : 'partial'
    , unicode: '2202'
    , html   : '&part;'
    , latex  : '\\partial'
    , mac    : 'option d'
    }
  , {
      name   : 'integral'
    , unicode: '222b'
    , html   : '&int;'
    , latex  : '\\int'
    , mac    : 'option b'
    }
  , {
      name   : 'nabla'
    , unicode: '2207'
    , html   : '&nabla;'
    }
  ] }
, { group: 'Miscellaneous Mathematical Symbols', points: [
    {
      name   : 'down tack'
    , unicode: '22a4'
    , latex  : '\\top'
    , comment: 'tautology'
    }
  , {
      name   : 'up tack'
    , unicode: '22a5'
    , html   : '&perp;'
    , latex  : '\\bot'
    , comment: 'contradiction; see U+27c2 for perpendicular'
    }
  , {
      name   : 'therefore'
    , unicode: '2234'
    , html   : '&there4;'
    , latex  : '\\therefore'
    , comment: 'punctuation (not relation)'
    }
  , {
      name   : 'because'
    , unicode: '2235'
    , latex  : '\\because'
    , comment: 'punctuation (not relation)'
    }
  , {
      name   : 'empty set'
    , unicode: '2205'
    , html   : '&empty;'
    , latex  : '\\varnothing'
    }
  , {
      name   : 'infinity'
    , unicode: '221e'
    , html   : '&infin;'
    , latex  : '\\infty'
    , mac    : 'option 5'
    }
  , {
      name   : 'angle'
    , unicode: '2220'
    , html   : '&ang;'
    , latex  : '\\angle'
    }
  , {
      name   : 'degree'
    , unicode: '00b0'
    , html   : '&deg;'
    , mac    : 'option k'
    }
  , {
      name   : 'prime'
    , unicode: '2032'
    , html   : '&prime;'
    , latex  : '\\prime'
    }
  , {
      name   : 'double prime'
    , unicode: '2033'
    , html   : '&Prime;'
    , latex  : '\\Prime'
    }
  , {
      name   : 'triple prime'
    , unicode: '2034'
    }
  , {
      name   : 'script capital p'
    , unicode: '2118'
    , html   : '&weierp;'
    , latex  : '\\wp'
    , comment: 'Weierstrass p'
    }
  ] }
, { group: 'Foreign Letters', points: [
    {
      name   : 'Latin capital letter AE'
    , unicode: '00c6'
    , html   : '&AElig;'
    , mac    : 'option shift \''
    }
  , {
      name   : 'Latin small letter AE'
    , unicode: '00e6'
    , html   : '&aelig;'
    , mac    : 'option \''
    }
  , {
      name   : 'Latin small letter N with tilde'
    , unicode: '00f1'
    , html   : '&ntilde;'
    , mac    : 'option n n'
    }
] }
, { group: 'Greek Letters', points: [
    {
      name   : 'Greek capital letter Alpha'
    , unicode: '0391'
    , html   : '&Alpha;'
    , latex  : '\\Alpha'
    }
  , {
      name   : 'Greek capital letter Beta'
    , unicode: '0392'
    , html   : '&Beta;'
    , latex  : '\\Beta'
    }
  , {
      name   : 'Greek capital letter Gamma'
    , unicode: '0393'
    , html   : '&Gamma;'
    , latex  : '\\Gamma'
    }
  , {
      name   : 'Greek capital letter Delta'
    , unicode: '0394'
    , html   : '&Delta;'
    , latex  : '\\Delta'
    }
  , {
      name   : 'Greek capital letter Epsilon'
    , unicode: '0395'
    , html   : '&Epsilon;'
    , latex  : '\\Epsilon'
    }
  , {
      name   : 'Greek capital letter Zeta'
    , unicode: '0396'
    , html   : '&Zeta;'
    , latex  : '\\Zeta'
    }
  , {
      name   : 'Greek capital letter Eta'
    , unicode: '0397'
    , html   : '&Eta;'
    , latex  : '\\Eta'
    }
  , {
      name   : 'Greek capital letter Theta'
    , unicode: '0398'
    , html   : '&Theta;'
    , latex  : '\\Theta'
    }
  , {
      name   : 'Greek capital letter Iota'
    , unicode: '0399'
    , html   : '&Iota;'
    , latex  : '\\Iota'
    }
  , {
      name   : 'Greek capital letter Kappa'
    , unicode: '039a'
    , html   : '&Kappa;'
    , latex  : '\\Kappa'
    }
  , {
      name   : 'Greek capital letter Lambda'
    , unicode: '039b'
    , html   : '&Lambda;'
    , latex  : '\\Lambda'
    }
  , {
      name   : 'Greek capital letter Mu'
    , unicode: '039c'
    , html   : '&Mu;'
    , latex  : '\\Mu'
    }
  , {
      name   : 'Greek capital letter Nu'
    , unicode: '039d'
    , html   : '&Nu;'
    , latex  : '\\Nu'
    }
  , {
      name   : 'Greek capital letter Xi'
    , unicode: '039e'
    , html   : '&Xi;'
    , latex  : '\\Xi'
    }
  , {
      name   : 'Greek capital letter Omicron'
    , unicode: '039f'
    , html   : '&Omicron;'
    , latex  : '\\Omicron'
    }
  , {
      name   : 'Greek capital letter Pi'
    , unicode: '03a0'
    , html   : '&Pi;'
    , latex  : '\\Pi'
    }
  , {
      name   : 'Greek capital letter Rho'
    , unicode: '03a1'
    , html   : '&Rho;'
    , latex  : '\\Rho'
    }
  , {
      unicode: '03a2'
    }
  , {
      name   : 'Greek capital letter Sigma'
    , unicode: '03a3'
    , html   : '&Sigma;'
    , latex  : '\\Sigma'
    }
  , {
      name   : 'Greek capital letter Tau'
    , unicode: '03a4'
    , html   : '&Tau;'
    , latex  : '\\Tau'
    }
  , {
      name   : 'Greek capital letter Upsilon'
    , unicode: '03a5'
    , html   : '&Upsilon;'
    , latex  : '\\Upsilon'
    }
  , {
      name   : 'Greek capital letter Phi'
    , unicode: '03a6'
    , html   : '&Phi;'
    , latex  : '\\Phi'
    }
  , {
      name   : 'Greek capital letter Chi'
    , unicode: '03a7'
    , html   : '&Chi;'
    , latex  : '\\Chi'
    }
  , {
      name   : 'Greek capital letter Psi'
    , unicode: '03a8'
    , html   : '&Psi;'
    , latex  : '\\Psi'
    }
  , {
      name   : 'Greek capital letter Omega'
    , unicode: '03a9'
    , html   : '&Omega;'
    , latex  : '\\Omega'
    }
  , {
      name   : 'Greek small letter alpha'
    , unicode: '03b1'
    , html   : '&alpha;'
    , latex  : '\\alpha'
    }
  , {
      name   : 'Greek small letter beta'
    , unicode: '03b2'
    , html   : '&beta;'
    , latex  : '\\beta'
    }
  , {
      name   : 'Greek small letter gamma'
    , unicode: '03b3'
    , html   : '&gamma;'
    , latex  : '\\gamma'
    }
  , {
      name   : 'Greek small letter delta'
    , unicode: '03b4'
    , html   : '&delta;'
    , latex  : '\\delta'
    }
  , {
      name   : 'Greek small letter epsilon'
    , unicode: '03b5'
    , html   : '&epsilon;'
    , latex  : '\\epsilon'
    }
  , {
      name   : 'Greek small letter zeta'
    , unicode: '03b6'
    , html   : '&zeta;'
    , latex  : '\\zeta'
    }
  , {
      name   : 'Greek small letter eta'
    , unicode: '03b7'
    , html   : '&eta;'
    , latex  : '\\eta'
    }
  , {
      name   : 'Greek small letter theta'
    , unicode: '03b8'
    , html   : '&theta;'
    , latex  : '\\theta'
    }
  , {
      name   : 'Greek small letter iota'
    , unicode: '03b9'
    , html   : '&iota;'
    , latex  : '\\iota'
    }
  , {
      name   : 'Greek small letter kappa'
    , unicode: '03ba'
    , html   : '&kappa;'
    , latex  : '\\kappa'
    }
  , {
      name   : 'Greek small letter lambda'
    , unicode: '03bb'
    , html   : '&lambda;'
    , latex  : '\\lambda'
    }
  , {
      name   : 'Greek small letter mu'
    , unicode: '03bc'
    , html   : '&mu;'
    , latex  : '\\mu'
    }
  , {
      name   : 'Greek small letter nu'
    , unicode: '03bd'
    , html   : '&nu;'
    , latex  : '\\nu'
    }
  , {
      name   : 'Greek small letter xi'
    , unicode: '03be'
    , html   : '&xi;'
    , latex  : '\\xi'
    }
  , {
      name   : 'Greek small letter omicron'
    , unicode: '03bf'
    , html   : '&omicron;'
    , latex  : '\\omicron'
    }
  , {
      name   : 'Greek small letter pi'
    , unicode: '03c0'
    , html   : '&pi;'
    , latex  : '\\pi'
    }
  , {
      name   : 'Greek small letter rho'
    , unicode: '03c1'
    , html   : '&rho;'
    , latex  : '\\rho'
    }
  , {
      name   : 'Greek small letter final sigma'
    , unicode: '03c2'
    , latex  : '\\varsigma'
    }
  , {
      name   : 'Greek small letter sigma'
    , unicode: '03c3'
    , html   : '&sigma;'
    , latex  : '\\sigma'
    }
  , {
      name   : 'Greek small letter tau'
    , unicode: '03c4'
    , html   : '&tau;'
    , latex  : '\\tau'
    }
  , {
      name   : 'Greek small letter upsilon'
    , unicode: '03c5'
    , html   : '&upsilon;'
    , latex  : '\\upsilon'
    }
  , {
      name   : 'Greek small letter phi'
    , unicode: '03c6'
    , html   : '&phi;'
    , latex  : '\\phi'
    }
  , {
      name   : 'Greek small letter chi'
    , unicode: '03c7'
    , html   : '&chi;'
    , latex  : '\\chi'
    }
  , {
      name   : 'Greek small letter psi'
    , unicode: '03c8'
    , html   : '&psi;'
    , latex  : '\\psi'
    }
  , {
      name   : 'Greek small letter omega'
    , unicode: '03c9'
    , html   : '&omega;'
    , latex  : '\\omega'
    }
  ] }
]
