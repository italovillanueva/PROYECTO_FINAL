"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nombreController_1 = __importDefault(require("../controllers/nombreController"));
const asistController_1 = __importDefault(require("../controllers/asistController"));
class NombreRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', nombreController_1.default.nombre);
        this.router.get('/', asistController_1.default.list);
    }
}
const nombreRoutes = new NombreRoutes();
exports.default = nombreRoutes.router;
