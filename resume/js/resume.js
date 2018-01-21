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
  <dt class="o-ListAchv__Award h-Inline" itemprop="award">
    <slot name="text">
      <span itemscope="" itemtype="http://schema.org/EducationalOrganization">
        <abbr class="c-Acro" title="Virginia Council of Teachers of Mathematics" itemprop="name"><span class="c-Acro__First">V</span>CTM</abbr>
        Conferences, annually statewide (<time datetime="PT40H">10 hr each</time>)
      </span>
    </slot>
  </dt>
  <dd class="o-ListAchv__Date h-Inline h-Clearfix">(<slot name="dates"><time>2011</time>&ndash;<time>2014</time></slot>)</dd>
`)
