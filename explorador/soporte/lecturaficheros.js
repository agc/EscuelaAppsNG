var fs=require('fs'),
    EventEmitter=require('events').EventEmitter,
    filesEE=new EventEmitter(),
    myfiles=[];

// this event will be called when all files have been added to myfiles
filesEE.on('files_ready',function(){
  console.dir(myfiles);
});

// read all files from current directory
fs.readdir('.',function(err,files){
  if(err) throw err;
  files.forEach(function(file){
    myfiles.push(file);
  });
  filesEE.emit('files_ready'); // trigger files_ready event
});