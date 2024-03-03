CREATE TABLE shopping (id INTEGER PRIMARY KEY, name TEXT, amount
INTEGER);

DROP TABLE shopping

alter table shopping rename to shopp;
alter table shopp rename to shopping;

INSERT INTO shopping VALUES (1, 'Avokado', 5);
INSERT INTO shopping VALUES (2, 'Milk', 2);
INSERT INTO shopping VALUES (3, 'Bread', 3);
INSERT INTO shopping VALUES (4, 'Chocolate', 8);
INSERT INTO shopping VALUES (5, 'Bamba', 5);
INSERT INTO shopping VALUES (6, 'Orange', 10);

select * from shopping
SELECT id, name FROM shopping

SELECT * FROM shopping WHERE amount > 5
SELECT * FROM shopping WHERE amount = 2
SELECT * FROM shopping WHERE name LIKE 'Bamba'

UPDATE shopping SET amount=1 WHERE name LIKE 'Milk'

ALTER TABLE shopping ADD COLUMN maavar

UPDATE shopping SET maavar=6 WHERE id=1;
UPDATE shopping SET maavar=3 WHERE id=2;
UPDATE shopping SET maavar=12 WHERE id=3;
UPDATE shopping SET maavar=8 WHERE id=4;
UPDATE shopping SET maavar=5 WHERE id=5;

SELECT * FROM shopping WHERE amount > 1 AND maavar > 5
SELECT * FROM shopping WHERE maavar BETWEEN 3 AND 5
SELECT * FROM shopping ORDER BY maavar
SELECT * FROM shopping ORDER BY maavar DESC

CREATE TABLE books (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO books VALUES (1, 'JAVA PROGRAMMING');
DELETE FROM books;
SELECT COUNT(*)from shopping
SELECT MAX(amount) from shopping
SELECT AVG(amount) from shopping
SELECT MIN(amount) from shopping
Select maavar, COUNT(*)FROM shopping GROUP BY maavar
SELECT id AS "SECRET", name, amount, maavar FROM shopping
Select maavar, COUNT(*)FROM shopping GROUP BY maavar HAVING COUNT(*)>1
CREATE TABLE prices (id INTEGER PRIMARY KEY, price INTEGER);
INSERT INTO prices VALUES (1, 3);
INSERT INTO prices VALUES (2, 7);
INSERT INTO prices VALUES (3, 12);
INSERT INTO prices VALUES (4, 5);
INSERT INTO prices VALUES (5, 3);
INSERT INTO prices VALUES (6, 2);
INSERT INTO prices VALUES (7, 10);
SELECT s.id, s.name, s.amount, s.maavar, p.price FROM shopping s JOIN
prices p ON s.id=p.id
SELECT s.id, s.name, s.amount, s.maavar, p.price, s.amount * p.price AS
"SECRET" FROM shopping s JOIN prices p ON s.id=p.id
SELECT s.id, s.name, s.amount, s.maavar, p.price FROM shopping s JOIN
prices p ON s.id=p.id WHERE p.price = (SELECT MAX(price) FROM
prices)


