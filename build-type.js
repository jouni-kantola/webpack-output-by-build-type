function buildArgFilter(arg) {
    return arg.match(/-+BUILD=/i);
}

let build = {};

if (!process.argv) {
    build.DEVELOPMENT = true;
}

const buildType = process.argv
                    .filter(buildArgFilter)
                    .map(arg => arg.split('=')[1]);

if (buildType.length && (buildType[0].toUpperCase() === 'PRODUCTION')) {
    build.PRODUCTION = true;
}

module.exports = build;