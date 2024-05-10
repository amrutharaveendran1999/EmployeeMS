import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const router = express.Router();

const hardcodedAdminEmail = "admin@gmail.com";
const hardcodedAdminPassword = "adminPassword";

con.query("CREATE DATABASE IF NOT EXISTS employeems", (err) => {
  if (err) throw err;
  console.log("Database created or exists");

  con.query("USE employeems", (err) => {
    if (err) throw err;
    console.log("Using employeems database");

    const createAdminTable = `CREATE TABLE IF NOT EXISTS admin (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(150),
      password VARCHAR(50)
    )`;
    con.query(createAdminTable, (err) => {
      if (err) throw err;
      console.log("Admin table created or exists");

      const checkAdminCredentials = `SELECT * FROM admin`;
      con.query(checkAdminCredentials, (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
          const insertAdminCredentials = `INSERT IGNORE INTO admin (email, password) VALUES (?, ?)`;
          con.query(
            insertAdminCredentials,
            [hardcodedAdminEmail, hardcodedAdminPassword],
            (err, result) => {
              if (err) throw err;
              console.log("Admin credentials inserted");
            }
          );
        } else {
          console.log("Admin credentials already exist");
        }
      });
    });

    const createEmployeeTable = `CREATE TABLE IF NOT EXISTS employee (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(255),
      lastName VARCHAR(255),
      employeeCode VARCHAR(255),
      email VARCHAR(255),
      contactNo VARCHAR(255),
      department VARCHAR(255),
      password VARCHAR(225),
      photo VARCHAR(255)
    )`;
    con.query(createEmployeeTable, (err) => {
      if (err) throw err;
      console.log("Employee table created or exists");
    });
  });
});

router.post("/adminlogin", (req, res) => {
  if (
    req.body.email === hardcodedAdminEmail &&
    req.body.password === hardcodedAdminPassword
  ) {
    const token = jwt.sign(
      { role: "admin", email: hardcodedAdminEmail },
      "jwt_secret_key",
      { expiresIn: "1d" }
    );
    res.cookie("token", token);
    return res.json({ loginStatus: true });
  } else {
    return res.json({ loginStatus: false, Error: "Wrong Password or Email" });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

router.post("/add_employee", upload.single("photo"), (req, res) => {
  console.log(req.file.filename);
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const sql = `INSERT INTO employee (firstName,lastName,employeeCode,email,contactNo,department,password,photo) VALUES (?)`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: "Hashing error" });

    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.employeeCode,
      req.body.email,
      req.body.contactNo,
      req.body.department,
      hash,
      req.file.filename,
    ];
    con.query(sql, [values], (err, result) => {
      console.log(values);

      if (err) return res.json({ Status: false, Error: err });
      return res.json({ Status: true });
    });
  });
});

router.get("/employee", (req, res) => {
  const department = req.query.department;
  let sql = "SELECT * FROM employee";
  let params = [];

  if (department) {
    sql += " WHERE department = ?";
    params.push(department);
  }

  con.query(sql, params, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.put("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee 
      SET firstName = ?, lastName = ?, employeeCode = ?, email = ?, contactNo = ?, department = ?, photo = ? 
      WHERE id = ?`;
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.employeeCode,
    req.body.email,
    req.body.contactNo,
    req.body.department,
    req.body.photo,
  ];
  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error: " + err });
    return res.json({ Status: true, Result: result });
  });
});

router.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from employee where id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});
export { router as adminRouter };
