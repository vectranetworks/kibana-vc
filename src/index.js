#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const { deploy } = require('./deploy')
const { fetch } = require('./fetch')
const { version } = require('../package')

program
  .version(version)

program
  .command('deploy <stateFilePath>')
  .option('-h, --host [url]', 'ElasticSearch host', 'http://127.0.0.1')
  .option('-p, --port [port]', 'ElasticSearch port', 9200)
  .option('-i, --kibanaIndex [kibanaIndex]', 'Kibana Index', '.kibana')
  .option('--dry-run', 'Dry run without making any changes', false)
  .action(async (stateFilePath, args) => {
    try {
      await deploy({
        stateFilePath,
        kibanaIndexName: args.kibanaIndex,
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

program
  .command('fetch')
  .option('-h, --host [url]', 'ElasticSearch host', 'http://127.0.0.1')
  .option('-p, --port [port]', 'ElasticSearch port', 9200)
  .option('-i, --kibanaIndex [kibanaIndex]', 'Kibana Index', '.kibana')
  .option('-P, --pretty-print', 'Pretty Print output', false)
  .action(async (args) => {
    try {
      await fetch({
        kibanaIndexName: args.kibanaIndex,
        host: args.host,
        port: args.port,
        dryRun: args.dryRun,
        prettyPrint: args.prettyPrint
      })
    } catch (err) {
      console.error('Error while fetching Kibana state')
      console.error(err)
      process.exit(1)
    }
  })

program.command('*')
  .action(function (env) {
    console.error(chalk.red(`Unrecognized command "${env}"`))
    program.outputHelp()
  })

program.parse(process.argv)
if (!process.argv[2]) {
  program.outputHelp()
}
