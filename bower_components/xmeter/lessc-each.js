
// This module takes a groups of files, filters out the non-less files,
// then compiles all the less files into their css counterparts.
//
// Run `node  lessc-each.js  <dir1>  <dir2>` to activate.
// @param `<dir1>` - the directory of files to compile
// @param `<dir2>` - the directory for output files to go
//
// Issues:
//
// 1. This program converts the file contents into a string and uses `less.render()`
//    on that string, so the urls inside the less file, which are relative to the
//    file contents, will not get parsed correctly.
//    One temporary workaround would be to run `node lessc-each.js <dir1> <dir2>`
//    from inside `<dir1>`, but then make `<dir2>` relative to `<dir1>`.
//
//    Example: Running
//
//        $ node  lessc-each.js  ./src/  ./out/
//
//    from inside `/` (main repo directory).
//    In the contents of `./src/_base.generic.less`, there is an `@import url('_settings.less');`,
//    which is meant to import the `_settings.less` file inside `./src/`.
//    When `less.render()` parses the string, it’s going to look for `./_settings.less`
//    inside the current directory, and won’t find it (because it’s in `./src/`).
//    So to work around this, you might run
//
//        $ cd  ./src/
//        $ node  lessc-each.js  ./  ../out/
//
//    This method has not been tested, nor am I going to spend much time testing it
//    as it is merely a HACK and not an actual fix of the problem.


var
    fs = require('fs')
  , path = require('path')
  , less = require('less')


fs.readdir(process.argv[2], function (err, files) {
  if (err) return console.error('There was an error: ', err)

  var less_files = files.filter(function (el) {

    var ext = path.parse(el).ext
    var name = path.parse(el).name
    return (ext === '.less') && (name.slice(0,5) === '_base')
  })

  less_files.forEach(function (el) {
    var less_fullpath = path.normalize(process.argv[2] + '/' + el)
    var css_fullpath  = path.normalize(process.argv[3] + '/' + el.slice(0, el.length-5) + '.css')

    fs.readFile(less_fullpath, 'utf8', function (err, data) {
      if (err) return console.error('There was an error: ', err)
      less.render(data, function (error, output) {
        if (error) {
          console.error('FATAL! ' + less_fullpath + ' does NOT compile due to:' + '\n    ' + error.message)
          console.log('Continuing to next file...')
        } else {
          fs.writeFile(css_fullpath, output.css, function (err, data) {
            if (err) return console.error('There was an error: ', err)
            console.log('Success! ' + less_fullpath + ' > ' + css_fullpath)
          })
        }
      })
    })
  })
})
