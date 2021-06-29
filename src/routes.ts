import expres from "express";
import ContactController from "./controllers/ContactController";

const routes = expres.Router();

routes.get("/", ContactController.getAll);
routes.post("/", ContactController.create);
routes.put("/:contactId", ContactController.update);
routes.delete("/:contactId", ContactController.inactivate);

export default routes;
