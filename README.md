# Guestbird alpha

## How to run
This app uses Meteor. If you never used meteor, it would be recommended to read a bit how it works: https://www.meteor.com/.

- Install (meteor)[meteor.com].
- Go to app folder `cd app`.
- Set your own setting file copying the sample file `cp settings-sample.json settings.json`.
- run meteor with settings `meteor run --settings settings.json`

NOTE: settings.json is on gitignore for a reason. Never commit a settings file to a repo!

## How to deploy (to development server)
To deploy to AWS servers we are using MeteorUP (mup). It is recommended to read a bit about how it works before deploying.
https://github.com/arunoda/meteor-up

- Install mup `npm install -g mup`
- Go to mup development folder `cd mup/development`
- Set development settings.json file `cp settings-sample.json settings.json`.
- Inside `settings.json`, change basicAuth username and password to the correct one (Specified in a google doc).
- Set mup file `cp mup-sample.json mup.json`.
- Change relevant settings in mup file
- `mup deploy`
