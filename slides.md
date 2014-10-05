---
layout: slides
---

# Backbone Erfaringsrapport

## fra "stor" (8 500 LOC) web-applikasjon.

Notes:
8 500 kodelinjer

*   Ekskl. tester og templates
*   (kun Models, Collections og Views)
*   Fordelt på 179 filer
*   Og 5 sider / dialoger
*   Sammenlikn med andre js-prosjekter
    * jQuery: 46.7 K
    * AngularJS: 178 K
    * Backbone: 26.5 K
    * Grunt: 4.03 K
    * Underscore: 20.3 K
    * Jasmine: 10.7 K
    * Meteor: 112 K
    

---

## Bakgrunn

bilde placeholder.

Notes:
Jeg tenkte snakke litt om **NSB Lisa-prosjektet**,
der vi holder på å **skrive om**
flere av **administrasjons-grensesnittene**
fra "tykke" **swing-klienter**
til **web-applikasjoner**.

Lisa er **NSBs salgs og prissystem**
og vi har bl.a. grensesnitt for å **administrere**
* priser på billetter
* lovlige kombinasjoner,
* overganger
* passasjerkategorier

Da jeg kom inn på prosjektet i fjor sommer
var de fleste admin-klientene **implementert** i
**Swing** og et rammeverk som heter **Genova**.

Genova **genererer** dialoger automatisk fra **database-strukturen**,
og **resultatet** blir da ikke så forskjellig fra å **redigere** i databasen **direkte**.
NSB ville nå ha et mer **intuitivt** grensesnitt
hvor det var enklere å **se helheten**,
og da benytta man sjansen til å droppe gamle, kjedelige teknologier
og gå for en mer **moderne webapp**,
(siden vi jo alle vet at JavaScript er framtida).

Så man gikk igang og lagde noen **mindre webapps**,
og også **én større**
der man brukte et **hjemmesnekra mvc-bibliotek**
og ingen andre **tredjeparts biblioteker** enn **JQuery**.
Dette fungerte forsåvidt bra,
men det som blei litt **vanskelig**
var å holde en **ryddig struktur**
når flere views **basert på samme data** skulle **holdes synkrone**.

Så, i fjor sommer, blei jeg hanka inn for å hjelpe til å lage
en **prototyp** med JavaScript biblioteket **Backbone**
for å se om det kunne egne seg.
Jeg fikk med meg **Kenneth** på laget,
og så skulle vi lage et ny grensesnitt for
administrasjon av Periodebilletter.


--

## Domenemodell

bilde placeholder

Notes:

Jeg hadde da endel **erfaring** med Backbone fra **KF-prosjektet**,
men det var nok ganske **enkle sider**
i forhold til de som skulle lages for Lisa.

**Strukturen** på periodebilletter i Lisa er relativt komplisert,
og å lage en dialog som gir en **god oversikt** er ikke helt rett fram.
Bl.a. har periodebilletter endel **relasjoner**
som kun er **gyldige** innenfor en **gitt tidsperiode**.
F.eks. har de en liste med **tillatte passasjerkategorier**.
Hvilke passasjerkategorier som **gjelder** for en periodebillett
kan **variere over tid**.
I tillegg har hver passasjerkategori **detaljer**
som også kan variere over tid.

En av webappene som allerede var laget
hadde en **liknende struktur**
og der hadde man brukt en **"tidslinje"**
hvor du kan velge en dato for å få et **"øyeblikksbilde"**
av periodebilletten på det valgte tidspunktet.
Dette **forenklet** grensesnittet mye
og ga den **oversikten** man var ute etter,
så dette blei **tatt med** til periodebillett-dialogen.


---

## Demo

Notes:
Vis PasKat spesielt.

---

## Teknologier

* Serverside:
    * JAX-RS
    * Velocity
    * Hibernate
    * ...
* Klientside (JavaScript):
    * Backbone
    * Jasmine
    * Require
    * JQuery
    * Lodash (underscore replacement)
    * moment

Notes:
Teknologistacken vi bruker for web-klientene ser sånn her ut:

