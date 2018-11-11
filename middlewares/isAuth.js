function checkSession(req, res, next) {
  if (req.session.user) {
    next(); //If session exists, proceed to page
  } else {
    var err = new Error("No tiene acceso por favor crear cuenta");
    console.log(req.session.user);
    res.render('sinPermisos', {
      title: 'privado',
      message: ''
    })
    
  }
}

module.exports = checkSession