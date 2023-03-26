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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const node_path_1 = __importDefault(require("node:path"));
const node_xlsx_1 = __importDefault(require("node-xlsx"));
const sequelize_typescript_1 = require("sequelize-typescript");
const app = (0, express_1.default)();
const port = 3300;
express_1.default.static("public");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        // an unique name for the file
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    },
});
const upload = (0, multer_1.default)({
    storage,
    fileFilter: (req, file, cb) => {
        // const filetypes = /jpeg|jpg|png|gif/;
        // file type only excel or csv
        //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
        const filetypes = /application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet|csv|xls|xlsx/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(node_path_1.default.extname(file.originalname).toLowerCase());
        console.log(mimetype, extname);
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(null, false);
    },
});
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: "103.93.16.51",
    port: 3306,
    username: "touchsk1_thiru",
    password: "Thiru@123$",
    database: "touchsk1_nodev_001",
    models: [__dirname + "/models"],
    dialectModule: require("mysql2"),
    dialectOptions: {
        host: "103.93.16.51",
        port: 3306,
    },
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        yield sequelize.sync({ force: true });
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}))();
app.post("/upload", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!req.file) {
        res.status(500);
        return res.json({ error: "Error uploading file." });
    }
    try {
        // extract data from the file
        const data = (_b = (_a = node_xlsx_1.default.parse(req.file.path)) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.data;
        if (req.body.headerRow) {
            const headers = data === null || data === void 0 ? void 0 : data[req.body.headerRow - 1];
            data === null || data === void 0 ? void 0 : data.splice(req.body.headerRow - 1, 1);
            const students = data.map((row) => {
                const obj = {};
                row.map((cell, index) => {
                    obj[headers[index]] = cell;
                });
                return obj;
            });
            if (!students.length) {
                throw new Error("no records");
            }
            console.log("students", students);
            res.status(200).json(students);
            // await Student.bulkCreate(students);
            // res.send("File uploaded successfully");
        }
        else {
            throw new Error("Header row is not selected");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Server running at http://localhost:${port}`);
});
// a function for [["Arul",30],["Ganesh",25]] nested array to object array like [{name:"Arul",age:30},{name:"Genesh",age:25}] - in javascript
function parseData() { }
