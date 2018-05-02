#!/usr/bin/env node

const program = require('commander');
const { deploy } = require('./deploy')

program
  .version('0.0.1')


program
  .command('deploy <stateFilePath>')
  .option('-h, --host [url]', 'ElasticSearch host', 'http://127.0.0.1')
  .option('-p, --port [port]', 'ElasticSearch port', 9200)
  .option('-i, --kibanaIndex [kibanaIndex]', 'Kibana Index', '.kibana')
  .option('--dry-run', `don't make any changes to anything`)
  .action(async (stateFilePath, args) => {
    try {
      await deploy({
        stateFilePath,
        kibanaIndexName: args.kibanaIndexName,
        host: args.host,
        port: args.port,
        dryRun: args.dryRun
      })
    } catch (err) {
      console.error('Error while deploying')
      console.error(err)
      process.exit(1)
    }
  })

program.parse(process.argv);

