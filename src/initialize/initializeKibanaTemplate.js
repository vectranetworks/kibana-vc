const debug = require('debug')('initializeKibanaTemplate')
const generateKibanaIndexTemplate = require('./generateKibanaIndexTemplate')

const doesIndexTemplateExist = async (esClient, templateName) => {
  debug(`Checking does kibana Template exists: ${templateName}`)
  const exist = await esClient.indices.existsTemplate({
    name: templateName
  })
  debug(`Template ${templateName} exists: ${exist}`)
  return exist
}

const createKibanaTemplate = async (esClient, { templateId, template }) => {
  debug(`Creating Kibana Template: ${templateId}`)
  await esClient.indices.putTemplate({
    name: templateId,
    body: template
  })
  debug(`Created Kibana Template: ${templateId}`)
  return true
}

const initializeKibanaTemplate = async (esClient, { kibanaIndexName, dryRun }) => {
  debug(`Initializing Kibana Template with Index name: ${kibanaIndexName}`)
  const templateData = generateKibanaIndexTemplate(kibanaIndexName)
  if (!await doesIndexTemplateExist(esClient, templateData.templateId)) {
    await createKibanaTemplate(esClient, templateData)
  }
  return true
}

module.exports = {
  initializeKibanaTemplate
}
