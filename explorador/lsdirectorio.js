var fs=require('fs'), listado;

module.exports=function(alias, directorio,response) {

    var base,pathactual,item,stats;

    listado=[];

    base = alias;
    pathactual=base+directorio;

    fs.readdir(pathactual,function(err,files){

        if(err) throw err;

        files.forEach(function(file){

            stats = fs.statSync(pathactual+"/"+file);

            if (stats.isDirectory()) item  =  {tipo:'d',nombre:file};
            if (stats.isFile())      item  =  {tipo:'f',nombre:file};

            listado.push(item);


        });

        response.write(JSON.stringify({alias:alias,directorio:directorio,listado:listado }));

        response.end();

    });
};