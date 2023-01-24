"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class AsistController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const asistencia = yield database_1.default.query('SELECT * FROM Registro');
            res.json(asistencia);
        });
    }
    nombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tabla = yield database_1.default.query('SELECT * FROM Alumno');
            res.json(tabla);
        });
    }
    getOne(req, res) {
        res.json({ text: 'El registro es ' + req.params.id });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO Registro set ?', [req.body]);
            res.json({ message: 'REGISTRO CREADO' });
        });
    }
    delete(req, res) {
        res.json({ text: 'deleting a game' + req.params.id });
    }
    update(req, res) {
        res.json({ text: 'ACTUALIZANDO REGISTRO' + req.params.id });
    }
}
const asistController = new AsistController();
exports.default = asistController;
