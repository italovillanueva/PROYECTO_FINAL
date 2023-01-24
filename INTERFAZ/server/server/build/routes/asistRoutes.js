"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asistController_1 = __importDefault(require("../controllers/asistController"));
const nombreController_1 = __importDefault(require("../controllers/nombreController"));
class AsistRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', asistController_1.default.list);
        this.router.get('/', nombreController_1.default.nombre);
        this.router.delete('/:id', asistController_1.default.delete);
        this.router.put('/:id', asistController_1.default.update);
    }
}
const asistRoutes = new AsistRoutes();
exports.default = asistRoutes.router;
