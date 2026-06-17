DROP TABLE IF EXISTS usuarios, clases, reservas, rutinas, rutinas_usuarios, bonos CASCADE;

--CREACCION DE TABLAS

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL  CHECK (rol IN ('usuario', 'admin') ) DEFAULT 'usuario',
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clases (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(120) NOT NULL,
    descripcion TEXT,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    plazas INTEGER NOT NULL,
    entrenador_id INTEGER REFERENCES usuarios(id)
);

CREATE TABLE reservas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
    clase_id INTEGER NOT NULL,
    estado VARCHAR(30) NOT NULL DEFAULT 'confirmada',
    fecha_reserva TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (usuario_id, clase_id),
    FOREIGN KEY (clase_id)
        REFERENCES clases(id)
        ON DELETE CASCADE
);

CREATE TABLE rutinas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(120) NOT NULL,
    objetivo TEXT NOT NULL,
    nivel VARCHAR(30) NOT NULL,
    video_url VARCHAR(255),
    entrenador_id INTEGER REFERENCES usuarios(id)
);

CREATE TABLE rutinas_usuarios (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
    rutina_id INTEGER NOT NULL REFERENCES rutinas(id),
    fecha_asignacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (usuario_id, rutina_id)
);

CREATE TABLE bonos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
    clases_totales INTEGER NOT NULL,
    clases_restantes INTEGER NOT NULL,
    fecha_caducidad DATE NOT NULL
);

-- DATOS DE MUESTRA 


INSERT INTO usuarios (nombre, email, contrasena, rol)
VALUES 
('Inigo','inigo@prueba.com', 'dhaiodb', 'admin'),
('Esti', 'esti@prueba.com', 'jsdzj', 'visitante'),
('Rafa', 'rafa@prueba.com', 'hsjioskj', 'usuario');

INSERT INTO clases 
(titulo, descripcion, fecha, hora_inicio, hora_fin, plazas, entrenador_id)
VALUES
('Yoga básico', 'Clase de yoga para principiantes', '2026-06-20', '10:00', '11:00', 15, 1),
('Crossfit', 'Entrenamiento de alta intensidad', '2026-06-21', '18:00', '19:00', 12, 1),
('Pilates', 'Clase de pilates para mejorar flexibilidad', '2026-06-22', '17:30', '18:30', 10, 1);

INSERT INTO reservas
(usuario_id, clase_id, estado)
VALUES
(3, 1, 'confirmada'),
(3, 2, 'confirmada'),
(2, 1, 'confirmada');

--CONUSLTAS DE EJEMPLO

SELECT * FROM usuarios; 
SELECT estado FROM reservas; 
SELECT titulo, descripcion FROM clases ;