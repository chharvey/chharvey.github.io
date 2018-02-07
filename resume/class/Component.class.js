const jsdom = require('jsdom')

/**
 * A Component fills in a given DocumentFragment template with data.
 * @example
 * let template = `<h1><slot name="last">{{ familyName }}</slot>, <slot name="first">{{ givenName }}</slot></h1>`
 * let comp = new Component(template, function (frag, data) {
 *   frag.querySelector('slot[name="last"]' ).textContent = data.familyName
 *   frag.querySelector('slot[name="first"]').textContent = data.givenName
 * })
 * let data = { "@type": "Person", "givenName": "Jane", "familyName": "Smith" }
 * comp.render(data) // returns a DocumentFragment object with the data filled in
 */
class Component {
  /**
   * @summary Construct a new Component object.
   * @param   {(string|DocumentFragment)} template the document fragment or string containing the template; could be an `HTMLTemplateElement#content` object or simply any HTML string
   * @param   {function(DocumentFragment, *):DocumentFragment} renderer modifies the template by filling it in with data, then returns it
   */
  constructor(template, renderer) {
    this._TEMPLATE = (typeof template === 'string') ? jsdom.JSDOM.fragment(template) : template
    this._RENDERER = renderer
  }

  /**
   * @summary Render this component with some data.
   * @param   {*=} data the data to fill
   * @returns {DocumentFragment} the rendered output
   */
  render(data) {
    let frag = this._TEMPLATE.cloneNode(true)
    this._RENDERER.call(null, frag, data)
    return frag
  }
}

module.exports = Component