På serversida bruker vi ganske standard opplegg
som jeg ikke har tenkt å si så veldig mye om.
Vi bruker JAX-RS for Rest-tjenestene som server dataene i JSON-format,
og Velocity for å rendre enkle html-sider.
Hibernate for database-aksess
og en masse annet som ikke er så relevant.

På klient-siden bruker vi
Backbone for å strukturere javascript-en (etter MVC-patternet).
Vi bruker Jasmine for enhetstester,
og Require for å holde orden på filer og avhengigheter.
JQuery kjenner alle,
Lodash er et "nytte-bibliotek"
med masse "funksjonell-(programmering-)stil" funksjoner
for Arrays o.l.
JQuery (zepto) og Lodash er avhengigheter/ krav for Backbone.
Moment er et fint, lite bibliotek for å jobbe med datoer.

Jeg tenkte skippe/ignorere server-sida
og fokusere på de tre første av javascript-bibliotekene
siden jeg regner med disse er ganske ukjente for noen av dere/ her.

---
## Hva er Backbone.js?

MVC + Observer pattern


Notes:
Backbone er et relativt **lite bibliotek** (6.5kb, Packed and gzipped)
og kan ikke egentlig kalles et "rammeverk",
og det var egentlig litt av grunnen til at vi valgte det,
da man har litt mer kontroll enn om man
knytter seg til et altomfattende rammeverk som Angular.
Det er ment å bruke som "ryggraden" i appen din
for å gi den en god struktur og unngå spaghetti-kode.
Den legger opp til at du følger MVC pattern
og har endel nyttige funksjoner for å bruke
Observer-pattern (som går godt sammen med dette).
I tillegg gir det støtte for kommunikasjon med en REST-backend
og har en klient-side "router" for å la deg navigere(?)
i appen med url-er (bokmerker, browser-historikk, etc.).

Selve rendringa av websida,
og kommunikasjon mellom modell og view
holder Backbone seg unna,
men gir noen støttefunksjoner og konvensjoner
man kan velge å bruke.

---

## Require.js

Module loader

Notes:
Require er et bibliotek som laster inn javascript filene dine
etterhvert som de trengs basert på avhengigheter du definerer inne i hver enkelt fil.
Kort sagt betyr det at du kan erstatte dette:
... -->

--

## Require.js

Før:

