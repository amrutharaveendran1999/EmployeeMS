import mysql from "mysql";

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employeems",
});
con.connect(function (error) {
  if (error) {
    console.log("error connecting");
  } else {
    console.log("connected successfully");
  }
});

export default con ;