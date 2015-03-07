var fs    = require('fs'),
    glob  = require('glob'),
    icons = require('paradigm-icons-partial-handlebars'),
    path  = require('path')

module.exports = function(options) {

  var assets       = (options.assets || false),
      Handlebars   = options.Handlebars,
      helpersPath  = options.helpersPath,
      partialsPath = options.partialsPath

  // Load helpers
  var helpers = glob.sync(helpersPath + '/**/*.js', {cwd: process.cwd()})

  helpers.forEach( function(helper) {

    require(path.join(process.cwd(), helper))(Handlebars)

  })

  // Load partials
  var partials = glob.sync(partialsPath + '/**/*.hbs')

  partials.forEach( function(partial) {

    var matches = partial.split('.hbs')

    if (!matches) {
      return
    }

    var name = matches[0].replace(partialsPath + '/', '')
    var template = fs.readFileSync(path.join(process.cwd(), partial), 'utf8')

    Handlebars.registerPartial(name, template)

  })

  var partialLoaders = glob.sync(partialsPath + '/**/*.js')

  partialLoaders.forEach( function(partialLoader) {

    require(path.join(process.cwd(), partialLoader))(Handlebars)

  })

  if(assets) {

    // Load icons
    var iconsPath = (options.assetsPath || './assets') + '/icons/fontello.svg'

    icons({
      Handlebars: Handlebars,
      path: iconssPath
    })

  }

}