```
<!-- Libs -->
<skript src="felles/libs/moment-2.5.1.js"></skript>
<skript src="felles/libs/el.js"></skript>
<skript src="felles/utils/constants.js"></skript>
<skript src="felles/utils/functional.js"></skript>
<skript src="felles/libs/lodash-2.4.1.js"></skript>
<skript src="felles/libs/backbone-1.1.2.js"></skript>
<skript src="felles/utils/backbonemixins.js"></skript>
<skript src="felles/utils/functions.js"></skript>
<skript src="felles/utils/datofunctions.js"></skript>

<!-- Models and collections -->
<skript src="felles/models/templatedata.js"></skript>
<skript src="felles/models/basemodel.js"></skript>
<skript src="felles/collections/basecollection.js"></skript>
<skript src="felles/models/referanse.js"></skript>
<skript src="felles/collections/referanser.js"></skript>
<skript src="felles/collections/sortedarray.js"></skript>
<skript src="felles/models/relationalmodel.js"></skript>
<skript src="felles/models/dato.js"></skript>
<skript src="felles/collections/datoer.js"></skript>
<skript src="felles/models/datokobling.js"></skript>
<skript src="felles/collections/datokoblinger.js"></skript>
<skript src="felles/models/diffmodel.js"></skript>
<skript src="periodebilletter/models/feedback.js"></skript>
<skript src="periodebilletter/collections/feedbacks.js"></skript>
<skript src="periodebilletter/models/rowstate.js"></skript>
<skript src="periodebilletter/collections/rowstates.js"></skript>
<skript src="periodebilletter/models/registerdata.js"></skript>
<skript src="periodebilletter/collections/prisendringer.js"></skript>
<skript src="periodebilletter/models/tillattperbill.js"></skript>
<skript src="periodebilletter/collections/tillattperbiller.js"></skript>
<skript src="periodebilletter/models/tillattpaskat.js"></skript>
<skript src="periodebilletter/collections/tillattpaskater.js"></skript>
<skript src="periodebilletter/collections/nooverlapdatokoblinger.js"></skript>
<skript src="periodebilletter/models/kanalkobling.js"></skript>
<skript src="periodebilletter/collections/kanalkoblinger.js"></skript>
<skript src="periodebilletter/models/tilslutningkobling.js"></skript>
<skript src="periodebilletter/collections/tilslutningkoblinger.js"></skript>
<skript src="periodebilletter/models/produktversjon.js"></skript>
<skript src="periodebilletter/collections/produktversjoner.js"></skript>
<skript src="periodebilletter/models/ekortkonfigurasjon.js"></skript>
<skript src="periodebilletter/models/periodebillett.js"></skript>
<skript src="periodebilletter/collections/periodebilletter.js"></skript>
<skript src="tilslutninger/collections/tilslutninger.js"></skript>

<!-- Templates -->
<skript src="felles/templates/additemtmpl.js"></skript>
<skript src="felles/templates/editdatoertmpl.js"></skript>
<skript src="felles/templates/additemselecttmpl.js"></skript>
<skript src="felles/templates/showkoblingtmpl.js"></skript>
<skript src="periodebilletter/templates/additemdoubleselecttmpl.js"></skript>
<skript src="periodebilletter/templates/listperbillertmpl.js"></skript>
<skript src="periodebilletter/templates/showperbilltmpl.js"></skript>
<skript src="periodebilletter/templates/addperbilltmpl.js"></skript>
<skript src="periodebilletter/templates/showekortkonfigurasjontmpl.js"></skript>
<skript src="periodebilletter/templates/editekortkonfigurasjontmpl.js"></skript>
<skript src="periodebilletter/templates/editperbilldetailstmpl.js"></skript>
<skript src="periodebilletter/templates/showperbilldetailstmpl.js"></skript>
<skript src="periodebilletter/templates/editkoblingtmpl.js"></skript>
<skript src="periodebilletter/templates/showkanaldetailstmpl.js"></skript>
<skript src="periodebilletter/templates/editkanaldetailstmpl.js"></skript>
<skript src="periodebilletter/templates/editkanalkoblingtmpl.js"></skript>
<skript src="periodebilletter/templates/showkanalkoblingtmpl.js"></skript>
<skript src="periodebilletter/templates/listeditkanalkoblingertmpl.js"></skript>
<skript src="periodebilletter/templates/listedittilslutningkoblingertmpl.js"></skript>
<skript src="periodebilletter/templates/editkoblingerforperbilltmpl.js"></skript>
<skript src="periodebilletter/templates/showkoblingerforperbilltmpl.js"></skript>
<skript src="periodebilletter/templates/showprisertmpl.js"></skript>
<skript src="periodebilletter/templates/editprisertmpl.js"></skript>
<skript src="periodebilletter/templates/edittillattperbilltmpl.js"></skript>
<skript src="periodebilletter/templates/showtillattperbilltmpl.js"></skript>
<skript src="periodebilletter/templates/showpaskattmpl.js"></skript>
<skript src="periodebilletter/templates/editpaskattmpl.js"></skript>
<skript src="periodebilletter/templates/showproduktversjonertmpl.js"></skript>
<skript src="periodebilletter/templates/editproduktversjonertmpl.js"></skript>
<skript src="periodebilletter/templates/showproduktversjonelementtmpl.js"></skript>

<!-- Views -->
<skript src="felles/views/baseview.js"></skript>
<skript src="felles/views/additem.js"></skript>
<skript src="felles/views/listview.js"></skript>
<skript src="felles/views/sortedlistview.js"></skript>
<skript src="felles/views/showdatoelement.js"></skript>
<skript src="felles/views/listdatoer.js"></skript>
<skript src="felles/views/editdatoer.js"></skript>
<skript src="felles/views/showdiff.js"></skript>
<skript src="felles/views/listgroupsview.js"></skript>
<skript src="felles/views/additemselect.js"></skript>
<skript src="felles/views/showkobling.js"></skript>
<skript src="periodebilletter/views/showfeedback.js"></skript>
<skript src="periodebilletter/views/listfeedbacks.js"></skript>
<skript src="periodebilletter/views/details-tab/showekortkonfigurasjon.js"></skript>
<skript src="periodebilletter/views/details-tab/showperbilldetails.js"></skript>
<skript src="periodebilletter/views/details-tab/editekortkonfigurasjon.js"></skript>
<skript src="periodebilletter/views/details-tab/editperbilldetails.js"></skript>
<skript src="periodebilletter/views/pris-tab/showtillattperbill.js"></skript>
<skript src="periodebilletter/views/pris-tab/edittillattperbill.js"></skript>
<skript src="periodebilletter/views/pris-tab/showpaskat.js"></skript>
<skript src="periodebilletter/views/pris-tab/listshowpaskater.js"></skript>
<skript src="periodebilletter/views/pris-tab/editpaskat.js"></skript>
<skript src="periodebilletter/views/pris-tab/listeditpaskater.js"></skript>
<skript src="periodebilletter/views/pris-tab/showpriser.js"></skript>
<skript src="periodebilletter/views/pris-tab/addtillattpaskat.js"></skript>
<skript src="periodebilletter/views/pris-tab/editpriser.js"></skript>
<skript src="periodebilletter/views/kobling-tab/showtilslutningkobling.js"></skript>
<skript src="periodebilletter/views/kobling-tab/edittilslutningkobling.js"></skript>
<skript src="periodebilletter/views/kobling-tab/showkanaldetails.js"></skript>
<skript src="periodebilletter/views/kobling-tab/editkanaldetails.js"></skript>
<skript src="periodebilletter/views/kobling-tab/showkanalkobling.js"></skript>
<skript src="periodebilletter/views/kobling-tab/editkanalkobling.js"></skript>
<skript src="periodebilletter/views/kobling-tab/addtilslutningkobling.js"></skript>
<skript src="periodebilletter/views/kobling-tab/listshowtilslutningkoblinger.js"></skript>
<skript src="periodebilletter/views/kobling-tab/listedittilslutningkoblinger.js"></skript>
<skript src="periodebilletter/views/kobling-tab/listshowkanalkoblinger.js"></skript>
<skript src="periodebilletter/views/kobling-tab/addkanalkobling.js"></skript>
<skript src="periodebilletter/views/kobling-tab/listeditkanalkoblinger.js"></skript>
<skript src="periodebilletter/views/kobling-tab/showkoblingerforperbill.js"></skript>
<skript src="periodebilletter/views/kobling-tab/editkoblingerforperbill.js"></skript>
<skript src="periodebilletter/views/produktversjoner-tab/showproduktversjoner.js"></skript>
<skript src="periodebilletter/views/produktversjoner-tab/editproduktversjoner.js"></skript>
<skript src="periodebilletter/views/produktversjoner-tab/listproduktversjontabell.js"></skript>
<skript src="periodebilletter/views/showperbill.js"></skript>
<skript src="periodebilletter/views/addperbill.js"></skript>
<skript src="periodebilletter/views/listperbiller.js"></skript>

<skript src="main.js"></skript>
```

