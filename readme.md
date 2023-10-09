# Azure Static Web App with SQL database

[Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/overview) allows you to easily build JavaScript apps in minutes. Use this repo with the [quickstart](https://docs.microsoft.com/azure/static-web-apps/getting-started?tabs=vanilla-javascript) to build and customize a new static site.

[demo](https://wonderful-grass-092600703.3.azurestaticapps.net/)

* create github repo (two branches: dev/prod)
* create static web app (follow instructions in link above) and link the github repo using github actions 
* create sql db and allow the db to be accessed by your ip, and azure apps 
* link the static web app to the sql db
* develop the project locally (on dev branch)
* when everything works locally, merge dev and prod, then push prod
