module.exports = {
    src: {
        js: [ './node/namespace.js', './node/**/!(main|namespace)*.js', './node/main.js' ],
        piconfig: './config.pi.js'
    },
    dist: {
        js: './dist/',
        piconfig: './dist/'
    }
}