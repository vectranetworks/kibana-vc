# Kibana-dashboard

This is a CLI tool that:
* Source controls Kibana default dashboards
* Fetching remote Kibana state
* Deploying new Kibana state


## Notes

* Customers would be able to create their own dashboards and new deployment won't affect them
* All the changes customers do on a default Vectra's dashboards would be overwritten when deploying
* If customers want to modify Vectra's dashboard and keep the changes, they will need to clone them. It is easy to do with Kibana, just click Save and tick create new Dashboard. That will actually clone the dashboard and all the future deployments won't affect cloned Dashboards. Cloned Dashboard won't receive any updates

## Installation

```
npm i -g @vectraai/kibana-vc
```

## Usage

Run `kibana-vc --help` for a usage explanation

```
kibana-vc --help

  Usage: kibana-vc [options] [command]

  Options:

    -V, --version                     output the version number
    -h, --help                        output usage information

  Commands:

    deploy [options] <stateFilePath>
```

### Fetch

Run `kibana-vc fetch --help`  for a fetch explanation

```
kibana-vc fetch --help

  Usage: fetch [options]

  Options:

    -h, --host [url]                 ElasticSearch host (default: http://127.0.0.1)
    -p, --port [port]                ElasticSearch port (default: 9200)
    -i, --kibanaIndex [kibanaIndex]  Kibana Index (default: .kibana)
    -P, --pretty-print               Pretty Print output
    -h, --help                       output usage information

```

getting the state og the target kibana and writing into the stdout
We can redirect to a file

`kibana-vc fetch > somefilename.json`

Fetch command generate a file ready to be deployed.

### Deploy

Run `kibana-vc deploy --help` for a deploy explanation

```
kibana-vc deploy --help

  Usage: deploy [options] <stateFilePath>

  Options:

    -h, --host [url]                 ElasticSearch host (default: http://127.0.0.1)
    -p, --port [port]                ElasticSearch port (default: 9200)
    -i, --kibanaIndex [kibanaIndex]  Kibana Index (default: .kibana)
    --dry-run                        don't make any changes to anything
    -h, --help                       output usage information
```

#### Examples

Get the state from the remote running Elastic Search. `kibana-vc fetch -h "ELASTIC_HOST" > ${pathToStateFile}`

Deploy to localhost `kibana-vc deploy ${pathToStateFile}`

Deploy to remote running ES
```
kibana-vc deploy -h "ELASTIC_HOST" ${pathToStateFile}
```

## Kibana state file

State file is a json document that represent Kibana state. We are getting it from "Dev" Kibana and version controling it using git (TODO). Example statefile with initial Kibana is located in `src/__tests__/fixtures/kibana_initial_state.json`

## Dev infrastructure

Run `docker-compose up` to spin up local kibana + elasticsearch

## TODO:

- Support S3 as a state storage
- Write statefile in kibana index in a special document for kibana-vc. That way we can track state more easily and be independent of customers changes
- More verbose diff (like tf does)
- Fully featured `dryRun` with initialization support
- Version Control with git
- Fetch Remote State
- Support Multiple config files
- Support Multiple Kibana versions