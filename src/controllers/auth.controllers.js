import * as AuthServices from "../services/auth.services.js";
import * as UserServices from "../services/users.services.js";
import {STATUS} from "../constants/constants.js"

export async function login(req, res){
  try {
      const {email, password} = req.body
      const logged = await AuthServices.login(email, password)
      if(logged){
          req.session.logged = true
          const userLogged = await UserServices.getUser(email)
          delete userLogged.password
          console.log("Usuario ingresado", userLogged)
          req.session.userLogged = userLogged
          res.redirect("/views/realtimeproducts")
      }else{
          res.status(400).send("Usuario o clave no válida")
      }
  } catch (error) {
      res.status(400).send(error.message)
  }
}


export async function logout(req, res) {
  try {
    req.session.destroy((err) => {
      if (err) {
        res.json(err);
      } else {
        console.log("Usuario salió de la aplicación");
        res.redirect("/views/");
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}
