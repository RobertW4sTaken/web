const //imports
    express = require('express'),
    app = express(),
    fs = require('fs'),
    path = require('path'),
    uuid = require('uuid/v4'),
    bodyParser = require('body-parser'),
    favicon = require('favicon'),
    fetch = require('node-fetch'),
    fetchBase64 = require('fetch-base64'),
    isUrl = require('is-url');

//replaceall
String.prototype.replaceAll = function(search, replacement) {
    const target = this;
    return target.split(search).join(replacement);
};
//static ressources
app.use(express.static('public'));
//body parser
app.use(bodyParser.urlencoded({
    limit: '16mb',
    extended: true
}));
app.use(bodyParser.json())
// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
    response.sendFile(`${__dirname}/views/index.html`);
});
app.get('/wc', (request, response) => {
    response.redirect('/');
});
app.post('/wc', (req, res) => {
    let t = fs.readFileSync("template.mobileconfig", {
        encoding: 'utf8'
    });
    //custom vars
    //homescreen app name
    t = t.replaceAll("{{appname}}", req.body.appname || 'example app');
    //url of the webapp
    t = t.replaceAll("{{url}}", req.body.url.toLowerCase() || 'https://example.com');
    t = t.replaceAll("{{url}}", req.body.url || 'https://example.com');
    //icon (or default (2x2px))
    t = t.replaceAll("{{icon}}", req.body.icon || fs.readFileSync("default.icon", {
        encoding: 'utf8'
    }));
    //developer name
    t = t.replaceAll("{{devname}}", req.body.appname || 'example developer');
    //organization
    t = t.replaceAll("{{organization}}", req.body.organization || 'example organization');
    //profile display name
    t = t.replaceAll("{{payloadname}}", req.body.payloadname || 'example Profile');
    //profile description
    t = t.replaceAll("{{description}}", req.body.description || 'Installs example app');
    //installation message
    t = t.replaceAll("{{message}}", req.body.message || 'Created with webclip.glitch.me\n:)');
    //random uuid (generated)
    const uu = uuid().toUpperCase();
    t = t.replaceAll("{{uuid}}", uu);//uuid, managed{{uuid}}
    //app identifier (generated)
    t = t.replaceAll("{{identifier}}", req.body.identifier || uu);
    //can the user remove the app?
    // t = t.replaceAll("{{removable}}", req.query.removable || 'false');
    //send modified template
    res.setHeader('content-type', 'application/x-apple-aspen-config');
    res.send(t);
});

//request favicon
app.get("/icon", (req, res) => {
    //is valid url?
    if (isUrl(req.query.url))
        //get favicon url from host
        favicon(req.query.url, function(err, favicon_url) {
            if (favicon_url !== null)
                //get actual favicon Url (redirects etc)
                fetch(favicon_url, {
                    redirect: 'follow'
                })
                .then((data) => {
                    //get favicon as base64
                    fetchBase64.remote(data.url).then((data) => {
                        //send base64 to client
                        res.send(data[0]);
                    }).catch((reason) => {});
                }).catch((reason) => {
                    console.log(reason)
                });
            else res.send(null);
        });
    else res.send(null);
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});
