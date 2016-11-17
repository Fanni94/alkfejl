var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename : "D:/Alkalmazások fejlesztése/beadandó/alkfejl/CsaladiBudzse/database.db"
    }
});

var bookshelf = require('bookshelf')(knex);
var Csalad = bookshelf.Model.extend({
    tableName : 'Csalad'
});
var FelhasznaloKezelo = bookshelf.Model.extend({
    tableName: 'FelhasznaloKezelo'
});
var Jogosultsag = bookshelf.Model.extend({
    tableName : 'Jogosultsag'
});
var KiadasBevetel = bookshelf.Model.extend({
    tableName : 'KiadasBevetel'
});


var addSzemely = function(req, res) {
    var result = "";
    try {
        var item = new FelhasznaloKezelo({
            felhasznalonev : req.body.felhasznalonev,
            jelszo: req.body.jelszo,
            egyenleg: req.body.egyenleg,
            nev: req.body.nev
        });
        item.save();
        result = "Sikeresen hozzáadva!";
    } catch (err) {
        result = "Hiba történt!" + err;
    }
    res.send(result);
};


var deleteSzemely = function(id, req, res) {
    var result = "";
    try {
        FelhasznaloKezelo.where('id', id).fetch().then(function (item) {
            item.destroy();
        });
        result = "Sikeres törlés";
    } catch (err) {
        result = "Hiba történt!" + err;
    }
    res.send(result);
};


var getAllSzemely = function (req, res) {
    FelhasznaloKezelo.fetchAll().then(function (item) {
        console.log(item);
        var result = [];
        item.models.forEach(function (item) {
            result.push( {
                felhasznalonev : item.attributes.felhasznalonev,
                jelszo: item.attributes.jelszo,
                egyenleg: item.attributes.egyenleg,
                nev: item.attributes.nev
            });
        });

        res.send(result)
    })
};


module.exports.addSzemely = addSzemely;
module.exports.deleteSzemely = deleteSzemely;
module.exports.getAllSzemely = getAllSzemely;