Notes:
med dette:
... -->


--

## Require.js

Etter: 

```
<skript data-main="main" src="libs/require-2.1.11.js"></skript>
```

Notes:
Altså, istedet for å liste opp alle javascript-filene dine i script tags,
inkluderer du bare require, og gir den en peker til
fila som er "startpunktet" for appen din,
tenk main-metoden i Java.

--
## Require.js

I hver fil:

```
define(
    ["felles/views/showdiff",
     "prisadministrasjon/billettgrupper/models/billgrperiode",
     "prisadministrasjon/billettgrupper/collections/billgrperioder",
     "prisadministrasjon/billettgrupper/templates/priser-tab/editbillgrperiodetmpl"],
    function (ShowDiff, BillGrPeriode, BillGrPerioder, editBillGrPeriodeTmpl) {

        ... <Din kode> ...

    });
``` 

Notes:
For å få dette til å funke må du da i hver av javascript-filene dine
wrappe koden din i et "define" kall
hvor du lister opp (definerer??) alle andre filer den koden er avhengig av
(tenk imports i Java).

Med den første webappen vår brukte vi ikke require,
og det er denne det første eksempelet her er hentet fra.
Det er 118 javascript-filer
og de har avhengigheter seg imellom,
som gjør at også rekkefølgen på taggene er viktig.
Denne lista må vi også duplisere i Jamine-testene,
og fordi endel av filene deles mellom flere webapps
ville disse også måtte dupliseres i hver av de 4 webappene våre.

