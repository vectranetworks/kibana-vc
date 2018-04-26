# Kibana-dashboard

This is a CLI tool that:
* takes care of source controling Kibana dashboards
* Fetching remote Kibana state
* Deploying new Kibana State


## Notes

* Customers would be able to create their own dashboards and new deployment won't affect them
* All the changes customers do on a default Vectra's dashboards would be overwritten when deploying
* If customers want to modify Vectra's dashboard and keep the changes, they will need to clone them. It is easy to do with Kibana, just click Save and tick create new       Dashboard. That will actually clone the dashboard and all the future deployments won't affect cloned Dashboards. Cloned Dashboard won't receive any updates

## Project structure

```
/app
/app/index.js - main CLI script
/app/state.json - state of the kibana. Array of items
/package.json
```

## API

TODO:
* Fetch state from your Kibana (ES)
* Deploy state to remote Kibana (ES)

