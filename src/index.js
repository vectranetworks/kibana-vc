const deploy = require('./deploy').deploy
const args = require('commander')
  .option('deploy', 'diff current kibana dashboards with latest version, and deploy artifact')
  .option('elasticUrl [value]', 'the ES url to use to connect')
  .option('stateFile [value]', 'the file that contains the latest state')
  .option('--dry-run', `don't make any changes to anything`)
  .parse(process.argv)

if(args.deploy) {
  deploy(args.stateFile, args.elasticUrl, args.dryRun)
}
