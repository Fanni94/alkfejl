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


var addJogosultsag = function(req, res) {
    var result = "";
    try {
        var item = new Jogosultsag({
            nev: req.body.nev,
            jogosultsag: req.body.jogok
        });
        item.save();
        result = "Sikeresen hozzáadva!";
    } catch (err) {
        result = "Hiba történt!" + err;
    }
    res.send(result);
};


module.exports.addJogosultsag = addJogosultsag;