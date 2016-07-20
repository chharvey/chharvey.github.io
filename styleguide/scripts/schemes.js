function fontdemo(self) {
  return $(self).closest('.o-Grid').find('.c-FontSamp')
}
$('input[name="fs"]').change(function () {
  fontdemo(this).css('font-style', (this.checked) ? $(this).val() : '')
})
$('input[name="fv"]').change(function () {
  fontdemo(this).css('font-variant', (this.checked) ? $(this).val() : '')
})
$('input[name="fw"]').on('input change', function () {
  var val = $(this).val() // a string
  fontdemo(this).css('font-weight', val)
  var norm = (+val == 400) ? ' (normal)' : ''
  var bold = (+val == 700) ? ' (bold)' : ''
  $(this).siblings('input[type="text"]').val(val + norm + bold)
})
$('.c-FontForm input[type="reset"]').click(function () {
  fontdemo(this).css('font-style', '').css('font-variant','').css('font-weight', '')
})
function showMix(hexvalue) {
  return function () {
    var bg_color = hexvalue || $(this).parents('.js-colorbox').find('.js-rowbc-swatch').attr('value') || '#000000'
    bg_color = Color.newColorHexString(bg_color)
    var overlap = {
      color : $(this).parents('.js-colorbox').attr('data-overlap-color') || '#000000'
    , alpha : $(this).parents('.js-colorbox').attr('data-overlap-alpha') || 0
    , number: $(this).attr('data-overlap-number')                        || 0
    }
    var mix = bg_color.mix(Color.newColorHexString(overlap.color), 1 - Math.pow(1-overlap.alpha, overlap.number))
    $(this).html(mix.toString('hex'))
  }
}
$('.js-mix').each(showMix())
$('.js-rowbc-swatch').change(function () {
  var value = $(this).val()
  $(this).parents('.js-colorbox').css('background-color', value)
  $(this).parents('.js-colorbox').find('.js-mix').each(showMix(value))
})
$('.js-reset-swatch').click(function () {
  var orig = $(this).parents('form').find('.js-rowbc-swatch').attr('value')
  $(this).parents('.js-colorbox').css('background-color', orig)
  $(this).parents('.js-colorbox').find('.js-mix').each(showMix(orig))
})
