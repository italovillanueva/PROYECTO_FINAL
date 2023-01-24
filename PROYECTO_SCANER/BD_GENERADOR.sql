CREATE TABLE Curso (
  idCurso INT  NOT NULL  ,
  Nom_curs VARCHAR(45)  NULL    ,
PRIMARY KEY(idCurso));



CREATE TABLE maquina (
  idmaquina INT  NOT NULL   AUTO_INCREMENT,
  nomMaq VARCHAR(20)  NULL    ,
PRIMARY KEY(idmaquina));



CREATE TABLE Alumno (
  Num_matricula INT  NOT NULL  ,
  correoInst VARCHAR(45)  NULL  ,
  NombreA VARCHAR(45)  NULL  ,
  ApellidoA VARCHAR(45)  NULL    ,
PRIMARY KEY(Num_matricula));



CREATE TABLE GRUPO (
  letraGroup VARCHAR(20)  NOT NULL  ,
  Curso_idCurso INT  NOT NULL  ,
  Nomgroup VARCHAR(45)  NULL    ,
PRIMARY KEY(letraGroup)  ,
INDEX GRUPO_FKIndex1(Curso_idCurso),
  FOREIGN KEY(Curso_idCurso)
    REFERENCES Curso(idCurso)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);



CREATE TABLE Registro (
  Alumno_Num_matricula INT  NOT NULL  ,
  maquina_idmaquina INT  NOT NULL  ,
  horaFecha timestamp default current_timestamp NOT NULL    ,
PRIMARY KEY(Alumno_Num_matricula, maquina_idmaquina)  ,
INDEX Alumno_has_máquina_FKIndex1(Alumno_Num_matricula)  ,
INDEX Alumno_has_máquina_FKIndex2(maquina_idmaquina),
  FOREIGN KEY(Alumno_Num_matricula)
    REFERENCES Alumno(Num_matricula)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(maquina_idmaquina)
    REFERENCES maquina(idmaquina)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);



CREATE TABLE Aula (
  NumAula INT  NOT NULL   AUTO_INCREMENT,
  maquina_idmaquina INT  NOT NULL  ,
  GRUPO_letraGroup VARCHAR(20)  NOT NULL  ,
  capacidad INT  NULL    ,
PRIMARY KEY(NumAula)  ,
INDEX Aula_FKIndex1(maquina_idmaquina)  ,
INDEX Aula_FKIndex2(GRUPO_letraGroup),
  FOREIGN KEY(maquina_idmaquina)
    REFERENCES maquina(idmaquina)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(GRUPO_letraGroup)
    REFERENCES GRUPO(letraGroup)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);



CREATE TABLE GRUPO_has_Alumno (
  GRUPO_letraGroup VARCHAR(20)  NOT NULL  ,
  Alumno_Num_matricula INT  NOT NULL    ,
PRIMARY KEY(GRUPO_letraGroup, Alumno_Num_matricula)  ,
INDEX GRUPO_has_Alumno_FKIndex1(GRUPO_letraGroup)  ,
INDEX GRUPO_has_Alumno_FKIndex2(Alumno_Num_matricula),
  FOREIGN KEY(GRUPO_letraGroup)
    REFERENCES GRUPO(letraGroup)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(Alumno_Num_matricula)
    REFERENCES Alumno(Num_matricula)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);



