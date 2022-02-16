

CREATE TABLE IF NOT EXISTS movieslist(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    release_date VARCHAR(10000),
    poster_path VARCHAR(10000),
    overview VARCHAR(255),
    comment VARCHAR(255)
)