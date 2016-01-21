# Guestbird alpha

## How to run
This app uses Meteor. If you never used meteor, it would be recommended to read a bit how it works: https://www.meteor.com/.

- Install (meteor)[meteor.com].
- Go to app folder `cd app`.
- Set your own setting file copying the sample file `cp settings-sample.json settings.json`.
- run meteor with settings `meteor run --settings settings.json`

NOTE: settings.json is on gitignore for a reason. Never commit a settings file to a repo!

The app using subdomains as routes, so what you'll need to do next is to enable wildcard subdomains on your local machine.
You can use (this) [http://asciithoughts.com/posts/2014/02/23/setting-up-a-wildcard-dns-domain-on-mac-os-x/] tutorial.
Then, change local hosts file to point `127.0.0.1` to `*.guestbird.dev`.

After this is set, you can access the app at `dashboard.guestbird.dev:3000`.

## How it works
Users can set up a shop at dashboard on `dashboard.guestbird.dev:3000`
When user sets a shop slug, it will be generated at `[SHOPNAME].guestbird.dev:3000`
The `www` subdomain is saved for the promotional landing page, and ideally will be a static HTML website and not part of the Meteor app.

## How to deploy (to development server)
To deploy to AWS servers we are using MeteorUP (mup). It is recommended to read a bit about how it works before deploying.
https://github.com/arunoda/meteor-up

- Install mup `npm install -g mup`
- Go to mup development folder `cd mup/development`
- Set development settings.json file `cp settings-sample.json settings.json`.
- Inside `settings.json`, change basicAuth username and password to the correct one (Specified in a google doc).
- Set mup file `cp mup-sample.json mup.json`.
- Change relevant settings in mup file
- Configure AWS to let you have access (see wiki)
- `mup setup` before the first deployment
- `mup deploy`

NOTE: Never, ever, ever, ever, ever commit `mup.json` to the repo.
