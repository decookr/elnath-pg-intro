CREATE TABLE shoes (
	id SERIAL PRIMARY KEY,
	name VARCHAR(80),
	cost INTEGER
);

INSERT INTO shoes (name, cost)
VALUES ('Nike Air Pegasus', 65),
('Red Wing', 250),
('Saucony', 40);

INSERT INTO shoes (name, cost)
VALUES ('Nike Air Pegasus', 65);

SELECT * FROM shoes;