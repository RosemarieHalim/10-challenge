INSERT INTO department (department_name)
VALUES
 ('IT'),
 ('Accounting'),
 ('Operations'),
 ('Marketing');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Developer', 80000, 1),
  ('Software Engineer', 90000, 1),
  ('Accountant', 100000, 2),
  ('Analyst', 125000, 2),
  ('Project Manager', 60000, 3),
  ('OM', 75000, 3),
  ('Graphic Designer', 50000, 4),
  ('Art Director', 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, NULL),
  ('Virginia', 'Woolf', 2, NULL),
  ('Jack', 'London', 3, NULL),
  ('Peter', 'Greenway', 4, NULL),
  ('Derek', 'Jarman', 5, NULL),
  ('ALice', 'Davis', 6, NULL),
  ('Jen', 'Ferny', 7, NULL),
  ('Callen', 'Willis', 8, NULL);