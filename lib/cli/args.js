const yargs = require('yargs')
const pkg = require('../../package.json')

const argv = yargs.detectLocale(false)
  .usage('Usage: $0 [path] [options]')
  .option('directory', {
    alias: 'd',
    describe: 'A cool directory to be served',
    demand: false,
    default: './routes'
  })
  .option('open', {
    alias: 'o',
    describe: 'Open your browser at the served page',
    demand: false,
    default: false
  })
  .option('port', {
    alias: 'p',
    describe: 'A cool port for your exprexo',
    demand: false,
    default: null
  })
  .option('silent', {
    alias: 's',
    describe: 'Make this exprexo in silence',
    demand: false,
    boolean: true,
    default: false,
    group: 'mode'
  })
  .option('verbose', {
    describe: 'Make this exprexo loud as hell',
    demand: false,
    boolean: true,
    default: false,
    group: 'mode'
  })
  .help()
  .version()
  .epilogue(`For more information, find exprexo at ${pkg.homepage}`)
  .argv

const options = Object.assign(
  {},
  argv,
  {
    directory: argv._[0] || argv.directory
  })

module.exports = options
