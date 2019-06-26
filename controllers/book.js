'use strict'
var db = require('../database');
const uuidv4 = require('uuid/v4');

const BookController = {};

//Cargar la vista para el autor
BookController.loadView = (req, res) => {
    res.render('book', { title: "Libros" });
};

//Agregar un nuevo nodo de Libro
BookController.addBook = (req, res) => {
    db.merge('book', {
        idBook: uuidv4(),
        name: req.body.title,
        pages: req.body.pages,
        description: req.body.description
    }).then(book => {
        req.flash('GOOD', 'Se ha guardado el libro con exito', 'back');
    }).catch((err) => {
        req.flash('BAD', 'Ha ocurrido un error', 'back');
        console.log(err);
    });
};

//Listar todos los artistas en formato JSON
BookController.list = (req, res) => {
    db.all('book')
        .then(collection => {
            var aux = [];
            collection.forEach(element => {
                var node = {};
                node.idBook = element.get('idBook');
                node.name = element.get('name');
                node.pages = element.get('pages');
                node.description = element.get('description');
                aux.push(node);
            });
            res.send(aux);
        })
};

//Obtiene un nodo de acuerdo a su Id
BookController.getBook = (req, res) => {
    db.find('book', req.params.id)
        .then(book => {
            var node = {};
            node.idBook = book.get('idBook');
            node.name = book.get('name');
            node.pages = book.get('pages');
            node.description = book.get('description');
            res.send(node);
        }).catch((err) => {
            req.flash('BAD', 'Ha ocurrido un error', 'back');
            console.log(err);
        });
};

//Edita la informacion de un nodo
BookController.editBook = (req, res) => {
    db.find('book', req.body.idBook)
        .then((book) => {
            book.update({
                name: req.body.name,
                pages: req.body.pages,
                description: req.body.description
            }).then((result) => {
                if (result) {
                    req.flash('GOOD', 'Se ha actualizado el libro con exito', 'back');
                }
            }).catch((err) => {
                req.flash('BAD', 'Ha ocurrido un error', 'back');
                console.log(err);
            });
        }).catch((err) => {
            req.flash('BAD', 'Ha ocurrido un error', 'back');
            console.log(err);
        });
};

//Eliminar un nodo
BookController.deleteBook = (req, res) => {
    db.find('book', req.body.idBook)
        .then((book) => {
            book.delete().
                then((result) => {
                    if (result) {
                        req.flash('GOOD', 'Se ha eliminado el libro con exito', 'back');
                    }
                }).catch((err) => {
                    req.flash('BAD', 'Ha ocurrido un error', 'back');
                    console.log(err);
                });
        }).catch((err) => {
            req.flash('BAD', 'Ha ocurrido un error', 'back');
            console.log(err);
        });
};

//Obtener nodo entre el autor y libro
BookController.getAuthor = (req, res) => {
    db.cypher('MATCH (book)-[:WRITED]-(author) WHERE book.idBook = {idBook} RETURN author.name', { idBook: req.params.idBook })
        .then(author => {
            var message = "No tiene autor";
            if(author.records.length>0){
                message = author.records[0]._fields.toString();
            }
            res.send({message:message});
        }).catch((err) => {
            req.flash('BAD', 'Ha ocurrido un error', 'back');
            console.log(err);
        });
};

module.exports = BookController;