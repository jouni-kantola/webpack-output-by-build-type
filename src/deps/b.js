export default {
    hello: function() {
        return 'hello from b';
    }
}

// no difference if export default or module.exports are used
// module.exports = {
//    hello: function() {
//         return 'hello from b';
//     } 
// }