Grunnen til at vi lot være å bruke require i begynnelsen
var at jeg hadde hatt litt problemer med det da vi brukte det i et KF-prosjekt,
men da vi skulle begynne på 3dje webappen
og dupliserte importen av alle felles-filene for sjette gang
innså vi at vi måtte innføre require allikevel.

For å gjøre overgangen litt gradvis
har vi beholdt den gamle import-metoden for de to første webappene,
og brukt noe som heter Universal Module Definition (UMD) for felles-filene,
som gjør at de kan brukes både med den gamle import-metoden
og med Require.


---

## Jasmine

Enhetstest av JavaScript

Maven plugin

Notes:
Vi har brukt Jasmine for enhetstesting av JavaScript-en.
Dette har en maven-plugin,
og kan vise resultater i browseren,
eller på kommandolinja.
Det gjør at du kan kjøre javascript-testene
som en del av de vanlige enhetstestene
med f.eks. `maven test`
eller du kan kjøre de kontinuerlig i browseren
mens du utvikler.

Enhetstesting har vært veldig nyttig,
kanskje spesielt fordi JavaScript er veldig dynamisk (typet)
og "tilgivende".
Derfor har vi antakelig nesten full testdekning av modellene våre,
der "buisiness logikken" ligger,
men viewene har vært vanskelig å teste.
For selv om vi har prøvd å følge alle regler
for å få løst sammensatte views
er det avhengigheter som er vanskelig å bli kvitt,
og mye asynkron kode som også gjør ting litt vanskeligere.

---

## Problemer/ Utfordringer

Nøstede modeller:


```javascript
{
    navn: "NSB Månedsbillett",
    rettTilParkering: false,
    salgskanal: {
        navn: "nsb.no",
        kanSelges: true
    }
}
```

Notes:

Vi endte opp med å "blåse"(?/overgå) estimat med MASSE,
så det er ikke tvil om at vi har hatt endel problemer.

Det at domenet var såpass komplekst
har helt klart vært (hoved) årsaken til (de største) problemene.
Vi undervuderte hvor mye / hva dette betydde
for kompleksiteten på dialogen/ grensesnittet
når flere views skulle holdes synkrone
og valideringer måtte gjøres på tvers
av flere relaterte modeller og views.

Vi prøvde å holde viewene så
løst sammensatt som mulig,
noe som er veldig viktig for
testbarhet, gjenbruk og generelt vedlikeholdbarhet.

Her hjelper Backbone mye
med forskjellige støtte-strukturer(?)
for MVC- og Observer-pattern-ene.

Men på ett viktig felt falt Backbone gjennom (for vår del),
og det var på støtte for nøstede modeller.

(Med nøstede modeller mener jeg
 at du har en modell med felter du skal overvåke
 (reagere på endringer)
 der et/flere av feltene er en annen modell
 med egne felter som også skal overvåkes.)

Dette har rett og slett ikke Backbone (støtte for).
Det virker som Backbone er tiltenkt/ tiltenkt/ passer best for
enkle modeller som er uavhengige av hverandre
og lagres hver for seg.
Det passet ikke så bra med hvordan vi hadde tenkt
å gjøre validering og lagring av et helt hierarki
av relaterte modeller samtidig.

--

## RelationalModel

