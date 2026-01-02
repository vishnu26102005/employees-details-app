const express = require("express");
const app = express();

app.use(express.json());

let employees = [
  { id: 1, name: "Vishnu", role: "Developer", salary: 30000 },
  { id: 2, name: "Arun", role: "Tester", salary: 25000 }
];

app.get("/employees", (req, res) => {
  res.status(200).json(employees);
});

app.get("/employees/:id", (req, res) => {
  const emp = employees.find(e => e.id == req.params.id);
  if (!emp) return res.status(404).json({ message: "Employee not found" });
  res.json(emp);
});

app.post("/employees", (req, res) => {
  const newEmployee = {
    id: employees.length + 1,
    name: req.body.name,
    role: req.body.role,
    salary: req.body.salary
  };

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

app.put("/employees/:id", (req, res) => {
  const emp = employees.find(e => e.id == req.params.id);
  if (!emp) return res.status(404).json({ message: "Employee not found" });

  emp.name = req.body.name;
  emp.role = req.body.role;
  emp.salary = req.body.salary;

  res.json(emp);
});

app.delete("/employees/:id", (req, res) => {
  const index = employees.findIndex(e => e.id == req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Employee not found" });

  employees.splice(index, 1);
  res.json({ message: "Employee deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

