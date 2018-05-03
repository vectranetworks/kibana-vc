# Kibana-dashboard

This is a CLI tool that:
* takes care of source controling Kibana dashboards
* Fetching remote Kibana state
* Deploying new Kibana State


## Notes

* Customers would be able to create their own dashboards and new deployment won't affect them
* All the changes customers do on a default Vectra's dashboards would be overwritten when deploying
* If customers want to modify Vectra's dashboard and keep the changes, they will need to clone them. It is easy to do with Kibana, just click Save and tick create new Dashboard. That will actually clone the dashboard and all the future deployments won't affect cloned Dashboards. Cloned Dashboard won't receive any updates

## Installation

```
npm i -g @vectraai/kibana-vc
```

## Dev infrastructure

Run `docker-compose up` to spin up local kibana + elasticsearch

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

Deploy to localhost `kibana-vc deploy ${pathToStateFile}`

Deploy to remote running ES
```
kibana-vc deploy -h "ELASTIC_HOST" ${pathToStateFile}
```

## TODO:

- Fetch state from your Kibana (ES)
- Write statefile in kibana index in a special document for kibana-vc. That way we can track state more easily and be independent of customers changes
- More verbose diff (like tf does)
- Fully featured `dryRun` more
- Version Control with git
- Fetch Remote State
- Support Multiple config files
- Support Multiple Kibana versions
