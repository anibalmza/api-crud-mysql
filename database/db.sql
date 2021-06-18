CREATE DATABASE inmobi_app;

USE inmobi_app;
CREATE TABLE persona(
  id int(11) NOT NULL AUTO_INCREMENT,
  apellido varchar(30) NOT NULL,
  nombre varchar(30) NOT NULL,
  dni varchar(15) DEFAULT NULL,
  telefono varchar(15) DEFAULT NULL,
  direccion varchar(30) DEFAULT NULL,
  PRIMARY KEY (id)
)
COLLATE='latin1_swedish_ci'
);

USE inmobi_app;
CREATE TABLE zona(
	id INT(11) NOT NULL AUTO_INCREMENT,
	zona VARCHAR(50) NOT NULL,
	descripcion VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
)
COLLATE='latin1_swedish_ci'
;

USE inmobi_app;
CREATE TABLE propiedad(
  id int(11) NOT NULL AUTO_INCREMENT,
  tipo varchar(30) NOT NULL,
  calle varchar(30) NOT NULL,
  numero int(6) NOT NULL,
  PRIMARY KEY (id),
  persona_id int(11) NOT NULL,
  zona_id int(11) NOT NULL,
  CONSTRAINT fk_persona FOREIGN KEY (persona_id) REFERENCES persona(id),
  CONSTRAINT fk_zona FOREIGN KEY (zona_id) REFERENCES zona(id)
)
COLLATE='latin1_swedish_ci'
);



-- // DATOS // --
INSERT INTO persona(apellido,nombre,dni,telefono,direccion) VALUES
('Arancibia','Pablo', '30.222.888', '263-4345588', 'San Andres 2501'),
('Andreani', 'Julia', '22.333.444', '263-444555', 'San Martin 314'),
('Gonzalez','Pedro', '30.222.888', '263-4345588', 'San Andres 2501'),
('Becerra', 'Nadia', '25.344.846', '263-4345588', 'Vicente Gil 538'),
('Romeo', 'Julieta', '35.222.555', '261-5674444', 'Av. Lima 528'),
('Araoz', 'Pablo', '20.314.218', '261-5763322', 'San Ignacio 4690'),
('Ocaña', 'Carla','37.714.255','263-4443333', 'Lamadrid 3121'),
('Gomez Bolaños', 'Roberto', '14.128.767', '263-4443322', 'Guadalajara 2545'),
('Perez', 'Norberto', '25.344.846', '263-4345588', 'Vicente Gil 1522'),
('Sanchez', 'Augusto','25.344.846', '263-4345588', 'Alameda 233'),
('Alaniz', 'Eduardo', '30340340', '2634345588', 'Libertador 2533'),
('Rosales', 'Pascual', '44.999.888', '263-4556677', 'Liniers 4832');

INSERT INTO propiedad(tipo, domicilio, numero) VALUES
('casa', 'Sarmiento', 4188),
('casa', 'Lemos', 3122),
('depto', 'Guemes', 1888),
('casa', 'Av. Lima', 342),
('depto', 'Aguado', 238),
('depto', 'Lavalle', 1345),
('casa', 'Av. Valle', 555),
('casa', 'F. Arenas', 662);

INSERT INTO zona(zona, descripcion) VALUES
('ciudad', 'centro civico'),
('urbano-centro', 'mas de 15 cuadras del centro'),
('urbano-marginal', 'zona conflictiva'),
('rural', 'mas de 15km del centro'),
('campo', 'mas de 40km del centro');