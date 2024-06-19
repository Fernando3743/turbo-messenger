CREATE DATABASE turbo_messenger
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    TEMPLATE template0;

\c turbo_messenger

CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    identificacion VARCHAR(100),
    nombre VARCHAR(100),
    direccion VARCHAR(255),
    ciudad VARCHAR(100),
    email VARCHAR(100),
    telefono_contacto VARCHAR(15)
);

CREATE TABLE sucursal (
    id_sucursal SERIAL PRIMARY KEY,
    id_cliente INT,
    nombre VARCHAR(100),
    direccion VARCHAR(255),
    telefono_contacto VARCHAR(15),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    id_cliente INT,
    login VARCHAR(50),
    contrasena VARCHAR(50),
    direccion VARCHAR(255),
    email VARCHAR(100),
    telefono VARCHAR(15),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);

CREATE TABLE mensajero (
    id SERIAL PRIMARY KEY,
    identificacion INT,
    nombre VARCHAR(100),
    direccion VARCHAR(255),
    email VARCHAR(100),
    telefono_contacto VARCHAR(15)
);

CREATE TABLE mensajero_cliente (
    id_mensajero INT,
    identificacion_cliente INT,
    PRIMARY KEY (id_mensajero, identificacion_cliente),
    FOREIGN KEY (id_mensajero) REFERENCES mensajero(id),
    FOREIGN KEY (identificacion_cliente) REFERENCES cliente(id)
);

CREATE TABLE servicio (
    codigo_servicio SERIAL PRIMARY KEY,
    id_usuario INT,
    fecha_hora_solicitud TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    origen VARCHAR(255),
    destino VARCHAR(255),
    ciudad VARCHAR(100),
    descripcion VARCHAR(255),
    tipo_transporte VARCHAR(50),
    numero_paquetes INT,
    estado VARCHAR(50),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE estado_servicio (
    id_estado SERIAL PRIMARY KEY,
    codigo_servicio INT,
    estado VARCHAR(50),
    fecha_hora TIMESTAMP,
    mensajero INT,
    FOREIGN KEY (codigo_servicio) REFERENCES servicio(codigo_servicio),
    FOREIGN KEY (mensajero) REFERENCES mensajero(id)
);

CREATE TABLE foto_estado (
    id_foto SERIAL PRIMARY KEY,
    codigo_servicio INT,
    id_mensajero INT,
    fecha_hora_foto TIMESTAMP,
    url_foto VARCHAR(255),
    FOREIGN KEY (codigo_servicio) REFERENCES servicio(codigo_servicio),
    FOREIGN KEY (id_mensajero) REFERENCES mensajero(id)
);