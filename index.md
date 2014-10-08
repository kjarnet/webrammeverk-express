---
layout: default
---

## Følg disse stegene for å sette opp et prosjekt klart for Express workshop-en:

0. Installer [node](http://nodejs.org).
1. Sett opp ditt favoritt IDE for JavaScript utvikling. Tips:
    * IntelliJ har plugins for JavaScript og Node
      (jeg har satt opp et node-prosjekt for IntelliJ som jeg har sjekket inn i git-repo).
    * Det finnes plugins for JavaScript-linteren "JSHint" for de fleste editorer.
      IntelliJ har støtte for dette gjennom JavaScript-pluginet.
2. Installer [Node-Inspector](https://github.com/node-inspector/node-inspector) for debugging.
    * Installeres via pakkehåndtereren til node, "npm".
    * npm installerer som default pakker lokalt til mappa `node_modules` i current directory.
    For å installere globalt må du bruke parameteret `-g` eller `--global`.
    (I ubuntu og osx må du kjøre kommandoen med sudo for å installere globalt.)
    * `sudo npm install -g node-inspector`
    * Node-Inspector fungerer kun med webkit-baserte browsere (Chrome, Opera, Safari ...)
      og bruker [Chrome DevTools](https://developer.chrome.com/devtools).
3. Klon git-repoet: `git clone https://github.com/kjarnet/webrammeverk-express.git`
4. Hvis du vil deploye til Heroku:
    * Installer [Heroku toolbelt](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
    * Lag en ny heroku-app.
    * legg til heroku som remote for git-repoet: `heroku git:remote -a din-heroku-app`.
5. Installer prosjektets avhengigheter.
    * npm bruker [package.json](http://browsenpm.org/package.json)
    fila til å beskrive avhengigheter.
    * `npm install` installerer pakker beskrevet i "dependencies" og "devDependencies"
    til `node_modules` mappa.
    * Avhengighetene definert for dette prosjektet er
        * [mocha](http://visionmedia.github.io/mocha/), [chai](http://chaijs.com/) og [supertest](https://github.com/visionmedia/supertest) for enhetstesting
        * [debug](https://github.com/visionmedia/debug) for logging
        * [hogan (hjs)](http://twitter.github.io/hogan.js/) templating
        * [mongoose](http://mongoose.com/) MongoDB klient
        * og express.
6. Kjør tester
    * npm kan også kjøre kommandoer definert i "scripts" i package.json.
    * `npm test` bruker testrunner-en "mocha" til å kjøre testene under test/-folderen.
    * Dokumentasjon for testrammeverk: [mocha](http://visionmedia.github.io/mocha/) (test-runner-en),
      [chai](http://chaijs.com/api/bdd/) (assertion-biblioteket) og
      [supertest](https://github.com/visionmedia/supertest) (routes-test-hjelper).
    * Mocha kan kjøres kontinuerlig, og vil da kjøre testene på nytt hver gang en fil endres:
      `./node_modules/mocha/bin/mocha -w`.
    * Du kan også installere mocha globalt for å slippe `./node_modules/mocha/bin` foran "mocha":
      `sudo npm install -g mocha`
7. Start node-programmet.
    * `npm start` kjører todoapp.js i node.
    * Dette starter en http-server på [port 3000](http://localhost:3000).
8. Debug programmet med [Chrome DevTools](https://developer.chrome.com/devtools):
    * `node-debug /bin/www` kjører todoapp.js via via node-inspector.
    * Åpne [http://127.0.0.1:8080/debug?port=5858](http://127.0.0.1:8080/debug?port=5858)
    i Chrome.
    * For å debugge enhetstestene:
        * kjør `./node_modules/mocha/bin/mocha --debug-brk`.
        * Åpne en ny terminal og kjør `node-inspector`.
        * Åpne [http://127.0.0.1:8080/debug?port=5858](http://127.0.0.1:8080/debug?port=5858)
        i Chrome. Den vil da være pauset på første linje i mocha-test-runneren.
        * Åpne test-fila du vil debugge, sett en breakpoint og klikk "Resume" (F8).
9. Vi vil bruke [MongoDB](http://mongodb.org) som lager.
   Jeg har satt opp en server alle kan bruke,
   men hvis du har lyst kan du installere lokalt.




