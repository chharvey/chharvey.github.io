
window.customElements.define('x-contactlink', require('./XContactLink.class.js'))
window.customElements.define('x-skill', require('./XSkill.class.js'))
window.customElements.define('x-position', require('./XPosition.class.js'))
window.customElements.define('x-city', require('./XCity.class.js'))
window.customElements.define('x-award', require('./XAward.class.js'))

// let vctm_summary = {
//   "dates"  : "<time>2011</time>&ndash;<time>2014</time>",
//   "content": [
//     "<span itemscope=\"\" itemtype=\"http://schema.org/EducationalOrganization\">",
//       "<abbr class=\"c-Acro\" title=\"Virginia Council of Teachers of Mathematics\" itemprop=\"name\"><span class=\"c-Acro__First\">V</span>CTM</abbr>",
//       " Conferences, annually statewide (<time datetime=\"PT40H\">10 hr each</time>)",
//     "</span>"
//   ]
// }

$('#prof-dev > dl > dd:nth-of-type(1)').after(`
  <x-award>
    <dates><time>2011</time>&ndash;<time>2014</time></dates>
    <text>
      <span itemscope="" itemtype="http://schema.org/EducationalOrganization">
        <abbr class="c-Acro" title="Virginia Council of Teachers of Mathematics" itemprop="name"><span class="c-Acro__First">V</span>CTM</abbr>
        Conferences, annually statewide (<time datetime="PT40H">10 hr each</time>)
      </span>
    </text>
  </x-award>
`)
