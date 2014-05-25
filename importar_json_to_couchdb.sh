
DB="http://localhost:5984/music"
curl -H "Content-Type:application/json" -d @music.json -vX POST $DB/_bulk_docs
