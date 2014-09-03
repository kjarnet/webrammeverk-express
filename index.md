---
layout: default
---

## Følg disse stegene for å sette opp et prosjekt klart for Express workshop-en:

1. Installer [node](http://nodejs.org)
2. Hvis du vil deploye til Heroku: [Heroku toolbelt](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
3. +Installer [yeoman](http://yeoman.io)?+
4. Installer +grunt+/gulp/+broccoli+ (sjekk [denne](http://jbavari.github.io/JavascriptBuildSystemShowdown/)
    * Installeres via pakkehåndtereren til node, "npm".
    * npm installerer som default pakker lokalt til mappa `node_modules` i current directory.
    For å installere globalt må du bruke parameteret `-g` eller `--global`.
    (I ubuntu og osx må du kjøre kommandoen med sudo for å installere globalt.)
    * Eks. `sudo npm install -g gulp`
5. Installer Node-Inspector for debugging.
    * `sudo npm install -g node-inspector`
6. Installer nodeunit/mocha+should/vows for enhetstesting.
7. Klon git-repoet 
8. (if heroku:) Lag en ny heroku-app.
9. (if heroku:) legg til heroku som remote: `heroku git:remote -a din-heroku-app`.
10. Installer prosjektets avhengigheter.
    * npm bruker [package.json](http://browsenpm.org/package.json)
    fila til å beskrive avhengigheter.
    * `npm install` installerer pakker beskrevet i "dependencies" og "devDependencies"
    til `node_modules` mappa.
11. Kjør tester
    * npm kan også kjøre kommandoer definert i "scripts" i package.json.
    * `npm test` bruker testrunner-en "vows" til å kjøre testene i test.js.
12. Start node-programmet.
    * `npm start` kjører index.js i node.
    * Dette starter en http-server på [port 5000](http://localhost:5000).

