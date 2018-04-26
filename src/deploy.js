const elasticsearch = require('elasticsearch')

function deploy(elasticUrl = process.env.ELASTIC_URL, dryRun) {
  const esClient = new elasticsearch.Client({
    host: elasticUrl,
    apiVersion: '6.2',
    log: 'error',
    sniffOnStart: true
  })

  esClient.ping({
    requestTimeout: 1000
  }, (error) => {
    if (error) {
      console.trace('elasticsearch cluster is down!');
    } else {
      console.log('All is well');
    }
  })
}

module.exports = deploy
