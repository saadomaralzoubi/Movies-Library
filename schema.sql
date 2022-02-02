DROP TABLE IF EXISTS movielist;

CREATE TABLE IF NOT EXISTS movielist(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    release_date VARCHAR(500),
    poster_path VARCHAR(500),
    overview VARCHAR(255),
    comment VARCHAR(255)
)