CREATE TABLE blogs(id SERIAL PRIMARY KEY, author TEXT, url TEXT NOT NULL, title TEXT NOT NULL, likes INTEGER DEFAULT 0);
INSERT INTO blogs (author, url, title, likes) VALUES ('Tommi', 'x.com', 'Viisauksia', 4);
INSERT INTO blogs (url, title) VALUES ('y.com', 'Lisaa viisauksia');
