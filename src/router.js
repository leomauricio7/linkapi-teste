const express = require("express");
require('express-group-routes');

const bling = require("./app/controllers/bling.controller");
const pipe = require("./app/controllers/pipedrive.controller");
const opportunity = require("./app/controllers/opportunity.controller");

const routes = express.Router();

routes.group("/pipe", (router) => {
    router.get("/deals", pipe.listDeals);
    router.get("/deals/summary", pipe.listDealsSumary);
});

routes.group("/bling", (router) => {
    router.get("/produtos", bling.getProducts);
    router.get("/pedidos", bling.getPedidos);
    router.post("/pedidos", bling.savePedido);
});


routes.group("/opportunity", (router) => {
    router.get("", opportunity.getAll);
    router.get("/detail/:idPedido", opportunity.getById);
    router.get("/summary", opportunity.getSummary);
});

module.exports = routes;