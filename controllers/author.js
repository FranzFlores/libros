'use strict'
var db = require('../database');
const uuidv4 = require('uuid/v4');

const AuthorController = {};

//Cargar la vista para el autor 
AuthorController.loadView = (req, res) => {
    res.render('author', { title: "Autores" });
};

//Agregar un nuevo nodo de Autor
//CREATE (Gabriel:Author{name:'Gabriel Garcia Marquez',country:'Colombia'})
AuthorController.addAuthor = (req, res) => {
    db.merge('author', {
        idAuthor: uuidv4(),
        name: req.body.name,
        country: req.body.country
    })
        .then(author => {
            req.flash('GOOD', 'Se ha guardado el autor con exito', 'back');
            console.log(author.get('country'));
        }).catch((err) => {
            req.flash('BAD', 'Ha ocurrido un error', 'back');
            console.log(err);
        });
};

//Listar todos los artistas en formato JSON
AuthorController.list = (req, res) => {
    db.all('author')
        .then(collection => {
            var aux = [];
            collection.forEach(element => {
                var node = {};
                node.idAuthor = element.get('idAuthor');
                node.name = element.get('name');
                node.country = element.get('country');
                aux.push(node);
            });
            res.send(aux);
        })
};

//Obtiene un nodo de acuerdo a su Id
AuthorController.getAuthor = (req, res) => {
    db.find('author', req.params.id)
        .then(author => {
            var node = {};
            node.idAuthor = author.get('idAuthor');
            node.name = author.get('name');
            node.country = author.get('country');
            res.send(node);
        }).catch((err) => {
            req.flash('BAD', 'Ha ocurrido un error', 'back');
            console.log(err);
        });
};

//Edita la informacion de un nodo
AuthorController.editAuthor = (req, res) => {
    db.find('author', req.body.idAuthor)
        .then((author) => {

            author.update({
                name: req.body.name,
                country: req.body.country
            }).then((result) => {
                if (result) {
                    req.flash('GOOD', 'Se ha actualizado el autor con exito', 'back');
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
AuthorController.deleteAuthor = (req, res) => {
    db.find('author', req.body.idAuthor)
        .then((author) => {
            author.delete().
                then((result) => {
                    if (result) {
                        req.flash('GOOD', 'Se ha eliminado el autor con exito', 'back');
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

//Crear relacion entre Autor y Libro
AuthorController.relationBook = (req, res) => {
    db.find('author', req.body.idAuthor)
        .then((author) => {

            db.find('book', req.body.idBook)
                .then((book) => {
                    author.relateTo(book, 'writed', { year: req.body.year })
                        .then((relation) => {
                            if (relation) {
                                req.flash('GOOD', 'Se ha realizado la relacion con exito con éxito', 'back');
                            }
                        }).catch((err) => {
                            req.flash('BAD', 'Ha ocurrido un error', 'back');
                            console.log(err);
                        });
                }).catch((err) => {
                    req.flash('BAD', 'Ha ocurrido un error al buscar el libro', 'back');
                    console.log(err);
                });
        }).catch((err) => {
            req.flash('BAD', 'Ha ocurrido un error', 'back');
            console.log(err);
        });
};

//Obtener todos los libros de un autor
AuthorController.getBooks = (req,res)=>{
    db.cypher('MATCH (author)-[:WRITED]-(book) WHERE author.idAuthor = {idAuthor} RETURN book.name', { idAuthor: req.params.idAuthor })
    .then(list => {
        //console.log(list.records.length);
        var aux = [];
        list.records.forEach(element => {
            var node = {};
            node.name = element._fields;
            aux.push(node);
        });
        res.send(aux);
    }).catch((err) => {
        req.flash('BAD', 'Ha ocurrido un error', 'back');
        console.log(err);
    });
};

module.exports = AuthorController;