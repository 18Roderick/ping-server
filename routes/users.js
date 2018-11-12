const express = require("express");
const {Server, User} = require("../models");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", {logged: true ,  title: "User session" });
});

router.get("/servers", async (req, res, next) => {
  try {
    const { id } = req.session.user;

    const dataServer = await Server.findAll({
      where: { UserId: id },
      attributes: ["id", "serverName", "ip"]
    });

    res.render("server", {logged: true , title: "servidores", dataServer });
    
  } catch (error) {
    console.log(error);
    res.redirect("/login");
  }
});

router.get('/estadisticas', (req, res) => {
	res.render('estadisticas', {logged: true ,  title: 'Estadisticas'})
})

router.get('/perfil', (req, res) => {

	User.findById(req.session.user.id)
		.then( ({dataValues:data}) => {
			res.render('perfil', {
        logged: true , 
				title: `${data.nombre} ${data.apellido}`,
				data})
		})
		.catch( error => {
			console.log('error al buscar informacion del usuario')
			res.redirect('/')
		})
})

router.post("/agregar-servidor", (req, res) => {
  console.log("entrando al post de nuevo servidor");
  const { id } = req.session.user;
  const data = { ...req.body, UserId: id };
  Server.findOrCreate({ where: data , attributes: ['serverName', 'ip']})
    .spread((user, created) => {
      if (created) {
        console.info("servidor agregado con exito", user);
        res.status(201).json({
					serverName: user.serverName,
					ip: user.ip
				});
      }

      console.log("no se pudo agregar el nuevo servidor");
      res.json({ message: "no se pudo agregar el servdor" });
    })
    .catch(error => {
			console.error(error);
			res.json({ message: "ups! ocurrio un error al crear el nuevo registro" });
    });
});

module.exports = router;
