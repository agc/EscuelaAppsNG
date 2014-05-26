/***
 * Excerpted from "Node.js the Right Way",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/jwnode for more book information.
***/

'use strict';

const fs = require('fs'),
      cheerio = require('cheerio');

module.exports = function(filename, callback) {
  fs.readFile(filename, function(err, data) {
    if(err) { return callback(err); }

    let $ = cheerio.load(data.toString()),
        _map = function(items, mapper) {
          let rv = [];

          items.each(function(i, elem) {
            rv.push(mapper(elem));
          });

          return rv;
        },
        collect = function(index, elem) {
          let rv = $(elem).text();
          return rv;
        },
        authors = $('pgterms\\:agent pgterms\\:name'),
        subjects = $('[rdf\\:resource$="/LCSH"]');
      let doc = {
        _id: $('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', ''),
        title: $('dcterms\\:title').text(),
        authors: _map(authors, function(elem) {
          return $(elem).text();
        }),
        subjects: _map(subjects, function(elem) {
          return $(elem).find('rdf\\:value').text();
        })
      };

      if(doc._id === undefined)
        callback("something went wrong");
      else
        callback(null, doc);
  });
};

