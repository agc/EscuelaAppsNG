// en un repl de node
/* var modulo= require('ejemplos_modulo1.js');
   modulo.name(); da error
   modulo         muestra el texto
*/

module.exports = 'ROCK IT!';
exports.name = function() {
    console.log('My name is Lemmy Kilmister');
};