var fs    = require('fs'),
    glob  = require('glob'),
    icons = require('paradigm-icons-partial-handlebars'),
    path  = require('path')

module.exports = (options) => {

  var Handlebars   = options.Handlebars,
      helpersPath  = options.helpersPath,
      partialsPath = options.partialsPath

  var helpers = glob.sync(helpersPath + '/**/*.js', {cwd: process.cwd()})

  helpers.forEach( (helper) => {

    require(path.join(process.cwd(), helper))(Handlebars)

  })

  var partials = glob.sync(partialsPath + '/**/*.hbs')

  partials.forEach( (partial) => {

    var matches = partial.split('.hbs')

    if (!matches) {
      return
    }

    var name = matches[0].replace(partialsPath + '/', '')
    var template = fs.readFileSync(path.join(process.cwd(), partial), 'utf8')

    Handlebars.registerPartial(name, template)

  })

  var partialLoaders = glob.sync(partialsPath + '/**/*.js')

  partialLoaders.forEach( (partialLoader) => {

    require(path.join(process.cwd(), partialLoader))(Handlebars)

  })

  icons({
    Handlebars: Handlebars,
    path: './assets/icons/fontello.svg'
  })

}
