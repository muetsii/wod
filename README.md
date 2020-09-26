# World of Diceness

[![Build Status](https://travis-ci.com/muetsii/wod.svg?branch=master)](https://travis-ci.com/muetsii/wod)
[![codecov](https://codecov.io/gh/muetsii/wod/branch/master/graph/badge.svg)](https://codecov.io/gh/muetsii/wod)



Chat room to easily roll dice in World of Darkness games, focused on usability.

## Author

Mu (https://github.com/muetsii/)


## Note

Spanish information bellow is part of a course. Would be moved or removed if this becomes a production app.

## Diseño de la solución

Opto por la implentación en NodeJS.

Node es una tecnología muy orientada a servir y consumir APIs REST (y otras). Su particular asincronismo monohebra ofrece muy buen rendimiento en peticiones cortas con muchas operaciones de entrada salida, como es servir una petición, consumir una petición o la lectura de la base de datos.

Sobre Node, usaremos el framework FeatherJS. Este framework está orientado a hacer aplicaciones web con comunicación en tiempo real. Justamente uno de sus ejemplos es un chat.

De hecho, ya tenía esta idea de hace un par de años, ha sido al ver el framework de Feathers cuando he pensado que podía abordarlo.

## Selección de servicios

https://github.com/muetsii/wod/issues/4

### Logging

De entre los servicios mencionados me interesa logstash, por ser libre.

No obstante, dada la dificultad para encontrar un servicio gratuito para probar, optaría por aislar el detalle usando una librería de logging que aceptase varios servicios, como winston (Javascript).

Dicha biblioteca permite usar diferentes transportes. Uno de ellos es escribir en postgres. Eso es perfecto por ahora porque puedo verificarlo localmente sin tener que levantar ningún servicio, y luego pasar a una plataforma de logging es tan simple como configurar un trasnporte distinto.

### Configuración remota

Me ha llamado la atención etcd y lo probaré con la intención de aprender.

### Almacenamiento de datos

Para las primeras iteraciones no quiero guardar nada de forma permanente. No quiero complicarme con un historial de chats.

Para un futuro, sí me gustaría guardar ese historial de chats, para poder usarlo en partidas de foro. Para entonces me plantearía una base de datos relacional, por la sencillez y porque es lo que conozoco. Feathers está adaptado a trabajar con varias BD, aunque no conozco demasiado bien nignuna, así que tendría que informarme de si me convienen, o es mejor currarme la BD fuera del framework.


### Otros

No parece que vaya a necesitar un gestor de colas como RabbitMQ.

La elección de un servidor web dependerá de la tecnología finalmente seleccionada para la implementación, aunque tampoco será determinante por el momento.


## Archivos generados: Actividad 4

Los siguientes archivos son generados por el scaffolding

$ feathers generate app

Entiendo que califican como lo que pide la actividad.

En Node.js no hay ningún layout demasiado estándar, pero en feathers sí, y es éste (de hecho, es lo que me han creado). Me parece un buen layout, aunque no parece muy adecuado para modelo de datos orientado a objetos.

src
src/index.js
src/channels.js
src/logger.js
src/services
src/services/index.js
src/middleware
src/middleware/index.js
src/app.js
src/app.hooks.js


# Instrucciones
(Actividad 8)

Instalar dependencias

  npm install

Ejecutar:

  npm start

o bien:

  npm run run

Lanzar los tests:

  npm run test

Comprobar cobertura de tests:

  npm run coverage

