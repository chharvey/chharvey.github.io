(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1]);
