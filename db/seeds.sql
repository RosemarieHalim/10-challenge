INSERT INTO departments (department_name)
VALUES
 ('IT'),
 ('Accounting'),
 ('Operations'),
 ('Marketing');

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 3, NULL),
  ('Jack', 'London', 2, NULL),
  ('Peter', 'Greenway', 4, 3),
  ('Derek', 'Jarman', 5, NULL),
  ('ALice', 'Davis', 8, 7),
  ('Jen', 'Ferny', 7, NULL),
  ('Callen', 'Willis', 6, 5),
  ('Robert', 'Defalen', 7, NULL),
  ('Sandy', 'Powell', 1, NULL);

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Developer', '80000', '1'),
  ('Software Engineer', '90000', '1'),
  ('Accountant', 'Fraser', '100000'),
  ('Analyst', 'Fraser', '125000'),
  ('Project Manager', '60000', '3'),
  ('OM', 'Fraser', '75000'),
  ('Graphic Designer', '50000', '4'),
  ('Art Director', '90000', '4');