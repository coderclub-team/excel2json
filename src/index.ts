import express from "express";
import multer from "multer";
import path from "node:path";

import cors from "cors";
import Student from "./models/Student.model.";
import db from "./db";
import fs from "node:fs";
import { IStudent } from "./types";
import xlsx from "xlsx";
import crypto from "crypto";

const app = express();
db()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:3300",
      "https://nodeveloper.in",
    ],
    maxAge: 3600,
  })
);

const port = 3300;
express.static("public");

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    // an unique name for the file
    const filename = `${Date.now()}-${file.originalname}`;

    cb(null, filename);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // const filetypes = /jpeg|jpg|png|gif/;
    // file type only excel or csv
    //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    const filetypes =
      /application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet|csv|xls|xlsx/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    console.log(mimetype, extname);

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(null, false);
  },
});

app.post("/upload", upload.single("file"), async (req, res) => {
  console.log("req.file", req.file);
  if (!req.file) {
    res.status(500);
    return res.json({ error: "Error uploading file." });
  }

  try {
    // extract data from the file
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data: Partial<IStudent>[] = xlsx.utils.sheet_to_json(sheet, {
      header: 0,
      raw: true,
      blankrows: false,
      skipHidden: true,
    });

    console.log(data);

    data.forEach((student, index) => {
      if (!student.fullname) {
        throw new Error(`fullname is required at row ${index + 1}`);
      } else if (!student.student_id) {
        throw new Error(`student_id is required at row ${index + 1}`);
      } else if (!student.class_id) {
        throw new Error(`class_id is required at row ${index + 1}`);
      }
      return student;
    });
    console.log("data", data);

    const result = await Student.bulkCreate(data);
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("file deleted");
    });

    console.log("students", data);
    res.status(200).json({
      message: "File uploaded successfully",
      data: result,
    });
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("file deleted");
    });
  } catch (error) {
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("file deleted");
    });
    res.status(500).json({ error: error });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
