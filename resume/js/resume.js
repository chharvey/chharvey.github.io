const xjs   = require('extrajs')
const Award = require('../class/Award.class.js')

let vctm_summary = {
  "dates"  : "<time>2011</time>&ndash;<time>2014</time>",
  "content": [
    "<span itemscope=\"\" itemtype=\"http://schema.org/EducationalOrganization\">",
      "<abbr class=\"c-Acro\" title=\"Virginia Council of Teachers of Mathematics\" itemprop=\"name\"><span class=\"c-Acro__First\">V</span>CTM</abbr>",
      " Conferences, annually statewide (<time datetime=\"PT40H\">10 hr each</time>)",
    "</span>"
  ]
}

// copied from `Resume.class.js`:
function _content(x) { return (xjs.Object.typeOf(x) === 'array') ? x.join('') : x }
function newAward(d) { return new Award(d.dates, _content(d.content)) }
$('#prof-dev > dl > dd:nth-of-type(1)').after(newAward(vctm_summary).view())
