---
layout: default
---

## Følg disse stegene for å sette opp et prosjekt klart for Express workshop-en:

0. Installer [node](http://nodejs.org).
1. Sett opp ditt favoritt IDE for JavaScript utvikling. Tips:
    * IntelliJ har plugins for JavaScript og Node.
    * Det finnes plugins for JavaScript-linteren "JSHint" for de fleste editorer.
    IntelliJ har støtte for dette gjennom JavaScript-pluginet.
2. Installer Node-Inspector for debugging.
    * Installeres via pakkehåndtereren til node, "npm".
    * npm installerer som default pakker lokalt til mappa `node_modules` i current directory.
    For å installere globalt må du bruke parameteret `-g` eller `--global`.
    (I ubuntu og osx må du kjøre kommandoen med sudo for å installere globalt.)
    * `sudo npm install -g node-inspector`
    * Node-Inspector fungerer kun med webkit-baserte browsere (Chrome, Opera, Safari ...).
3. Klon git-repoet: git clone https://github.com/kjarnet/webrammeverk-express.git
4. Hvis du vil deploye til Heroku:
    * Installer [Heroku toolbelt](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
    * Lag en ny heroku-app.
    * legg til heroku som remote for git-repoet: `heroku git:remote -a din-heroku-app`.
10. Installer prosjektets avhengigheter.
    * npm bruker [package.json](http://browsenpm.org/package.json)
    fila til å beskrive avhengigheter.
    * `npm install` installerer pakker beskrevet i "dependencies" og "devDependencies"
    til `node_modules` mappa.
    * Avhengighetene definert for dette prosjektet er [vows](http://vowsjs.org/)
    for enhetstesting og express.
11. Kjør tester
    * npm kan også kjøre kommandoer definert i "scripts" i package.json.
    * `npm test` bruker testrunner-en "vows" til å kjøre testene i test.js.
12. Start node-programmet.
    * `npm start` kjører index.js i node.
    * Dette starter en http-server på [port 5000](http://localhost:5000).
13. Debug programmet med chrome dev-tools:
    * `npm debug` kjører index.js via via node-inspector.
    * Åpne [http://127.0.0.1:8080/debug?port=5858](http://127.0.0.1:8080/debug?port=5858)
    i Chrome.

