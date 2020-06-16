'use strict';

// var knex = require('knex')({
//     client: 'pg',
//     connection: {
//       host : '0.0.0.0:8001',
//       user : 'postgres',
//       password : 'postgres',
//       database : 'myapp_test'
//     }
//   });

const Hapi = require('hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: '0.0.0.0'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

    server.route({
        method: 'GET',
        path: '/hello-world',
        handler: (request, h) => {
            return 'Another hello world!'
    }})

    await server.register(require('./poi_controller'))

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();