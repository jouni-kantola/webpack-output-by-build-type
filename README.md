# Webpack output by build type
Bootstrap application's module tree by build type. Included is also an example of a global config to display the difference in output.

## Build
`npm run build -- --BUILD=(development|production)`

### args
Default builds are done in development mode. If build type `production` is used (`-- --BUILD=production`, note `--` prefix) code will be minified and uglified, including inlined Webpack manifest.

## Run with Webpack dev server
`npm run serve -- --BUILD=(development|production)`
