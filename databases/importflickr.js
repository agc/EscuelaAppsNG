function importdata()
{
    var cradle = require("cradle"),
        sys = require("sys"),
        fs = require("fs");

    var connection = new (cradle.Connection)("localhost",5984);
    var db = connection.database('geoexample');

    data = fs.readFileSync("data.json","utf-8");

    flickr = JSON.parse(data);

    for(p in flickr.photos.photo)
    {
        photo = flickr.photos.photo[p];

        photo.geometry = {"type":"Point", "coordinates" : [photo.longitude, photo.latitude] };

        // save url to flickr image
        photo.image_url_small = "http://farm"+photo.farm+".static.flickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_s.jpg";

        db.save(photo.id,photo,function(er,ok)
        {
            if (er) {sys.puts("error: " + er); return; }
        });
    }
}
exports.importdata = importdata;