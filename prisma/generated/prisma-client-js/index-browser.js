
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 3.14.0
 * Query Engine version: 2b0c12756921c891fec4f68d9444e18c7d5d4a6a
 */
Prisma.prismaVersion = {
  client: "3.14.0",
  engine: "2b0c12756921c891fec4f68d9444e18c7d5d4a6a"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = 'DbNull'
Prisma.JsonNull = 'JsonNull'
Prisma.AnyNull = 'AnyNull'

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.EstatusServidoresScalarFieldEnum = makeEnum({
  idEstatus: 'idEstatus',
  tipo: 'tipo',
  descripcion: 'descripcion',
  titulo: 'titulo'
});

exports.Prisma.EstatusUsuariosScalarFieldEnum = makeEnum({
  idEstatus: 'idEstatus',
  tipo: 'tipo',
  descripcion: 'descripcion',
  titulo: 'titulo'
});

exports.Prisma.PingServidoresScalarFieldEnum = makeEnum({
  idPingServidor: 'idPingServidor',
  idServidor: 'idServidor',
  times: 'times',
  packetLoss: 'packetLoss',
  min: 'min',
  max: 'max',
  avg: 'avg',
  log: 'log',
  isAlive: 'isAlive',
  numericHost: 'numericHost',
  fechaPing: 'fechaPing'
});

exports.Prisma.ServidoresScalarFieldEnum = makeEnum({
  publicId: 'publicId',
  idServidor: 'idServidor',
  estatus: 'estatus',
  dominio: 'dominio',
  ip: 'ip',
  fechaCreacion: 'fechaCreacion',
  fechaActualizacion: 'fechaActualizacion',
  descripcion: 'descripcion',
  idUsuario: 'idUsuario',
  nombre: 'nombre'
});

exports.Prisma.TasksScalarFieldEnum = makeEnum({
  id: 'id',
  idTask: 'idTask',
  idServidor: 'idServidor',
  estatus: 'estatus',
  fechaCreacion: 'fechaCreacion',
  interval: 'interval',
  error: 'error',
  type: 'type',
  ultimaEjecucion: 'ultimaEjecucion'
});

exports.Prisma.UsuariosScalarFieldEnum = makeEnum({
  publicId: 'publicId',
  idUsuario: 'idUsuario',
  estatus: 'estatus',
  nombre: 'nombre',
  apellido: 'apellido',
  email: 'email',
  password: 'password',
  fechaCreacion: 'fechaCreacion',
  fechaActualizacion: 'fechaActualizacion'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.EstatusServidoresOrderByRelevanceFieldEnum = makeEnum({
  descripcion: 'descripcion',
  titulo: 'titulo'
});

exports.Prisma.EstatusUsuariosOrderByRelevanceFieldEnum = makeEnum({
  descripcion: 'descripcion',
  titulo: 'titulo'
});

exports.Prisma.PingServidoresOrderByRelevanceFieldEnum = makeEnum({
  log: 'log',
  numericHost: 'numericHost'
});

exports.Prisma.ServidoresOrderByRelevanceFieldEnum = makeEnum({
  publicId: 'publicId',
  dominio: 'dominio',
  ip: 'ip',
  descripcion: 'descripcion',
  nombre: 'nombre'
});

exports.Prisma.TasksOrderByRelevanceFieldEnum = makeEnum({
  idTask: 'idTask',
  error: 'error'
});

exports.Prisma.UsuariosOrderByRelevanceFieldEnum = makeEnum({
  publicId: 'publicId',
  nombre: 'nombre',
  apellido: 'apellido',
  email: 'email',
  password: 'password'
});
exports.TasksEstatus = makeEnum({
  running: 'running',
  stopped: 'stopped',
  deleted: 'deleted'
});

exports.TasksTypes = makeEnum({
  UNDEFINED: 'UNDEFINED',
  SERVER: 'SERVER',
  BACKGROUND: 'BACKGROUND',
  ADMIN: 'ADMIN',
  DAILY: 'DAILY'
});

exports.Prisma.ModelName = makeEnum({
  EstatusServidores: 'EstatusServidores',
  EstatusUsuarios: 'EstatusUsuarios',
  PingServidores: 'PingServidores',
  Servidores: 'Servidores',
  Tasks: 'Tasks',
  Usuarios: 'Usuarios'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
