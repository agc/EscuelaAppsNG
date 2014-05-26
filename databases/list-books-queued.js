/***
 * Excerpted from "Node.js the Right Way",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/jwnode for more book information.
 * Modificación copiada de 
https://github.com/ryanolsonx/node-js-the-right-way-exercises/blob/master/databases/import-books.js 
***/


'use strict';

const async = require('async'),
      file = require('file'),
      request = require('request'),
      rdfParser = require('./lib/rdf-parser.js'),

      work = async.queue(function(path, done) {
        rdfParser(path, function(err, doc) {
          if(err) {
            console.error(err);
            done();
            return;
          }

          request({
            method: 'PUT',
            url: 'http://localhost:5984/books/' + doc._id,
            json: doc
          }, function(err, res, body) {
            if(err) throw Error(err);

            console.log(res.statusCode, body);
            done();
          });
        });
      }, 10);

console.log('beginning directory walk');
file.walk(__dirname + '/cache', function(err, dirPath, dirs, files) {
  files.forEach(function(path) {
    work.push(path);
  });
});