```

    /**
     * Model: RelationalModel
     * Base model to use when working with nested models.
     * Relations are attached _directly_ to the model instead of to the attributes-attribute,
     * so toJSON is _not_ recursive and events must be manually forwarded.
     * Parsing, on the other hand, _is_ recursive.
     * @class
     * @extends BaseModel
     */
    var RelationalModel = BaseModel.extend(
        /** @lends RelationalModel# */
        {

            /**
             * For all attributes that contains data that you want wrapped in a backbone Model or Collection,
             * this map(/object) should have an attribute with the same name,
             * and it's value an object with the following attribues:
             * {
             *  ctor:           "constructor to use when wrapping the object",
             *  options:        "options to pass to the contstructor (optional)",
             *  url:            "url to the server resource, relative to the parent's (this) url (optional, butif a url is not
             *                  provided, the model/collection itself must provide one to be able to sync with the server.)",
             *  propagateEvents:"array of event-types (strings) that should be propagated from the relation to this."
             *  defaultValue:   "an object to use to initialize a new child-model if the incoming relation is null/undefined.
             *                  Be very careful with using this, as it will change the model already on initialization.
             *                  Also, should probably never be anything other than null or an empty object or array
             *                  as attributes of this object would override defaults defined in the actual class."
             * }
             * Instead of a map, this can also be a function returning a map.
             * The relational data itself is stored in each instance's "relationModels" attribute,
             * which is a map in which the keys are the attribute-name of the relation and the values are the related model/collection.
             *
             */
            relationDefs: {},

            getRelationDefs: function(){
                return _.result(this, "relationDefs");// if relations is a function, return the result of calling it.
            },

            getRelationDef: function(relationName) {
                return this.getRelationDefs()[relationName];
            },

            /**
             * Get a related Model, or the hash of all related models if no relationName is given.
             * @param [relationName] The attribute to which the relation is connected. Drop this to return the hash of all related models.
             * @returns {*}
             */
            getRel: function(relationName) {
                if(this._relationModels){
                    if(relationName) {
                        return this._relationModels[relationName];
                    }
                    return this._relationModels;
                }
            },

            /**
             * Set a related Model. Also updates the corresponding (non-relational) attribute
             * with the model's relationalId.
             * @param relationName The name of the relational attribute to change.
             * @param model The new value.
             * @param {Object} [options] Options to be passed to "set" (such as "silent").
             */
            setRel: function(relationName, model, options) {
                var relationModels = this._relationModels || {};
                options = options || {};
                if (options.parse) {
                    model = new (this.getRelationDef(relationName).ctor)(model);
                }
                if (model !== null) {
                    this.setupSubmodel(model, this.getRelationDef(relationName), relationName);
                }
                var oldRel = this.getRel(relationName);
                if (oldRel){
                    this.cleanupSubModel(oldRel);
                }
                relationModels[relationName] = model;
                this._relationModels = relationModels;
                this.set(relationName, (model ? model.getRelationalId() : model), options);
            },

            setupSubmodel: function (subModel, relationDef, relationName) {
                this._addSubmodelEventListeners(subModel, relationDef.propagateEvents);
                this._addSubModelValidateListener(subModel, relationName);
                subModel.relationalParent = (subModel.relationalParent || this); // Only add relationalParent if it doesn't have one already, to make behaviour consistent with Collections
                subModel.relationUrl = (relationDef.url || subModel.relationUrl); // If no url is defined, keep it's existing (if any)
            },

            cleanupSubModel: function (subModel) {
                //subModel.destroy(); // TODO: consider triggering destroy-event to give views a chance to clean up (calling destroy triggers a DELETE server-call wich is not appropriate).
                subModel.trigger("destroy");
                this.stopListening(subModel);
                if(subModel.relationalParent === this) {
                    subModel.relationalParent = null;
                }
            },

            /**
             * Wraps the relational data in backbone models or collections
             * and attaches them to this._relationModels.
             * The data (neither original or wrapped) is not
             * stored in the attributes-attribute, but is replaced with the sub-mdel's id.
             * This is called before the model is populated with data from the server;
             * if you want it to be called during normal initialization,
             * you have to pass "parse:true" as option to the constructor.
             * @param response the raw data object from the server.
             * @param options
             * @returns {Object} The modified attributes (the original attributes minus the relational ones that are attached directly to this model).
             */
            parse: function (response, options) {
                var relationModels = this._relationModels || {};
                var modelData = _.cloneDeep(response);
                _.forOwn(this.getRelationDefs(), function (relationDef, relationName) { // TODO: Move all this to setRel() and use that instead. This is too much duplicated code!
                    var subModelData = modelData[relationName];
                    if(!subModelData && relationDef.defaultValue){ // set default value, but take care not to change null to undefined or vice versa.
                        subModelData = relationDef.defaultValue;
                    }
                    var opts = _.extend({parse: true}, relationDef.options, options); // parse the new object as well in case of multiple nested layers.
                    var subModel = relationModels[relationName];
                    if (subModelData && subModel) { // Pre-existing submodel and new subModelData -> Set new data on existing submodel
                        subModel.set(subModel.parse(subModelData, opts), opts);
                    }else if (subModelData){ // No pre-existing submodel but new subModelData -> initialize a new model and attach new data
                        subModel = new relationDef.ctor(subModelData, opts);
                        this.setupSubmodel(subModel, relationDef, relationName);
                        relationModels[relationName] = subModel;
                    } else if (subModel){ // Pre-existing submodel but NO new subModelData -> delete existing subModel
                        relationModels[relationName] = subModelData;
                        modelData[relationName] = subModelData; // For relations, we want undeclared attributes to be declared but undefined, so the relation-placeholder gets updated (to undefined).
                        this.cleanupSubModel(subModel);
                    } else {
                        relationModels[relationName] = subModelData; // subModelData is null or undefined - set relation-model to match.
                    }
                    if(subModelData) {modelData[relationName] = subModel.getRelationalId();} // Replace the subModel's data in this.attributes with the subModel's id to make it possible to detect when a subModel is switched out with another.
                }, this);
                this._relationModels = relationModels;
                return this._super("parse", [modelData, options]);
            },



            /**
             * Adds listeners for events of all of eventTypes from theModel.
             * @param theModel The model to listen for events from.
             * @param eventTypes A list of events to listen for. Pass ["all"] to listen for all events.
             * @private
             */
            _addSubmodelEventListeners: function(theModel, eventTypes) {
                // Add listeners for events that are to be propagated (re-triggered on this model).
                _.each(eventTypes, function (eventType) {
                    var propEvent = function() {
                        var argsArray = _.toArray(arguments);
                        if(eventType !== "all"){ // if we listenTo "all", the event name is passed as the first argument...
                            argsArray.unshift(eventType); // ...else, we have to push it our selves.
                        }
                        this.trigger.apply(this, argsArray);
                    };
                    this.listenTo(theModel, eventType, propEvent);
                }, this);
            },

            _addSubModelValidateListener: function (theModel, relationName) {
                var subModelHandler = function (fieldPath) {
                    var argsArray = _.toArray(arguments);
                    fieldPath = relationName + "." + fieldPath;
                    this.handleValidate.apply(this, [fieldPath].concat(argsArray.slice(1))); // The triggered event may be a change-event, but we want to trigger a validate-event.
                };
                this.listenTo(theModel, "validate", subModelHandler);
            },

            toJSON: function () {
                var attrs = this._super("toJSON", arguments);
                // we need to remove relation-data-placeholder as these cause problems when deserializing server-side.
                _.forOwn(this.getRelationDefs(), function (relationDef, relationName) {
                    var relModel = this.getRel(relationName);
                    //if(!relModel) {return;}
                    if(relationDef.url){
                        delete attrs[relationName];
                    } else {
                        attrs[relationName] = relModel ? relModel.toJSON() : relModel;
                    }
                }, this);
                return attrs;
            },

            deepToJSON: function () {
                var recurseToJSON = function(relObj){
                    if(typeof (relObj.deepToJSON) === "function"){   // handle deep relations
                        return relObj.deepToJSON();
                    } else {                                         // handle simple relations
                        return relObj.toJSON();
                    }
                };
                var data = this.toJSON();
                _.forOwn(this._relationModels, function (relObj, relationName) {
                    data[relationName] = (relObj ? recurseToJSON(relObj) : relObj); // if relObj is an object, recurse into it, else, if it's null or undefined, set it to that value.
                }, this);
                return data;
            },

            isChanged: function (attr) {
                var methodName = "isChanged";
                var thisIsChanged = this._super(methodName, [attr]);
                return thisIsChanged || (!attr && this._checkAll(methodName));
            },

            isChangedOrNew: function () {
                return (this.isNew() || this._super("isChanged") || // avoid calling this.isChanged (directly or indirectly) so we don't loop through and check relationModels for both isChanged and isChangedOrNew.
                        this._checkAll("isChangedOrNew"));
            },

            _checkAll: function (methodName) {
                return !!(
                    _.find(this._relationModels, function (model) {
                        return model && model[methodName]();
                    })
                    );
            },

            deepValidate: function () {
                this.validateAll();
                _.forOwn(this._relationModels, function (model) {
                    if(model) {
                        var method = ((typeof model.deepValidate) === "function") ? "deepValidate" : "validateAll";
                        model[method]();
                    }
                });

            },

            deepHasErrors: function () {
                return this.hasErrors() || !!(
                    _.find(this._relationModels, function (model) {
                        if(!model){return false;}
                        var method = ((typeof model.deepHasErrors) === "function") ? "deepHasErrors" : "hasErrors";
                        return model[method]();
                    })
                    );
            },

            deepGetErrors: function () {
                return _.reduce(this._relationModels,
                    function (accErrors, model) {
                        if(!model){return accErrors;}
                        var method = (typeof model.deepGetErrors === "function") ? "deepGetErrors" : "getErrors";
                        return accErrors.concat(model[method]());
                    },
                    this.getErrors());
            },

            /**
             * Recursively saves the whole model-hierarchy from the bottom (leaves) up (to the root).
             * Saving from bottom up avoids the full model being reset with stale data from the server
             * before the child-objects are saved.
             * NB: This can not be used for new models, as the child-models will try to save
             * on a non-existing parent-model.
             * @returns {*}
             */
            recursiveSave: function () {
                var relDefs = this.getRelationDefs();
                var jqxhr = (new $.Deferred()).resolve();
                _.forOwn(this._relationModels, function (relObj, relationName) {
                    if (!relObj || !relDefs[relationName].url || !relObj.isChangedOrNew()) {return;}
                    var saveFn = function() {return relObj.recursiveSave();};
                    jqxhr = jqxhr.then(saveFn);
                }, this);
                var that = this;
                var saveThis = function () {return that._super("recursiveSave", arguments);};
                jqxhr = jqxhr.then(saveThis);
                return jqxhr;
            },

            /**
             * Saves the model using Backbone.save(), but sends the result of this.deepToJSON() as data.
             * Can not be used with option patch=true!
             * @param [options] Options to be passed on to this.save()
             * @returns {Object} The value returned by save(), jqXHR or false if not valid
             */
            deepSave: function (options) {
                if(options && options.patch){
                    throw "RelationalModel.deepSave() can not be used with option patch=true";
                }
                // we can do this because of a shortcut made in Backbone.sync(): https://github.com/jashkenas/backbone/blob/1.0.0/backbone.js#L1148
                // if this shortcut doesn't function in later versions of Backbone, consider setting options.data (and options.contentType) instead.
                var opts = _.extend({attrs: this.deepToJSON()}, options);
                return this.save({}, opts);
            },

            /**
             * Returns a copy of this model with any attributes in the passed attrOverrides
             * overrided with those values.
             * @param {Object} [attrOverrides] An object with the attributes you wish to override in the copy.
             * @returns {RelationalModel} A copy of this
             */
            deepClone: function (attrOverrides) {
                var attrs = _.merge(this.deepToJSON(), attrOverrides);
                return new this.constructor(attrs, {parse: true});
            },

            reset: function () {
                var silent = {silent: true};
                _.forOwn(this._relationModels, function (relObj) {
                    if(typeof relObj.reset === "function") {
                        relObj.reset([], silent);
                    } else {
                        relObj.clear(silent);
                    }
                });
                this.clear(silent);
                var attrs = _.mapValues(this._relationModels, function (obj) {
                    return obj.getRelationalId();
                });
                this.set(attrs, silent);
            }



        }
    );

```

Notes:

Det finnes plugins til Backbone som gir støtte for dette,
men de er ofte store og har sine egne problemer.
Vi endte opp med å heller implementere dette selv,
med en "RelationalModel" klasse
som kan ha mange undernivåer/barn
som kan lagres, valideres og opereres på sammen.
Men denne klassen blei et lite hælvete å vedlikeholde,
og kompleksiteten har bare eksplodert (som dere kan se).

I den neste dialogen/grensesnittet vi skulle lage,
(som jeg holder på med nå),
prøver vi oss derfor med en annen approach
hvor vi holder nivåene uavhengige og lagrer dem hver for seg.

---

## Spørsmål

# ?

Notes:
Presentasjon laget med reveal.js og markdown :)

