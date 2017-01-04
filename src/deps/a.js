import b from './b'; // if these two lines are commented out all works again
//console.log(b.hello());

let instance = null;

function A() {
}

A.prototype.hello = function() {
    return 'hello from a';
}

function getInstance () {
    if (instance === null) {
        instance = new A();
    }
    return instance;
};

//console.log('get instance returns:', getInstance());
module.exports = getInstance();
//works: export default getInstance();