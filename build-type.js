let build = {};

if (!process.argv) {
    build.DEVELOPMENT = true;
}

const buildType = process.argv
                    .filter(arg => arg.indexOf('--BUILD=') > -1 || arg.indexOf('BUILD=') > -1)
                    .map(arg => arg.split('=')[1]);

if (buildType.length && (buildType[0].toUpperCase() === 'PRODUCTION')) {
    build.PRODUCTION = true;
}

module.exports = build;