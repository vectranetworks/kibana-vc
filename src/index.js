const deploy = require('./deploy')
const args = require('commander')
  .option('deploy', 'diff current kibana dashboards with latest version, and deploy artifact')
  .option('elasticUrl')
  .option('--dry-run', `don't make any changes to anything`)
  .parse(process.argv)

if(args.deploy) {
  deploy(args.dryRun)
}
