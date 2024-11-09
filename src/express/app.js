const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const routes = {
	usuarios: require('./routes/usuarios'),
	deportes: require('./routes/deportes'),
	canchas: require('./routes/canchas'),
	reservas: require('./routes/reservas'),
	buscarCanchas: require('./routes/buscarCanchas'),
	nuevaReserva: require('./routes/nuevareserva'),
};

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

function makeHandlerAwareOfAsyncErrors(handler) {
	return async function(req, res, next) {
		try {
			await handler(req, res);
		} catch (error) {
			next(error);
		}
	};
}

for (const [routeName, routeController] of Object.entries(routes)) {
	if (routeController.getAll) {
		app.get(
			`/api/${routeName}`,
			makeHandlerAwareOfAsyncErrors(routeController.getAll)
		);
	}
	if (routeController.getById) {
		app.get(
			`/api/${routeName}/:id`,
			makeHandlerAwareOfAsyncErrors(routeController.getById)
		);
	}
	if (routeController.create) {
		app.post(
			`/api/${routeName}`,
			makeHandlerAwareOfAsyncErrors(routeController.create)
		);
	}
	if (routeController.update) {
		app.put(
			`/api/${routeName}/:id`,
			makeHandlerAwareOfAsyncErrors(routeController.update)
		);
	}
	if (routeController.remove) {
		app.delete(
			`/api/${routeName}/:id`,
			makeHandlerAwareOfAsyncErrors(routeController.remove)
		);
	}
}

app.post('/api/usuarios/register', 
	makeHandlerAwareOfAsyncErrors(routes.usuarios.register)
);

app.post('/api/usuarios/login', 
	makeHandlerAwareOfAsyncErrors(routes.usuarios.login)
);

app.post('/api/buscarCanchas', 
	makeHandlerAwareOfAsyncErrors(routes.buscarCanchas.buscar)
);

app.post('/api/nuevareserva',
	makeHandlerAwareOfAsyncErrors(routes.nuevaReserva.reservar)
);

app.get('/api/reservas/obtenerPorIdUsuario/:userId',
	makeHandlerAwareOfAsyncErrors(routes.reservas.obtenerPorIdUsuario)
)

module.exports = app;