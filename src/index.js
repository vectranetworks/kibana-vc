const deploy = require('./deploy').deploy
const args = require('commander')
  .option('deploy', 'diff current kibana dashboards with latest version, and deploy artifact')
  .option('elasticUrl [type]', 'the ES url to use to connect')
  .option('--dry-run', `don't make any changes to anything`)
  .parse(process.argv)

if(args.deploy) {
  deploy(args.elasticUrl, args.dryRun)
}
