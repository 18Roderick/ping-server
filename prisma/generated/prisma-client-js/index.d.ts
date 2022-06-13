
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model EstatusServidores
 * 
 */
export type EstatusServidores = {
  idEstatus: number
  tipo: number
  descripcion: string | null
  titulo: string
}

/**
 * Model EstatusUsuarios
 * 
 */
export type EstatusUsuarios = {
  idEstatus: number
  tipo: number
  descripcion: string | null
  titulo: string
}

/**
 * Model PingServidores
 * 
 */
export type PingServidores = {
  idPingServidor: number
  idServidor: number
  times: number | null
  packetLoss: number | null
  min: number | null
  max: number | null
  avg: number | null
  log: string | null
  isAlive: boolean | null
  numericHost: string | null
  fechaPing: Date
}

/**
 * Model Servidores
 * 
 */
export type Servidores = {
  publicId: string | null
  idServidor: number
  estatus: number
  dominio: string
  ip: string | null
  fechaCreacion: Date
  fechaActualizacion: Date | null
  descripcion: string | null
  idUsuario: number | null
  nombre: string
}

/**
 * Model Tasks
 * 
 */
export type Tasks = {
  id: number
  idTask: string
  idServidor: number | null
  estatus: TasksEstatus | null
  fechaCreacion: Date
  interval: number | null
  error: string | null
  type: TasksTypes
  ultimaEjecucion: Date | null
}

/**
 * Model Usuarios
 * 
 */
export type Usuarios = {
  publicId: string
  idUsuario: number
  estatus: number
  nombre: string
  apellido: string
  email: string | null
  password: string
  fechaCreacion: Date
  fechaActualizacion: Date | null
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const TasksEstatus: {
  running: 'running',
  stopped: 'stopped',
  deleted: 'deleted'
};

export type TasksEstatus = (typeof TasksEstatus)[keyof typeof TasksEstatus]


export const TasksTypes: {
  UNDEFINED: 'UNDEFINED',
  SERVER: 'SERVER',
  BACKGROUND: 'BACKGROUND',
  SUMMARY: 'SUMMARY',
  ADMIN: 'ADMIN',
  DAILY: 'DAILY'
};

export type TasksTypes = (typeof TasksTypes)[keyof typeof TasksTypes]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more EstatusServidores
 * const estatusServidores = await prisma.estatusServidores.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more EstatusServidores
   * const estatusServidores = await prisma.estatusServidores.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;

  $transaction<R>(fn: (prisma: Prisma.TransactionClient) => Promise<R>, options?: { maxWait?: number, timeout?: number }): Promise<R>;

      /**
   * `prisma.estatusServidores`: Exposes CRUD operations for the **EstatusServidores** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EstatusServidores
    * const estatusServidores = await prisma.estatusServidores.findMany()
    * ```
    */
  get estatusServidores(): Prisma.EstatusServidoresDelegate<GlobalReject>;

  /**
   * `prisma.estatusUsuarios`: Exposes CRUD operations for the **EstatusUsuarios** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EstatusUsuarios
    * const estatusUsuarios = await prisma.estatusUsuarios.findMany()
    * ```
    */
  get estatusUsuarios(): Prisma.EstatusUsuariosDelegate<GlobalReject>;

  /**
   * `prisma.pingServidores`: Exposes CRUD operations for the **PingServidores** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PingServidores
    * const pingServidores = await prisma.pingServidores.findMany()
    * ```
    */
  get pingServidores(): Prisma.PingServidoresDelegate<GlobalReject>;

  /**
   * `prisma.servidores`: Exposes CRUD operations for the **Servidores** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Servidores
    * const servidores = await prisma.servidores.findMany()
    * ```
    */
  get servidores(): Prisma.ServidoresDelegate<GlobalReject>;

  /**
   * `prisma.tasks`: Exposes CRUD operations for the **Tasks** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.tasks.findMany()
    * ```
    */
  get tasks(): Prisma.TasksDelegate<GlobalReject>;

  /**
   * `prisma.usuarios`: Exposes CRUD operations for the **Usuarios** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuarios.findMany()
    * ```
    */
  get usuarios(): Prisma.UsuariosDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Prisma Client JS version: 3.15.1
   * Query Engine version: 461d6a05159055555eb7dfb337c9fb271cbd4d7e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: 'DbNull'

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: 'JsonNull'

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: 'AnyNull'

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    EstatusServidores: 'EstatusServidores',
    EstatusUsuarios: 'EstatusUsuarios',
    PingServidores: 'PingServidores',
    Servidores: 'Servidores',
    Tasks: 'Tasks',
    Usuarios: 'Usuarios'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;


  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type EstatusServidoresCountOutputType
   */


  export type EstatusServidoresCountOutputType = {
    Servidores: number
  }

  export type EstatusServidoresCountOutputTypeSelect = {
    Servidores?: boolean
  }

  export type EstatusServidoresCountOutputTypeGetPayload<
    S extends boolean | null | undefined | EstatusServidoresCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? EstatusServidoresCountOutputType
    : S extends undefined
    ? never
    : S extends EstatusServidoresCountOutputTypeArgs
    ?'include' extends U
    ? EstatusServidoresCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof EstatusServidoresCountOutputType ? EstatusServidoresCountOutputType[P] : never
  } 
    : EstatusServidoresCountOutputType
  : EstatusServidoresCountOutputType




  // Custom InputTypes

  /**
   * EstatusServidoresCountOutputType without action
   */
  export type EstatusServidoresCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the EstatusServidoresCountOutputType
     * 
    **/
    select?: EstatusServidoresCountOutputTypeSelect | null
  }



  /**
   * Count Type EstatusUsuariosCountOutputType
   */


  export type EstatusUsuariosCountOutputType = {
    Usuarios: number
  }

  export type EstatusUsuariosCountOutputTypeSelect = {
    Usuarios?: boolean
  }

  export type EstatusUsuariosCountOutputTypeGetPayload<
    S extends boolean | null | undefined | EstatusUsuariosCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? EstatusUsuariosCountOutputType
    : S extends undefined
    ? never
    : S extends EstatusUsuariosCountOutputTypeArgs
    ?'include' extends U
    ? EstatusUsuariosCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof EstatusUsuariosCountOutputType ? EstatusUsuariosCountOutputType[P] : never
  } 
    : EstatusUsuariosCountOutputType
  : EstatusUsuariosCountOutputType




  // Custom InputTypes

  /**
   * EstatusUsuariosCountOutputType without action
   */
  export type EstatusUsuariosCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the EstatusUsuariosCountOutputType
     * 
    **/
    select?: EstatusUsuariosCountOutputTypeSelect | null
  }



  /**
   * Count Type ServidoresCountOutputType
   */


  export type ServidoresCountOutputType = {
    PingServidores: number
    Tasks: number
  }

  export type ServidoresCountOutputTypeSelect = {
    PingServidores?: boolean
    Tasks?: boolean
  }

  export type ServidoresCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ServidoresCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ServidoresCountOutputType
    : S extends undefined
    ? never
    : S extends ServidoresCountOutputTypeArgs
    ?'include' extends U
    ? ServidoresCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof ServidoresCountOutputType ? ServidoresCountOutputType[P] : never
  } 
    : ServidoresCountOutputType
  : ServidoresCountOutputType




  // Custom InputTypes

  /**
   * ServidoresCountOutputType without action
   */
  export type ServidoresCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ServidoresCountOutputType
     * 
    **/
    select?: ServidoresCountOutputTypeSelect | null
  }



  /**
   * Count Type UsuariosCountOutputType
   */


  export type UsuariosCountOutputType = {
    Servidores: number
  }

  export type UsuariosCountOutputTypeSelect = {
    Servidores?: boolean
  }

  export type UsuariosCountOutputTypeGetPayload<
    S extends boolean | null | undefined | UsuariosCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? UsuariosCountOutputType
    : S extends undefined
    ? never
    : S extends UsuariosCountOutputTypeArgs
    ?'include' extends U
    ? UsuariosCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UsuariosCountOutputType ? UsuariosCountOutputType[P] : never
  } 
    : UsuariosCountOutputType
  : UsuariosCountOutputType




  // Custom InputTypes

  /**
   * UsuariosCountOutputType without action
   */
  export type UsuariosCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UsuariosCountOutputType
     * 
    **/
    select?: UsuariosCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model EstatusServidores
   */


  export type AggregateEstatusServidores = {
    _count: EstatusServidoresCountAggregateOutputType | null
    _avg: EstatusServidoresAvgAggregateOutputType | null
    _sum: EstatusServidoresSumAggregateOutputType | null
    _min: EstatusServidoresMinAggregateOutputType | null
    _max: EstatusServidoresMaxAggregateOutputType | null
  }

  export type EstatusServidoresAvgAggregateOutputType = {
    idEstatus: number | null
    tipo: number | null
  }

  export type EstatusServidoresSumAggregateOutputType = {
    idEstatus: number | null
    tipo: number | null
  }

  export type EstatusServidoresMinAggregateOutputType = {
    idEstatus: number | null
    tipo: number | null
    descripcion: string | null
    titulo: string | null
  }

  export type EstatusServidoresMaxAggregateOutputType = {
    idEstatus: number | null
    tipo: number | null
    descripcion: string | null
    titulo: string | null
  }

  export type EstatusServidoresCountAggregateOutputType = {
    idEstatus: number
    tipo: number
    descripcion: number
    titulo: number
    _all: number
  }


  export type EstatusServidoresAvgAggregateInputType = {
    idEstatus?: true
    tipo?: true
  }

  export type EstatusServidoresSumAggregateInputType = {
    idEstatus?: true
    tipo?: true
  }

  export type EstatusServidoresMinAggregateInputType = {
    idEstatus?: true
    tipo?: true
    descripcion?: true
    titulo?: true
  }

  export type EstatusServidoresMaxAggregateInputType = {
    idEstatus?: true
    tipo?: true
    descripcion?: true
    titulo?: true
  }

  export type EstatusServidoresCountAggregateInputType = {
    idEstatus?: true
    tipo?: true
    descripcion?: true
    titulo?: true
    _all?: true
  }

  export type EstatusServidoresAggregateArgs = {
    /**
     * Filter which EstatusServidores to aggregate.
     * 
    **/
    where?: EstatusServidoresWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EstatusServidores to fetch.
     * 
    **/
    orderBy?: Enumerable<EstatusServidoresOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: EstatusServidoresWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EstatusServidores from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EstatusServidores.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EstatusServidores
    **/
    _count?: true | EstatusServidoresCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EstatusServidoresAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EstatusServidoresSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EstatusServidoresMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EstatusServidoresMaxAggregateInputType
  }

  export type GetEstatusServidoresAggregateType<T extends EstatusServidoresAggregateArgs> = {
        [P in keyof T & keyof AggregateEstatusServidores]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEstatusServidores[P]>
      : GetScalarType<T[P], AggregateEstatusServidores[P]>
  }




  export type EstatusServidoresGroupByArgs = {
    where?: EstatusServidoresWhereInput
    orderBy?: Enumerable<EstatusServidoresOrderByWithAggregationInput>
    by: Array<EstatusServidoresScalarFieldEnum>
    having?: EstatusServidoresScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EstatusServidoresCountAggregateInputType | true
    _avg?: EstatusServidoresAvgAggregateInputType
    _sum?: EstatusServidoresSumAggregateInputType
    _min?: EstatusServidoresMinAggregateInputType
    _max?: EstatusServidoresMaxAggregateInputType
  }


  export type EstatusServidoresGroupByOutputType = {
    idEstatus: number
    tipo: number
    descripcion: string | null
    titulo: string
    _count: EstatusServidoresCountAggregateOutputType | null
    _avg: EstatusServidoresAvgAggregateOutputType | null
    _sum: EstatusServidoresSumAggregateOutputType | null
    _min: EstatusServidoresMinAggregateOutputType | null
    _max: EstatusServidoresMaxAggregateOutputType | null
  }

  type GetEstatusServidoresGroupByPayload<T extends EstatusServidoresGroupByArgs> = PrismaPromise<
    Array<
      PickArray<EstatusServidoresGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EstatusServidoresGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EstatusServidoresGroupByOutputType[P]>
            : GetScalarType<T[P], EstatusServidoresGroupByOutputType[P]>
        }
      >
    >


  export type EstatusServidoresSelect = {
    idEstatus?: boolean
    tipo?: boolean
    descripcion?: boolean
    titulo?: boolean
    Servidores?: boolean | ServidoresFindManyArgs
    _count?: boolean | EstatusServidoresCountOutputTypeArgs
  }

  export type EstatusServidoresInclude = {
    Servidores?: boolean | ServidoresFindManyArgs
    _count?: boolean | EstatusServidoresCountOutputTypeArgs
  }

  export type EstatusServidoresGetPayload<
    S extends boolean | null | undefined | EstatusServidoresArgs,
    U = keyof S
      > = S extends true
        ? EstatusServidores
    : S extends undefined
    ? never
    : S extends EstatusServidoresArgs | EstatusServidoresFindManyArgs
    ?'include' extends U
    ? EstatusServidores  & {
    [P in TrueKeys<S['include']>]:
        P extends 'Servidores' ? Array < ServidoresGetPayload<S['include'][P]>>  :
        P extends '_count' ? EstatusServidoresCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'Servidores' ? Array < ServidoresGetPayload<S['select'][P]>>  :
        P extends '_count' ? EstatusServidoresCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof EstatusServidores ? EstatusServidores[P] : never
  } 
    : EstatusServidores
  : EstatusServidores


  type EstatusServidoresCountArgs = Merge<
    Omit<EstatusServidoresFindManyArgs, 'select' | 'include'> & {
      select?: EstatusServidoresCountAggregateInputType | true
    }
  >

  export interface EstatusServidoresDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one EstatusServidores that matches the filter.
     * @param {EstatusServidoresFindUniqueArgs} args - Arguments to find a EstatusServidores
     * @example
     * // Get one EstatusServidores
     * const estatusServidores = await prisma.estatusServidores.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EstatusServidoresFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, EstatusServidoresFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'EstatusServidores'> extends True ? CheckSelect<T, Prisma__EstatusServidoresClient<EstatusServidores>, Prisma__EstatusServidoresClient<EstatusServidoresGetPayload<T>>> : CheckSelect<T, Prisma__EstatusServidoresClient<EstatusServidores | null >, Prisma__EstatusServidoresClient<EstatusServidoresGetPayload<T> | null >>

    /**
     * Find the first EstatusServidores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstatusServidoresFindFirstArgs} args - Arguments to find a EstatusServidores
     * @example
     * // Get one EstatusServidores
     * const estatusServidores = await prisma.estatusServidores.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EstatusServidoresFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, EstatusServidoresFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'EstatusServidores'> extends True ? CheckSelect<T, Prisma__EstatusServidoresClient<EstatusServidores>, Prisma__EstatusServidoresClient<EstatusServidoresGetPayload<T>>> : CheckSelect<T, Prisma__EstatusServidoresClient<EstatusServidores | null >, Prisma__EstatusServidoresClient<EstatusServidoresGetPayload<T> | null >>

    /**
     * Find zero or more EstatusServidores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstatusServidoresFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EstatusServidores
     * const estatusServidores = await prisma.estatusServidores.findMany()
     * 
     * // Get first 10 EstatusServidores
     * const estatusServidores = await prisma.estatusServidores.findMany({ take: 10 })
     * 
     * // Only select the `idEstatus`
     * const estatusServidoresWithIdEstatusOnly = await prisma.estatusServidores.findMany({ select: { idEstatus: true } })
     * 
    **/
    findMany<T extends EstatusServidoresFindManyArgs>(
      args?: SelectSubset<T, EstatusServidoresFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<EstatusServidores>>, PrismaPromise<Array<EstatusServidoresGetPayload<T>>>>

    /**
     * Create a EstatusServidores.
     * @param {EstatusServidoresCreateArgs} args - Arguments to create a EstatusServidores.
     * @example
     * // Create one EstatusServidores
     * const EstatusServidores = await prisma.estatusServidores.create({
     *   data: {
     *     // ... data to create a EstatusServidores
     *   }
     * })
     * 
    **/
    create<T extends EstatusServidoresCreateArgs>(
      args: SelectSubset<T, EstatusServidoresCreateArgs>
    ): CheckSelect<T, Prisma__EstatusServidoresClient<EstatusServidores>, Prisma__EstatusServidoresClient<EstatusServidoresGetPayload<T>>>

    /**
     * Create many EstatusServidores.
     *     @param {EstatusServidoresCreateManyArgs} args - Arguments to create many EstatusServidores.
     *     @example
     *     // Create many EstatusServidores
     *     const estatusServidores = await prisma.estatusServidores.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EstatusServidoresCreateManyArgs>(
      args?: SelectSubset<T, EstatusServidoresCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a EstatusServidores.
     * @param {EstatusServidoresDeleteArgs} args - Arguments to delete one EstatusServidores.
     * @example
     * // Delete one EstatusServidores
     * const EstatusServidores = await prisma.estatusServidores.delete({
     *   where: {
     *     // ... filter to delete one EstatusServidores
     *   }
     * })
     * 
    **/
    delete<T extends EstatusServidoresDeleteArgs>(
      args: SelectSubset<T, EstatusServidoresDeleteArgs>
    ): CheckSelect<T, Prisma__EstatusServidoresClient<EstatusServidores>, Prisma__EstatusServidoresClient<EstatusServidoresGetPayload<T>>>

    /**
     * Update one EstatusServidores.
     * @param {EstatusServidoresUpdateArgs} args - Arguments to update one EstatusServidores.
     * @example
     * // Update one EstatusServidores
     * const estatusServidores = await prisma.estatusServidores.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EstatusServidoresUpdateArgs>(
      args: SelectSubset<T, EstatusServidoresUpdateArgs>
    ): CheckSelect<T, Prisma__EstatusServidoresClient<EstatusServidores>, Prisma__EstatusServidoresClient<EstatusServidoresGetPayload<T>>>

    /**
     * Delete zero or more EstatusServidores.
     * @param {EstatusServidoresDeleteManyArgs} args - Arguments to filter EstatusServidores to delete.
     * @example
     * // Delete a few EstatusServidores
     * const { count } = await prisma.estatusServidores.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EstatusServidoresDeleteManyArgs>(
      args?: SelectSubset<T, EstatusServidoresDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more EstatusServidores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstatusServidoresUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EstatusServidores
     * const estatusServidores = await prisma.estatusServidores.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EstatusServidoresUpdateManyArgs>(
      args: SelectSubset<T, EstatusServidoresUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one EstatusServidores.
     * @param {EstatusServidoresUpsertArgs} args - Arguments to update or create a EstatusServidores.
     * @example
     * // Update or create a EstatusServidores
     * const estatusServidores = await prisma.estatusServidores.upsert({
     *   create: {
     *     // ... data to create a EstatusServidores
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EstatusServidores we want to update
     *   }
     * })
    **/
    upsert<T extends EstatusServidoresUpsertArgs>(
      args: SelectSubset<T, EstatusServidoresUpsertArgs>
    ): CheckSelect<T, Prisma__EstatusServidoresClient<EstatusServidores>, Prisma__EstatusServidoresClient<EstatusServidoresGetPayload<T>>>

    /**
     * Count the number of EstatusServidores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstatusServidoresCountArgs} args - Arguments to filter EstatusServidores to count.
     * @example
     * // Count the number of EstatusServidores
     * const count = await prisma.estatusServidores.count({
     *   where: {
     *     // ... the filter for the EstatusServidores we want to count
     *   }
     * })
    **/
    count<T extends EstatusServidoresCountArgs>(
      args?: Subset<T, EstatusServidoresCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EstatusServidoresCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EstatusServidores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstatusServidoresAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EstatusServidoresAggregateArgs>(args: Subset<T, EstatusServidoresAggregateArgs>): PrismaPromise<GetEstatusServidoresAggregateType<T>>

    /**
     * Group by EstatusServidores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstatusServidoresGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EstatusServidoresGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EstatusServidoresGroupByArgs['orderBy'] }
        : { orderBy?: EstatusServidoresGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EstatusServidoresGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEstatusServidoresGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for EstatusServidores.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EstatusServidoresClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Servidores<T extends ServidoresFindManyArgs = {}>(args?: Subset<T, ServidoresFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Servidores>>, PrismaPromise<Array<ServidoresGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * EstatusServidores findUnique
   */
  export type EstatusServidoresFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the EstatusServidores
     * 
    **/
    select?: EstatusServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EstatusServidoresInclude | null
    /**
     * Throw an Error if a EstatusServidores can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which EstatusServidores to fetch.
     * 
    **/
    where: EstatusServidoresWhereUniqueInput
  }


  /**
   * EstatusServidores findFirst
   */
  export type EstatusServidoresFindFirstArgs = {
    /**
     * Select specific fields to fetch from the EstatusServidores
     * 
    **/
    select?: EstatusServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EstatusServidoresInclude | null
    /**
     * Throw an Error if a EstatusServidores can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which EstatusServidores to fetch.
     * 
    **/
    where?: EstatusServidoresWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EstatusServidores to fetch.
     * 
    **/
    orderBy?: Enumerable<EstatusServidoresOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EstatusServidores.
     * 
    **/
    cursor?: EstatusServidoresWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EstatusServidores from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EstatusServidores.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EstatusServidores.
     * 
    **/
    distinct?: Enumerable<EstatusServidoresScalarFieldEnum>
  }


  /**
   * EstatusServidores findMany
   */
  export type EstatusServidoresFindManyArgs = {
    /**
     * Select specific fields to fetch from the EstatusServidores
     * 
    **/
    select?: EstatusServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EstatusServidoresInclude | null
    /**
     * Filter, which EstatusServidores to fetch.
     * 
    **/
    where?: EstatusServidoresWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EstatusServidores to fetch.
     * 
    **/
    orderBy?: Enumerable<EstatusServidoresOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EstatusServidores.
     * 
    **/
    cursor?: EstatusServidoresWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EstatusServidores from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EstatusServidores.
     * 
    **/
    skip?: number
    distinct?: Enumerable<EstatusServidoresScalarFieldEnum>
  }


  /**
   * EstatusServidores create
   */
  export type EstatusServidoresCreateArgs = {
    /**
     * Select specific fields to fetch from the EstatusServidores
     * 
    **/
    select?: EstatusServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EstatusServidoresInclude | null
    /**
     * The data needed to create a EstatusServidores.
     * 
    **/
    data: XOR<EstatusServidoresCreateInput, EstatusServidoresUncheckedCreateInput>
  }


  /**
   * EstatusServidores createMany
   */
  export type EstatusServidoresCreateManyArgs = {
    /**
     * The data used to create many EstatusServidores.
     * 
    **/
    data: Enumerable<EstatusServidoresCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * EstatusServidores update
   */
  export type EstatusServidoresUpdateArgs = {
    /**
     * Select specific fields to fetch from the EstatusServidores
     * 
    **/
    select?: EstatusServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EstatusServidoresInclude | null
    /**
     * The data needed to update a EstatusServidores.
     * 
    **/
    data: XOR<EstatusServidoresUpdateInput, EstatusServidoresUncheckedUpdateInput>
    /**
     * Choose, which EstatusServidores to update.
     * 
    **/
    where: EstatusServidoresWhereUniqueInput
  }


  /**
   * EstatusServidores updateMany
   */
  export type EstatusServidoresUpdateManyArgs = {
    /**
     * The data used to update EstatusServidores.
     * 
    **/
    data: XOR<EstatusServidoresUpdateManyMutationInput, EstatusServidoresUncheckedUpdateManyInput>
    /**
     * Filter which EstatusServidores to update
     * 
    **/
    where?: EstatusServidoresWhereInput
  }


  /**
   * EstatusServidores upsert
   */
  export type EstatusServidoresUpsertArgs = {
    /**
     * Select specific fields to fetch from the EstatusServidores
     * 
    **/
    select?: EstatusServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EstatusServidoresInclude | null
    /**
     * The filter to search for the EstatusServidores to update in case it exists.
     * 
    **/
    where: EstatusServidoresWhereUniqueInput
    /**
     * In case the EstatusServidores found by the `where` argument doesn't exist, create a new EstatusServidores with this data.
     * 
    **/
    create: XOR<EstatusServidoresCreateInput, EstatusServidoresUncheckedCreateInput>
    /**
     * In case the EstatusServidores was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<EstatusServidoresUpdateInput, EstatusServidoresUncheckedUpdateInput>
  }


  /**
   * EstatusServidores delete
   */
  export type EstatusServidoresDeleteArgs = {
    /**
     * Select specific fields to fetch from the EstatusServidores
     * 
    **/
    select?: EstatusServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EstatusServidoresInclude | null
    /**
     * Filter which EstatusServidores to delete.
     * 
    **/
    where: EstatusServidoresWhereUniqueInput
  }


  /**
   * EstatusServidores deleteMany
   */
  export type EstatusServidoresDeleteManyArgs = {
    /**
     * Filter which EstatusServidores to delete
     * 
    **/
    where?: EstatusServidoresWhereInput
  }


  /**
   * EstatusServidores without action
   */
  export type EstatusServidoresArgs = {
    /**
     * Select specific fields to fetch from the EstatusServidores
     * 
    **/
    select?: EstatusServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EstatusServidoresInclude | null
  }



  /**
   * Model EstatusUsuarios
   */


  export type AggregateEstatusUsuarios = {
    _count: EstatusUsuariosCountAggregateOutputType | null
    _avg: EstatusUsuariosAvgAggregateOutputType | null
    _sum: EstatusUsuariosSumAggregateOutputType | null
    _min: EstatusUsuariosMinAggregateOutputType | null
    _max: EstatusUsuariosMaxAggregateOutputType | null
  }

  export type EstatusUsuariosAvgAggregateOutputType = {
    idEstatus: number | null
    tipo: number | null
  }

  export type EstatusUsuariosSumAggregateOutputType = {
    idEstatus: number | null
    tipo: number | null
  }

  export type EstatusUsuariosMinAggregateOutputType = {
    idEstatus: number | null
    tipo: number | null
    descripcion: string | null
    titulo: string | null
  }

  export type EstatusUsuariosMaxAggregateOutputType = {
    idEstatus: number | null
    tipo: number | null
    descripcion: string | null
    titulo: string | null
  }

  export type EstatusUsuariosCountAggregateOutputType = {
    idEstatus: number
    tipo: number
    descripcion: number
    titulo: number
    _all: number
  }


  export type EstatusUsuariosAvgAggregateInputType = {
    idEstatus?: true
    tipo?: true
  }

  export type EstatusUsuariosSumAggregateInputType = {
    idEstatus?: true
    tipo?: true
  }

  export type EstatusUsuariosMinAggregateInputType = {
    idEstatus?: true
    tipo?: true
    descripcion?: true
    titulo?: true
  }

  export type EstatusUsuariosMaxAggregateInputType = {
    idEstatus?: true
    tipo?: true
    descripcion?: true
    titulo?: true
  }

  export type EstatusUsuariosCountAggregateInputType = {
    idEstatus?: true
    tipo?: true
    descripcion?: true
    titulo?: true
    _all?: true
  }

  export type EstatusUsuariosAggregateArgs = {
    /**
     * Filter which EstatusUsuarios to aggregate.
     * 
    **/
    where?: EstatusUsuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EstatusUsuarios to fetch.
     * 
    **/
    orderBy?: Enumerable<EstatusUsuariosOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: EstatusUsuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EstatusUsuarios from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EstatusUsuarios.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EstatusUsuarios
    **/
    _count?: true | EstatusUsuariosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EstatusUsuariosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EstatusUsuariosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EstatusUsuariosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EstatusUsuariosMaxAggregateInputType
  }

  export type GetEstatusUsuariosAggregateType<T extends EstatusUsuariosAggregateArgs> = {
        [P in keyof T & keyof AggregateEstatusUsuarios]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEstatusUsuarios[P]>
      : GetScalarType<T[P], AggregateEstatusUsuarios[P]>
  }




  export type EstatusUsuariosGroupByArgs = {
    where?: EstatusUsuariosWhereInput
    orderBy?: Enumerable<EstatusUsuariosOrderByWithAggregationInput>
    by: Array<EstatusUsuariosScalarFieldEnum>
    having?: EstatusUsuariosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EstatusUsuariosCountAggregateInputType | true
    _avg?: EstatusUsuariosAvgAggregateInputType
    _sum?: EstatusUsuariosSumAggregateInputType
    _min?: EstatusUsuariosMinAggregateInputType
    _max?: EstatusUsuariosMaxAggregateInputType
  }


  export type EstatusUsuariosGroupByOutputType = {
    idEstatus: number
    tipo: number
    descripcion: string | null
    titulo: string
    _count: EstatusUsuariosCountAggregateOutputType | null
    _avg: EstatusUsuariosAvgAggregateOutputType | null
    _sum: EstatusUsuariosSumAggregateOutputType | null
    _min: EstatusUsuariosMinAggregateOutputType | null
    _max: EstatusUsuariosMaxAggregateOutputType | null
  }

  type GetEstatusUsuariosGroupByPayload<T extends EstatusUsuariosGroupByArgs> = PrismaPromise<
    Array<
      PickArray<EstatusUsuariosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EstatusUsuariosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EstatusUsuariosGroupByOutputType[P]>
            : GetScalarType<T[P], EstatusUsuariosGroupByOutputType[P]>
        }
      >
    >


  export type EstatusUsuariosSelect = {
    idEstatus?: boolean
    tipo?: boolean
    descripcion?: boolean
    titulo?: boolean
    Usuarios?: boolean | UsuariosFindManyArgs
    _count?: boolean | EstatusUsuariosCountOutputTypeArgs
  }

  export type EstatusUsuariosInclude = {
    Usuarios?: boolean | UsuariosFindManyArgs
    _count?: boolean | EstatusUsuariosCountOutputTypeArgs
  }

  export type EstatusUsuariosGetPayload<
    S extends boolean | null | undefined | EstatusUsuariosArgs,
    U = keyof S
      > = S extends true
        ? EstatusUsuarios
    : S extends undefined
    ? never
    : S extends EstatusUsuariosArgs | EstatusUsuariosFindManyArgs
    ?'include' extends U
    ? EstatusUsuarios  & {
    [P in TrueKeys<S['include']>]:
        P extends 'Usuarios' ? Array < UsuariosGetPayload<S['include'][P]>>  :
        P extends '_count' ? EstatusUsuariosCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'Usuarios' ? Array < UsuariosGetPayload<S['select'][P]>>  :
        P extends '_count' ? EstatusUsuariosCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof EstatusUsuarios ? EstatusUsuarios[P] : never
  } 
    : EstatusUsuarios
  : EstatusUsuarios


  type EstatusUsuariosCountArgs = Merge<
    Omit<EstatusUsuariosFindManyArgs, 'select' | 'include'> & {
      select?: EstatusUsuariosCountAggregateInputType | true
    }
  >

  export interface EstatusUsuariosDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one EstatusUsuarios that matches the filter.
     * @param {EstatusUsuariosFindUniqueArgs} args - Arguments to find a EstatusUsuarios
     * @example
     * // Get one EstatusUsuarios
     * const estatusUsuarios = await prisma.estatusUsuarios.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EstatusUsuariosFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, EstatusUsuariosFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'EstatusUsuarios'> extends True ? CheckSelect<T, Prisma__EstatusUsuariosClient<EstatusUsuarios>, Prisma__EstatusUsuariosClient<EstatusUsuariosGetPayload<T>>> : CheckSelect<T, Prisma__EstatusUsuariosClient<EstatusUsuarios | null >, Prisma__EstatusUsuariosClient<EstatusUsuariosGetPayload<T> | null >>

    /**
     * Find the first EstatusUsuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstatusUsuariosFindFirstArgs} args - Arguments to find a EstatusUsuarios
     * @example
     * // Get one EstatusUsuarios
     * const estatusUsuarios = await prisma.estatusUsuarios.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EstatusUsuariosFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, EstatusUsuariosFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'EstatusUsuarios'> extends True ? CheckSelect<T, Prisma__EstatusUsuariosClient<EstatusUsuarios>, Prisma__EstatusUsuariosClient<EstatusUsuariosGetPayload<T>>> : CheckSelect<T, Prisma__EstatusUsuariosClient<EstatusUsuarios | null >, Prisma__EstatusUsuariosClient<EstatusUsuariosGetPayload<T> | null >>

    /**
     * Find zero or more EstatusUsuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstatusUsuariosFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EstatusUsuarios
     * const estatusUsuarios = await prisma.estatusUsuarios.findMany()
     * 
     * // Get first 10 EstatusUsuarios
     * const estatusUsuarios = await prisma.estatusUsuarios.findMany({ take: 10 })
     * 
     * // Only select the `idEstatus`
     * const estatusUsuariosWithIdEstatusOnly = await prisma.estatusUsuarios.findMany({ select: { idEstatus: true } })
     * 
    **/
    findMany<T extends EstatusUsuariosFindManyArgs>(
      args?: SelectSubset<T, EstatusUsuariosFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<EstatusUsuarios>>, PrismaPromise<Array<EstatusUsuariosGetPayload<T>>>>

    /**
     * Create a EstatusUsuarios.
     * @param {EstatusUsuariosCreateArgs} args - Arguments to create a EstatusUsuarios.
     * @example
     * // Create one EstatusUsuarios
     * const EstatusUsuarios = await prisma.estatusUsuarios.create({
     *   data: {
     *     // ... data to create a EstatusUsuarios
     *   }
     * })
     * 
    **/
    create<T extends EstatusUsuariosCreateArgs>(
      args: SelectSubset<T, EstatusUsuariosCreateArgs>
    ): CheckSelect<T, Prisma__EstatusUsuariosClient<EstatusUsuarios>, Prisma__EstatusUsuariosClient<EstatusUsuariosGetPayload<T>>>

    /**
     * Create many EstatusUsuarios.
     *     @param {EstatusUsuariosCreateManyArgs} args - Arguments to create many EstatusUsuarios.
     *     @example
     *     // Create many EstatusUsuarios
     *     const estatusUsuarios = await prisma.estatusUsuarios.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EstatusUsuariosCreateManyArgs>(
      args?: SelectSubset<T, EstatusUsuariosCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a EstatusUsuarios.
     * @param {EstatusUsuariosDeleteArgs} args - Arguments to delete one EstatusUsuarios.
     * @example
     * // Delete one EstatusUsuarios
     * const EstatusUsuarios = await prisma.estatusUsuarios.delete({
     *   where: {
     *     // ... filter to delete one EstatusUsuarios
     *   }
     * })
     * 
    **/
    delete<T extends EstatusUsuariosDeleteArgs>(
      args: SelectSubset<T, EstatusUsuariosDeleteArgs>
    ): CheckSelect<T, Prisma__EstatusUsuariosClient<EstatusUsuarios>, Prisma__EstatusUsuariosClient<EstatusUsuariosGetPayload<T>>>

    /**
     * Update one EstatusUsuarios.
     * @param {EstatusUsuariosUpdateArgs} args - Arguments to update one EstatusUsuarios.
     * @example
     * // Update one EstatusUsuarios
     * const estatusUsuarios = await prisma.estatusUsuarios.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EstatusUsuariosUpdateArgs>(
      args: SelectSubset<T, EstatusUsuariosUpdateArgs>
    ): CheckSelect<T, Prisma__EstatusUsuariosClient<EstatusUsuarios>, Prisma__EstatusUsuariosClient<EstatusUsuariosGetPayload<T>>>

    /**
     * Delete zero or more EstatusUsuarios.
     * @param {EstatusUsuariosDeleteManyArgs} args - Arguments to filter EstatusUsuarios to delete.
     * @example
     * // Delete a few EstatusUsuarios
     * const { count } = await prisma.estatusUsuarios.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EstatusUsuariosDeleteManyArgs>(
      args?: SelectSubset<T, EstatusUsuariosDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more EstatusUsuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstatusUsuariosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EstatusUsuarios
     * const estatusUsuarios = await prisma.estatusUsuarios.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EstatusUsuariosUpdateManyArgs>(
      args: SelectSubset<T, EstatusUsuariosUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one EstatusUsuarios.
     * @param {EstatusUsuariosUpsertArgs} args - Arguments to update or create a EstatusUsuarios.
     * @example
     * // Update or create a EstatusUsuarios
     * const estatusUsuarios = await prisma.estatusUsuarios.upsert({
     *   create: {
     *     // ... data to create a EstatusUsuarios
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EstatusUsuarios we want to update
     *   }
     * })
    **/
    upsert<T extends EstatusUsuariosUpsertArgs>(
      args: SelectSubset<T, EstatusUsuariosUpsertArgs>
    ): CheckSelect<T, Prisma__EstatusUsuariosClient<EstatusUsuarios>, Prisma__EstatusUsuariosClient<EstatusUsuariosGetPayload<T>>>

    /**
     * Count the number of EstatusUsuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstatusUsuariosCountArgs} args - Arguments to filter EstatusUsuarios to count.
     * @example
     * // Count the number of EstatusUsuarios
     * const count = await prisma.estatusUsuarios.count({
     *   where: {
     *     // ... the filter for the EstatusUsuarios we want to count
     *   }
     * })
    **/
    count<T extends EstatusUsuariosCountArgs>(
      args?: Subset<T, EstatusUsuariosCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EstatusUsuariosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EstatusUsuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstatusUsuariosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EstatusUsuariosAggregateArgs>(args: Subset<T, EstatusUsuariosAggregateArgs>): PrismaPromise<GetEstatusUsuariosAggregateType<T>>

    /**
     * Group by EstatusUsuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EstatusUsuariosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EstatusUsuariosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EstatusUsuariosGroupByArgs['orderBy'] }
        : { orderBy?: EstatusUsuariosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EstatusUsuariosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEstatusUsuariosGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for EstatusUsuarios.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EstatusUsuariosClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Usuarios<T extends UsuariosFindManyArgs = {}>(args?: Subset<T, UsuariosFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Usuarios>>, PrismaPromise<Array<UsuariosGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * EstatusUsuarios findUnique
   */
  export type EstatusUsuariosFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the EstatusUsuarios
     * 
    **/
    select?: EstatusUsuariosSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EstatusUsuariosInclude | null
    /**
     * Throw an Error if a EstatusUsuarios can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which EstatusUsuarios to fetch.
     * 
    **/
    where: EstatusUsuariosWhereUniqueInput
  }


  /**
   * EstatusUsuarios findFirst
   */
  export type EstatusUsuariosFindFirstArgs = {
    /**
     * Select specific fields to fetch from the EstatusUsuarios
     * 
    **/
    select?: EstatusUsuariosSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EstatusUsuariosInclude | null
    /**
     * Throw an Error if a EstatusUsuarios can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which EstatusUsuarios to fetch.
     * 
    **/
    where?: EstatusUsuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EstatusUsuarios to fetch.
     * 
    **/
    orderBy?: Enumerable<EstatusUsuariosOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EstatusUsuarios.
     * 
    **/
    cursor?: EstatusUsuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EstatusUsuarios from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EstatusUsuarios.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EstatusUsuarios.
     * 
    **/
    distinct?: Enumerable<EstatusUsuariosScalarFieldEnum>
  }


  /**
   * EstatusUsuarios findMany
   */
  export type EstatusUsuariosFindManyArgs = {
    /**
     * Select specific fields to fetch from the EstatusUsuarios
     * 
    **/
    select?: EstatusUsuariosSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EstatusUsuariosInclude | null
    /**
     * Filter, which EstatusUsuarios to fetch.
     * 
    **/
    where?: EstatusUsuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EstatusUsuarios to fetch.
     * 
    **/
    orderBy?: Enumerable<EstatusUsuariosOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EstatusUsuarios.
     * 
    **/
    cursor?: EstatusUsuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EstatusUsuarios from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EstatusUsuarios.
     * 
    **/
    skip?: number
    distinct?: Enumerable<EstatusUsuariosScalarFieldEnum>
  }


  /**
   * EstatusUsuarios create
   */
  export type EstatusUsuariosCreateArgs = {
    /**
     * Select specific fields to fetch from the EstatusUsuarios
     * 
    **/
    select?: EstatusUsuariosSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EstatusUsuariosInclude | null
    /**
     * The data needed to create a EstatusUsuarios.
     * 
    **/
    data: XOR<EstatusUsuariosCreateInput, EstatusUsuariosUncheckedCreateInput>
  }


  /**
   * EstatusUsuarios createMany
   */
  export type EstatusUsuariosCreateManyArgs = {
    /**
     * The data used to create many EstatusUsuarios.
     * 
    **/
    data: Enumerable<EstatusUsuariosCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * EstatusUsuarios update
   */
  export type EstatusUsuariosUpdateArgs = {
    /**
     * Select specific fields to fetch from the EstatusUsuarios
     * 
    **/
    select?: EstatusUsuariosSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EstatusUsuariosInclude | null
    /**
     * The data needed to update a EstatusUsuarios.
     * 
    **/
    data: XOR<EstatusUsuariosUpdateInput, EstatusUsuariosUncheckedUpdateInput>
    /**
     * Choose, which EstatusUsuarios to update.
     * 
    **/
    where: EstatusUsuariosWhereUniqueInput
  }


  /**
   * EstatusUsuarios updateMany
   */
  export type EstatusUsuariosUpdateManyArgs = {
    /**
     * The data used to update EstatusUsuarios.
     * 
    **/
    data: XOR<EstatusUsuariosUpdateManyMutationInput, EstatusUsuariosUncheckedUpdateManyInput>
    /**
     * Filter which EstatusUsuarios to update
     * 
    **/
    where?: EstatusUsuariosWhereInput
  }


  /**
   * EstatusUsuarios upsert
   */
  export type EstatusUsuariosUpsertArgs = {
    /**
     * Select specific fields to fetch from the EstatusUsuarios
     * 
    **/
    select?: EstatusUsuariosSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EstatusUsuariosInclude | null
    /**
     * The filter to search for the EstatusUsuarios to update in case it exists.
     * 
    **/
    where: EstatusUsuariosWhereUniqueInput
    /**
     * In case the EstatusUsuarios found by the `where` argument doesn't exist, create a new EstatusUsuarios with this data.
     * 
    **/
    create: XOR<EstatusUsuariosCreateInput, EstatusUsuariosUncheckedCreateInput>
    /**
     * In case the EstatusUsuarios was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<EstatusUsuariosUpdateInput, EstatusUsuariosUncheckedUpdateInput>
  }


  /**
   * EstatusUsuarios delete
   */
  export type EstatusUsuariosDeleteArgs = {
    /**
     * Select specific fields to fetch from the EstatusUsuarios
     * 
    **/
    select?: EstatusUsuariosSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EstatusUsuariosInclude | null
    /**
     * Filter which EstatusUsuarios to delete.
     * 
    **/
    where: EstatusUsuariosWhereUniqueInput
  }


  /**
   * EstatusUsuarios deleteMany
   */
  export type EstatusUsuariosDeleteManyArgs = {
    /**
     * Filter which EstatusUsuarios to delete
     * 
    **/
    where?: EstatusUsuariosWhereInput
  }


  /**
   * EstatusUsuarios without action
   */
  export type EstatusUsuariosArgs = {
    /**
     * Select specific fields to fetch from the EstatusUsuarios
     * 
    **/
    select?: EstatusUsuariosSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: EstatusUsuariosInclude | null
  }



  /**
   * Model PingServidores
   */


  export type AggregatePingServidores = {
    _count: PingServidoresCountAggregateOutputType | null
    _avg: PingServidoresAvgAggregateOutputType | null
    _sum: PingServidoresSumAggregateOutputType | null
    _min: PingServidoresMinAggregateOutputType | null
    _max: PingServidoresMaxAggregateOutputType | null
  }

  export type PingServidoresAvgAggregateOutputType = {
    idPingServidor: number | null
    idServidor: number | null
    times: number | null
    packetLoss: number | null
    min: number | null
    max: number | null
    avg: number | null
  }

  export type PingServidoresSumAggregateOutputType = {
    idPingServidor: number | null
    idServidor: number | null
    times: number | null
    packetLoss: number | null
    min: number | null
    max: number | null
    avg: number | null
  }

  export type PingServidoresMinAggregateOutputType = {
    idPingServidor: number | null
    idServidor: number | null
    times: number | null
    packetLoss: number | null
    min: number | null
    max: number | null
    avg: number | null
    log: string | null
    isAlive: boolean | null
    numericHost: string | null
    fechaPing: Date | null
  }

  export type PingServidoresMaxAggregateOutputType = {
    idPingServidor: number | null
    idServidor: number | null
    times: number | null
    packetLoss: number | null
    min: number | null
    max: number | null
    avg: number | null
    log: string | null
    isAlive: boolean | null
    numericHost: string | null
    fechaPing: Date | null
  }

  export type PingServidoresCountAggregateOutputType = {
    idPingServidor: number
    idServidor: number
    times: number
    packetLoss: number
    min: number
    max: number
    avg: number
    log: number
    isAlive: number
    numericHost: number
    fechaPing: number
    _all: number
  }


  export type PingServidoresAvgAggregateInputType = {
    idPingServidor?: true
    idServidor?: true
    times?: true
    packetLoss?: true
    min?: true
    max?: true
    avg?: true
  }

  export type PingServidoresSumAggregateInputType = {
    idPingServidor?: true
    idServidor?: true
    times?: true
    packetLoss?: true
    min?: true
    max?: true
    avg?: true
  }

  export type PingServidoresMinAggregateInputType = {
    idPingServidor?: true
    idServidor?: true
    times?: true
    packetLoss?: true
    min?: true
    max?: true
    avg?: true
    log?: true
    isAlive?: true
    numericHost?: true
    fechaPing?: true
  }

  export type PingServidoresMaxAggregateInputType = {
    idPingServidor?: true
    idServidor?: true
    times?: true
    packetLoss?: true
    min?: true
    max?: true
    avg?: true
    log?: true
    isAlive?: true
    numericHost?: true
    fechaPing?: true
  }

  export type PingServidoresCountAggregateInputType = {
    idPingServidor?: true
    idServidor?: true
    times?: true
    packetLoss?: true
    min?: true
    max?: true
    avg?: true
    log?: true
    isAlive?: true
    numericHost?: true
    fechaPing?: true
    _all?: true
  }

  export type PingServidoresAggregateArgs = {
    /**
     * Filter which PingServidores to aggregate.
     * 
    **/
    where?: PingServidoresWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PingServidores to fetch.
     * 
    **/
    orderBy?: Enumerable<PingServidoresOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PingServidoresWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PingServidores from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PingServidores.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PingServidores
    **/
    _count?: true | PingServidoresCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PingServidoresAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PingServidoresSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PingServidoresMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PingServidoresMaxAggregateInputType
  }

  export type GetPingServidoresAggregateType<T extends PingServidoresAggregateArgs> = {
        [P in keyof T & keyof AggregatePingServidores]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePingServidores[P]>
      : GetScalarType<T[P], AggregatePingServidores[P]>
  }




  export type PingServidoresGroupByArgs = {
    where?: PingServidoresWhereInput
    orderBy?: Enumerable<PingServidoresOrderByWithAggregationInput>
    by: Array<PingServidoresScalarFieldEnum>
    having?: PingServidoresScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PingServidoresCountAggregateInputType | true
    _avg?: PingServidoresAvgAggregateInputType
    _sum?: PingServidoresSumAggregateInputType
    _min?: PingServidoresMinAggregateInputType
    _max?: PingServidoresMaxAggregateInputType
  }


  export type PingServidoresGroupByOutputType = {
    idPingServidor: number
    idServidor: number
    times: number | null
    packetLoss: number | null
    min: number | null
    max: number | null
    avg: number | null
    log: string | null
    isAlive: boolean | null
    numericHost: string | null
    fechaPing: Date
    _count: PingServidoresCountAggregateOutputType | null
    _avg: PingServidoresAvgAggregateOutputType | null
    _sum: PingServidoresSumAggregateOutputType | null
    _min: PingServidoresMinAggregateOutputType | null
    _max: PingServidoresMaxAggregateOutputType | null
  }

  type GetPingServidoresGroupByPayload<T extends PingServidoresGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PingServidoresGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PingServidoresGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PingServidoresGroupByOutputType[P]>
            : GetScalarType<T[P], PingServidoresGroupByOutputType[P]>
        }
      >
    >


  export type PingServidoresSelect = {
    idPingServidor?: boolean
    idServidor?: boolean
    times?: boolean
    packetLoss?: boolean
    min?: boolean
    max?: boolean
    avg?: boolean
    log?: boolean
    isAlive?: boolean
    numericHost?: boolean
    fechaPing?: boolean
    Servidores?: boolean | ServidoresArgs
  }

  export type PingServidoresInclude = {
    Servidores?: boolean | ServidoresArgs
  }

  export type PingServidoresGetPayload<
    S extends boolean | null | undefined | PingServidoresArgs,
    U = keyof S
      > = S extends true
        ? PingServidores
    : S extends undefined
    ? never
    : S extends PingServidoresArgs | PingServidoresFindManyArgs
    ?'include' extends U
    ? PingServidores  & {
    [P in TrueKeys<S['include']>]:
        P extends 'Servidores' ? ServidoresGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'Servidores' ? ServidoresGetPayload<S['select'][P]> :  P extends keyof PingServidores ? PingServidores[P] : never
  } 
    : PingServidores
  : PingServidores


  type PingServidoresCountArgs = Merge<
    Omit<PingServidoresFindManyArgs, 'select' | 'include'> & {
      select?: PingServidoresCountAggregateInputType | true
    }
  >

  export interface PingServidoresDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one PingServidores that matches the filter.
     * @param {PingServidoresFindUniqueArgs} args - Arguments to find a PingServidores
     * @example
     * // Get one PingServidores
     * const pingServidores = await prisma.pingServidores.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PingServidoresFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PingServidoresFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'PingServidores'> extends True ? CheckSelect<T, Prisma__PingServidoresClient<PingServidores>, Prisma__PingServidoresClient<PingServidoresGetPayload<T>>> : CheckSelect<T, Prisma__PingServidoresClient<PingServidores | null >, Prisma__PingServidoresClient<PingServidoresGetPayload<T> | null >>

    /**
     * Find the first PingServidores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PingServidoresFindFirstArgs} args - Arguments to find a PingServidores
     * @example
     * // Get one PingServidores
     * const pingServidores = await prisma.pingServidores.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PingServidoresFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PingServidoresFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'PingServidores'> extends True ? CheckSelect<T, Prisma__PingServidoresClient<PingServidores>, Prisma__PingServidoresClient<PingServidoresGetPayload<T>>> : CheckSelect<T, Prisma__PingServidoresClient<PingServidores | null >, Prisma__PingServidoresClient<PingServidoresGetPayload<T> | null >>

    /**
     * Find zero or more PingServidores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PingServidoresFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PingServidores
     * const pingServidores = await prisma.pingServidores.findMany()
     * 
     * // Get first 10 PingServidores
     * const pingServidores = await prisma.pingServidores.findMany({ take: 10 })
     * 
     * // Only select the `idPingServidor`
     * const pingServidoresWithIdPingServidorOnly = await prisma.pingServidores.findMany({ select: { idPingServidor: true } })
     * 
    **/
    findMany<T extends PingServidoresFindManyArgs>(
      args?: SelectSubset<T, PingServidoresFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<PingServidores>>, PrismaPromise<Array<PingServidoresGetPayload<T>>>>

    /**
     * Create a PingServidores.
     * @param {PingServidoresCreateArgs} args - Arguments to create a PingServidores.
     * @example
     * // Create one PingServidores
     * const PingServidores = await prisma.pingServidores.create({
     *   data: {
     *     // ... data to create a PingServidores
     *   }
     * })
     * 
    **/
    create<T extends PingServidoresCreateArgs>(
      args: SelectSubset<T, PingServidoresCreateArgs>
    ): CheckSelect<T, Prisma__PingServidoresClient<PingServidores>, Prisma__PingServidoresClient<PingServidoresGetPayload<T>>>

    /**
     * Create many PingServidores.
     *     @param {PingServidoresCreateManyArgs} args - Arguments to create many PingServidores.
     *     @example
     *     // Create many PingServidores
     *     const pingServidores = await prisma.pingServidores.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PingServidoresCreateManyArgs>(
      args?: SelectSubset<T, PingServidoresCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a PingServidores.
     * @param {PingServidoresDeleteArgs} args - Arguments to delete one PingServidores.
     * @example
     * // Delete one PingServidores
     * const PingServidores = await prisma.pingServidores.delete({
     *   where: {
     *     // ... filter to delete one PingServidores
     *   }
     * })
     * 
    **/
    delete<T extends PingServidoresDeleteArgs>(
      args: SelectSubset<T, PingServidoresDeleteArgs>
    ): CheckSelect<T, Prisma__PingServidoresClient<PingServidores>, Prisma__PingServidoresClient<PingServidoresGetPayload<T>>>

    /**
     * Update one PingServidores.
     * @param {PingServidoresUpdateArgs} args - Arguments to update one PingServidores.
     * @example
     * // Update one PingServidores
     * const pingServidores = await prisma.pingServidores.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PingServidoresUpdateArgs>(
      args: SelectSubset<T, PingServidoresUpdateArgs>
    ): CheckSelect<T, Prisma__PingServidoresClient<PingServidores>, Prisma__PingServidoresClient<PingServidoresGetPayload<T>>>

    /**
     * Delete zero or more PingServidores.
     * @param {PingServidoresDeleteManyArgs} args - Arguments to filter PingServidores to delete.
     * @example
     * // Delete a few PingServidores
     * const { count } = await prisma.pingServidores.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PingServidoresDeleteManyArgs>(
      args?: SelectSubset<T, PingServidoresDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more PingServidores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PingServidoresUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PingServidores
     * const pingServidores = await prisma.pingServidores.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PingServidoresUpdateManyArgs>(
      args: SelectSubset<T, PingServidoresUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one PingServidores.
     * @param {PingServidoresUpsertArgs} args - Arguments to update or create a PingServidores.
     * @example
     * // Update or create a PingServidores
     * const pingServidores = await prisma.pingServidores.upsert({
     *   create: {
     *     // ... data to create a PingServidores
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PingServidores we want to update
     *   }
     * })
    **/
    upsert<T extends PingServidoresUpsertArgs>(
      args: SelectSubset<T, PingServidoresUpsertArgs>
    ): CheckSelect<T, Prisma__PingServidoresClient<PingServidores>, Prisma__PingServidoresClient<PingServidoresGetPayload<T>>>

    /**
     * Count the number of PingServidores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PingServidoresCountArgs} args - Arguments to filter PingServidores to count.
     * @example
     * // Count the number of PingServidores
     * const count = await prisma.pingServidores.count({
     *   where: {
     *     // ... the filter for the PingServidores we want to count
     *   }
     * })
    **/
    count<T extends PingServidoresCountArgs>(
      args?: Subset<T, PingServidoresCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PingServidoresCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PingServidores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PingServidoresAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PingServidoresAggregateArgs>(args: Subset<T, PingServidoresAggregateArgs>): PrismaPromise<GetPingServidoresAggregateType<T>>

    /**
     * Group by PingServidores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PingServidoresGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PingServidoresGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PingServidoresGroupByArgs['orderBy'] }
        : { orderBy?: PingServidoresGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PingServidoresGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPingServidoresGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for PingServidores.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PingServidoresClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Servidores<T extends ServidoresArgs = {}>(args?: Subset<T, ServidoresArgs>): CheckSelect<T, Prisma__ServidoresClient<Servidores | null >, Prisma__ServidoresClient<ServidoresGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * PingServidores findUnique
   */
  export type PingServidoresFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the PingServidores
     * 
    **/
    select?: PingServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PingServidoresInclude | null
    /**
     * Throw an Error if a PingServidores can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which PingServidores to fetch.
     * 
    **/
    where: PingServidoresWhereUniqueInput
  }


  /**
   * PingServidores findFirst
   */
  export type PingServidoresFindFirstArgs = {
    /**
     * Select specific fields to fetch from the PingServidores
     * 
    **/
    select?: PingServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PingServidoresInclude | null
    /**
     * Throw an Error if a PingServidores can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which PingServidores to fetch.
     * 
    **/
    where?: PingServidoresWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PingServidores to fetch.
     * 
    **/
    orderBy?: Enumerable<PingServidoresOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PingServidores.
     * 
    **/
    cursor?: PingServidoresWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PingServidores from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PingServidores.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PingServidores.
     * 
    **/
    distinct?: Enumerable<PingServidoresScalarFieldEnum>
  }


  /**
   * PingServidores findMany
   */
  export type PingServidoresFindManyArgs = {
    /**
     * Select specific fields to fetch from the PingServidores
     * 
    **/
    select?: PingServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PingServidoresInclude | null
    /**
     * Filter, which PingServidores to fetch.
     * 
    **/
    where?: PingServidoresWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PingServidores to fetch.
     * 
    **/
    orderBy?: Enumerable<PingServidoresOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PingServidores.
     * 
    **/
    cursor?: PingServidoresWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PingServidores from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PingServidores.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PingServidoresScalarFieldEnum>
  }


  /**
   * PingServidores create
   */
  export type PingServidoresCreateArgs = {
    /**
     * Select specific fields to fetch from the PingServidores
     * 
    **/
    select?: PingServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PingServidoresInclude | null
    /**
     * The data needed to create a PingServidores.
     * 
    **/
    data: XOR<PingServidoresCreateInput, PingServidoresUncheckedCreateInput>
  }


  /**
   * PingServidores createMany
   */
  export type PingServidoresCreateManyArgs = {
    /**
     * The data used to create many PingServidores.
     * 
    **/
    data: Enumerable<PingServidoresCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * PingServidores update
   */
  export type PingServidoresUpdateArgs = {
    /**
     * Select specific fields to fetch from the PingServidores
     * 
    **/
    select?: PingServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PingServidoresInclude | null
    /**
     * The data needed to update a PingServidores.
     * 
    **/
    data: XOR<PingServidoresUpdateInput, PingServidoresUncheckedUpdateInput>
    /**
     * Choose, which PingServidores to update.
     * 
    **/
    where: PingServidoresWhereUniqueInput
  }


  /**
   * PingServidores updateMany
   */
  export type PingServidoresUpdateManyArgs = {
    /**
     * The data used to update PingServidores.
     * 
    **/
    data: XOR<PingServidoresUpdateManyMutationInput, PingServidoresUncheckedUpdateManyInput>
    /**
     * Filter which PingServidores to update
     * 
    **/
    where?: PingServidoresWhereInput
  }


  /**
   * PingServidores upsert
   */
  export type PingServidoresUpsertArgs = {
    /**
     * Select specific fields to fetch from the PingServidores
     * 
    **/
    select?: PingServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PingServidoresInclude | null
    /**
     * The filter to search for the PingServidores to update in case it exists.
     * 
    **/
    where: PingServidoresWhereUniqueInput
    /**
     * In case the PingServidores found by the `where` argument doesn't exist, create a new PingServidores with this data.
     * 
    **/
    create: XOR<PingServidoresCreateInput, PingServidoresUncheckedCreateInput>
    /**
     * In case the PingServidores was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PingServidoresUpdateInput, PingServidoresUncheckedUpdateInput>
  }


  /**
   * PingServidores delete
   */
  export type PingServidoresDeleteArgs = {
    /**
     * Select specific fields to fetch from the PingServidores
     * 
    **/
    select?: PingServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PingServidoresInclude | null
    /**
     * Filter which PingServidores to delete.
     * 
    **/
    where: PingServidoresWhereUniqueInput
  }


  /**
   * PingServidores deleteMany
   */
  export type PingServidoresDeleteManyArgs = {
    /**
     * Filter which PingServidores to delete
     * 
    **/
    where?: PingServidoresWhereInput
  }


  /**
   * PingServidores without action
   */
  export type PingServidoresArgs = {
    /**
     * Select specific fields to fetch from the PingServidores
     * 
    **/
    select?: PingServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PingServidoresInclude | null
  }



  /**
   * Model Servidores
   */


  export type AggregateServidores = {
    _count: ServidoresCountAggregateOutputType | null
    _avg: ServidoresAvgAggregateOutputType | null
    _sum: ServidoresSumAggregateOutputType | null
    _min: ServidoresMinAggregateOutputType | null
    _max: ServidoresMaxAggregateOutputType | null
  }

  export type ServidoresAvgAggregateOutputType = {
    idServidor: number | null
    estatus: number | null
    idUsuario: number | null
  }

  export type ServidoresSumAggregateOutputType = {
    idServidor: number | null
    estatus: number | null
    idUsuario: number | null
  }

  export type ServidoresMinAggregateOutputType = {
    publicId: string | null
    idServidor: number | null
    estatus: number | null
    dominio: string | null
    ip: string | null
    fechaCreacion: Date | null
    fechaActualizacion: Date | null
    descripcion: string | null
    idUsuario: number | null
    nombre: string | null
  }

  export type ServidoresMaxAggregateOutputType = {
    publicId: string | null
    idServidor: number | null
    estatus: number | null
    dominio: string | null
    ip: string | null
    fechaCreacion: Date | null
    fechaActualizacion: Date | null
    descripcion: string | null
    idUsuario: number | null
    nombre: string | null
  }

  export type ServidoresCountAggregateOutputType = {
    publicId: number
    idServidor: number
    estatus: number
    dominio: number
    ip: number
    fechaCreacion: number
    fechaActualizacion: number
    descripcion: number
    idUsuario: number
    nombre: number
    _all: number
  }


  export type ServidoresAvgAggregateInputType = {
    idServidor?: true
    estatus?: true
    idUsuario?: true
  }

  export type ServidoresSumAggregateInputType = {
    idServidor?: true
    estatus?: true
    idUsuario?: true
  }

  export type ServidoresMinAggregateInputType = {
    publicId?: true
    idServidor?: true
    estatus?: true
    dominio?: true
    ip?: true
    fechaCreacion?: true
    fechaActualizacion?: true
    descripcion?: true
    idUsuario?: true
    nombre?: true
  }

  export type ServidoresMaxAggregateInputType = {
    publicId?: true
    idServidor?: true
    estatus?: true
    dominio?: true
    ip?: true
    fechaCreacion?: true
    fechaActualizacion?: true
    descripcion?: true
    idUsuario?: true
    nombre?: true
  }

  export type ServidoresCountAggregateInputType = {
    publicId?: true
    idServidor?: true
    estatus?: true
    dominio?: true
    ip?: true
    fechaCreacion?: true
    fechaActualizacion?: true
    descripcion?: true
    idUsuario?: true
    nombre?: true
    _all?: true
  }

  export type ServidoresAggregateArgs = {
    /**
     * Filter which Servidores to aggregate.
     * 
    **/
    where?: ServidoresWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servidores to fetch.
     * 
    **/
    orderBy?: Enumerable<ServidoresOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ServidoresWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servidores from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servidores.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Servidores
    **/
    _count?: true | ServidoresCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServidoresAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServidoresSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServidoresMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServidoresMaxAggregateInputType
  }

  export type GetServidoresAggregateType<T extends ServidoresAggregateArgs> = {
        [P in keyof T & keyof AggregateServidores]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServidores[P]>
      : GetScalarType<T[P], AggregateServidores[P]>
  }




  export type ServidoresGroupByArgs = {
    where?: ServidoresWhereInput
    orderBy?: Enumerable<ServidoresOrderByWithAggregationInput>
    by: Array<ServidoresScalarFieldEnum>
    having?: ServidoresScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServidoresCountAggregateInputType | true
    _avg?: ServidoresAvgAggregateInputType
    _sum?: ServidoresSumAggregateInputType
    _min?: ServidoresMinAggregateInputType
    _max?: ServidoresMaxAggregateInputType
  }


  export type ServidoresGroupByOutputType = {
    publicId: string | null
    idServidor: number
    estatus: number
    dominio: string
    ip: string | null
    fechaCreacion: Date
    fechaActualizacion: Date | null
    descripcion: string | null
    idUsuario: number | null
    nombre: string
    _count: ServidoresCountAggregateOutputType | null
    _avg: ServidoresAvgAggregateOutputType | null
    _sum: ServidoresSumAggregateOutputType | null
    _min: ServidoresMinAggregateOutputType | null
    _max: ServidoresMaxAggregateOutputType | null
  }

  type GetServidoresGroupByPayload<T extends ServidoresGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ServidoresGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServidoresGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServidoresGroupByOutputType[P]>
            : GetScalarType<T[P], ServidoresGroupByOutputType[P]>
        }
      >
    >


  export type ServidoresSelect = {
    publicId?: boolean
    idServidor?: boolean
    estatus?: boolean
    dominio?: boolean
    ip?: boolean
    fechaCreacion?: boolean
    fechaActualizacion?: boolean
    descripcion?: boolean
    idUsuario?: boolean
    nombre?: boolean
    EstatusServidores?: boolean | EstatusServidoresArgs
    Usuarios?: boolean | UsuariosArgs
    PingServidores?: boolean | PingServidoresFindManyArgs
    Tasks?: boolean | TasksFindManyArgs
    _count?: boolean | ServidoresCountOutputTypeArgs
  }

  export type ServidoresInclude = {
    EstatusServidores?: boolean | EstatusServidoresArgs
    Usuarios?: boolean | UsuariosArgs
    PingServidores?: boolean | PingServidoresFindManyArgs
    Tasks?: boolean | TasksFindManyArgs
    _count?: boolean | ServidoresCountOutputTypeArgs
  }

  export type ServidoresGetPayload<
    S extends boolean | null | undefined | ServidoresArgs,
    U = keyof S
      > = S extends true
        ? Servidores
    : S extends undefined
    ? never
    : S extends ServidoresArgs | ServidoresFindManyArgs
    ?'include' extends U
    ? Servidores  & {
    [P in TrueKeys<S['include']>]:
        P extends 'EstatusServidores' ? EstatusServidoresGetPayload<S['include'][P]> :
        P extends 'Usuarios' ? UsuariosGetPayload<S['include'][P]> | null :
        P extends 'PingServidores' ? Array < PingServidoresGetPayload<S['include'][P]>>  :
        P extends 'Tasks' ? Array < TasksGetPayload<S['include'][P]>>  :
        P extends '_count' ? ServidoresCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'EstatusServidores' ? EstatusServidoresGetPayload<S['select'][P]> :
        P extends 'Usuarios' ? UsuariosGetPayload<S['select'][P]> | null :
        P extends 'PingServidores' ? Array < PingServidoresGetPayload<S['select'][P]>>  :
        P extends 'Tasks' ? Array < TasksGetPayload<S['select'][P]>>  :
        P extends '_count' ? ServidoresCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Servidores ? Servidores[P] : never
  } 
    : Servidores
  : Servidores


  type ServidoresCountArgs = Merge<
    Omit<ServidoresFindManyArgs, 'select' | 'include'> & {
      select?: ServidoresCountAggregateInputType | true
    }
  >

  export interface ServidoresDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Servidores that matches the filter.
     * @param {ServidoresFindUniqueArgs} args - Arguments to find a Servidores
     * @example
     * // Get one Servidores
     * const servidores = await prisma.servidores.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ServidoresFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ServidoresFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Servidores'> extends True ? CheckSelect<T, Prisma__ServidoresClient<Servidores>, Prisma__ServidoresClient<ServidoresGetPayload<T>>> : CheckSelect<T, Prisma__ServidoresClient<Servidores | null >, Prisma__ServidoresClient<ServidoresGetPayload<T> | null >>

    /**
     * Find the first Servidores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServidoresFindFirstArgs} args - Arguments to find a Servidores
     * @example
     * // Get one Servidores
     * const servidores = await prisma.servidores.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ServidoresFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ServidoresFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Servidores'> extends True ? CheckSelect<T, Prisma__ServidoresClient<Servidores>, Prisma__ServidoresClient<ServidoresGetPayload<T>>> : CheckSelect<T, Prisma__ServidoresClient<Servidores | null >, Prisma__ServidoresClient<ServidoresGetPayload<T> | null >>

    /**
     * Find zero or more Servidores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServidoresFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Servidores
     * const servidores = await prisma.servidores.findMany()
     * 
     * // Get first 10 Servidores
     * const servidores = await prisma.servidores.findMany({ take: 10 })
     * 
     * // Only select the `publicId`
     * const servidoresWithPublicIdOnly = await prisma.servidores.findMany({ select: { publicId: true } })
     * 
    **/
    findMany<T extends ServidoresFindManyArgs>(
      args?: SelectSubset<T, ServidoresFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Servidores>>, PrismaPromise<Array<ServidoresGetPayload<T>>>>

    /**
     * Create a Servidores.
     * @param {ServidoresCreateArgs} args - Arguments to create a Servidores.
     * @example
     * // Create one Servidores
     * const Servidores = await prisma.servidores.create({
     *   data: {
     *     // ... data to create a Servidores
     *   }
     * })
     * 
    **/
    create<T extends ServidoresCreateArgs>(
      args: SelectSubset<T, ServidoresCreateArgs>
    ): CheckSelect<T, Prisma__ServidoresClient<Servidores>, Prisma__ServidoresClient<ServidoresGetPayload<T>>>

    /**
     * Create many Servidores.
     *     @param {ServidoresCreateManyArgs} args - Arguments to create many Servidores.
     *     @example
     *     // Create many Servidores
     *     const servidores = await prisma.servidores.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ServidoresCreateManyArgs>(
      args?: SelectSubset<T, ServidoresCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Servidores.
     * @param {ServidoresDeleteArgs} args - Arguments to delete one Servidores.
     * @example
     * // Delete one Servidores
     * const Servidores = await prisma.servidores.delete({
     *   where: {
     *     // ... filter to delete one Servidores
     *   }
     * })
     * 
    **/
    delete<T extends ServidoresDeleteArgs>(
      args: SelectSubset<T, ServidoresDeleteArgs>
    ): CheckSelect<T, Prisma__ServidoresClient<Servidores>, Prisma__ServidoresClient<ServidoresGetPayload<T>>>

    /**
     * Update one Servidores.
     * @param {ServidoresUpdateArgs} args - Arguments to update one Servidores.
     * @example
     * // Update one Servidores
     * const servidores = await prisma.servidores.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ServidoresUpdateArgs>(
      args: SelectSubset<T, ServidoresUpdateArgs>
    ): CheckSelect<T, Prisma__ServidoresClient<Servidores>, Prisma__ServidoresClient<ServidoresGetPayload<T>>>

    /**
     * Delete zero or more Servidores.
     * @param {ServidoresDeleteManyArgs} args - Arguments to filter Servidores to delete.
     * @example
     * // Delete a few Servidores
     * const { count } = await prisma.servidores.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ServidoresDeleteManyArgs>(
      args?: SelectSubset<T, ServidoresDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Servidores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServidoresUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Servidores
     * const servidores = await prisma.servidores.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ServidoresUpdateManyArgs>(
      args: SelectSubset<T, ServidoresUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Servidores.
     * @param {ServidoresUpsertArgs} args - Arguments to update or create a Servidores.
     * @example
     * // Update or create a Servidores
     * const servidores = await prisma.servidores.upsert({
     *   create: {
     *     // ... data to create a Servidores
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Servidores we want to update
     *   }
     * })
    **/
    upsert<T extends ServidoresUpsertArgs>(
      args: SelectSubset<T, ServidoresUpsertArgs>
    ): CheckSelect<T, Prisma__ServidoresClient<Servidores>, Prisma__ServidoresClient<ServidoresGetPayload<T>>>

    /**
     * Count the number of Servidores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServidoresCountArgs} args - Arguments to filter Servidores to count.
     * @example
     * // Count the number of Servidores
     * const count = await prisma.servidores.count({
     *   where: {
     *     // ... the filter for the Servidores we want to count
     *   }
     * })
    **/
    count<T extends ServidoresCountArgs>(
      args?: Subset<T, ServidoresCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServidoresCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Servidores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServidoresAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServidoresAggregateArgs>(args: Subset<T, ServidoresAggregateArgs>): PrismaPromise<GetServidoresAggregateType<T>>

    /**
     * Group by Servidores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServidoresGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServidoresGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServidoresGroupByArgs['orderBy'] }
        : { orderBy?: ServidoresGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServidoresGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServidoresGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Servidores.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ServidoresClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    EstatusServidores<T extends EstatusServidoresArgs = {}>(args?: Subset<T, EstatusServidoresArgs>): CheckSelect<T, Prisma__EstatusServidoresClient<EstatusServidores | null >, Prisma__EstatusServidoresClient<EstatusServidoresGetPayload<T> | null >>;

    Usuarios<T extends UsuariosArgs = {}>(args?: Subset<T, UsuariosArgs>): CheckSelect<T, Prisma__UsuariosClient<Usuarios | null >, Prisma__UsuariosClient<UsuariosGetPayload<T> | null >>;

    PingServidores<T extends PingServidoresFindManyArgs = {}>(args?: Subset<T, PingServidoresFindManyArgs>): CheckSelect<T, PrismaPromise<Array<PingServidores>>, PrismaPromise<Array<PingServidoresGetPayload<T>>>>;

    Tasks<T extends TasksFindManyArgs = {}>(args?: Subset<T, TasksFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Tasks>>, PrismaPromise<Array<TasksGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Servidores findUnique
   */
  export type ServidoresFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Servidores
     * 
    **/
    select?: ServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServidoresInclude | null
    /**
     * Throw an Error if a Servidores can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Servidores to fetch.
     * 
    **/
    where: ServidoresWhereUniqueInput
  }


  /**
   * Servidores findFirst
   */
  export type ServidoresFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Servidores
     * 
    **/
    select?: ServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServidoresInclude | null
    /**
     * Throw an Error if a Servidores can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Servidores to fetch.
     * 
    **/
    where?: ServidoresWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servidores to fetch.
     * 
    **/
    orderBy?: Enumerable<ServidoresOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Servidores.
     * 
    **/
    cursor?: ServidoresWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servidores from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servidores.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Servidores.
     * 
    **/
    distinct?: Enumerable<ServidoresScalarFieldEnum>
  }


  /**
   * Servidores findMany
   */
  export type ServidoresFindManyArgs = {
    /**
     * Select specific fields to fetch from the Servidores
     * 
    **/
    select?: ServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServidoresInclude | null
    /**
     * Filter, which Servidores to fetch.
     * 
    **/
    where?: ServidoresWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Servidores to fetch.
     * 
    **/
    orderBy?: Enumerable<ServidoresOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Servidores.
     * 
    **/
    cursor?: ServidoresWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Servidores from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Servidores.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ServidoresScalarFieldEnum>
  }


  /**
   * Servidores create
   */
  export type ServidoresCreateArgs = {
    /**
     * Select specific fields to fetch from the Servidores
     * 
    **/
    select?: ServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServidoresInclude | null
    /**
     * The data needed to create a Servidores.
     * 
    **/
    data: XOR<ServidoresCreateInput, ServidoresUncheckedCreateInput>
  }


  /**
   * Servidores createMany
   */
  export type ServidoresCreateManyArgs = {
    /**
     * The data used to create many Servidores.
     * 
    **/
    data: Enumerable<ServidoresCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Servidores update
   */
  export type ServidoresUpdateArgs = {
    /**
     * Select specific fields to fetch from the Servidores
     * 
    **/
    select?: ServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServidoresInclude | null
    /**
     * The data needed to update a Servidores.
     * 
    **/
    data: XOR<ServidoresUpdateInput, ServidoresUncheckedUpdateInput>
    /**
     * Choose, which Servidores to update.
     * 
    **/
    where: ServidoresWhereUniqueInput
  }


  /**
   * Servidores updateMany
   */
  export type ServidoresUpdateManyArgs = {
    /**
     * The data used to update Servidores.
     * 
    **/
    data: XOR<ServidoresUpdateManyMutationInput, ServidoresUncheckedUpdateManyInput>
    /**
     * Filter which Servidores to update
     * 
    **/
    where?: ServidoresWhereInput
  }


  /**
   * Servidores upsert
   */
  export type ServidoresUpsertArgs = {
    /**
     * Select specific fields to fetch from the Servidores
     * 
    **/
    select?: ServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServidoresInclude | null
    /**
     * The filter to search for the Servidores to update in case it exists.
     * 
    **/
    where: ServidoresWhereUniqueInput
    /**
     * In case the Servidores found by the `where` argument doesn't exist, create a new Servidores with this data.
     * 
    **/
    create: XOR<ServidoresCreateInput, ServidoresUncheckedCreateInput>
    /**
     * In case the Servidores was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ServidoresUpdateInput, ServidoresUncheckedUpdateInput>
  }


  /**
   * Servidores delete
   */
  export type ServidoresDeleteArgs = {
    /**
     * Select specific fields to fetch from the Servidores
     * 
    **/
    select?: ServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServidoresInclude | null
    /**
     * Filter which Servidores to delete.
     * 
    **/
    where: ServidoresWhereUniqueInput
  }


  /**
   * Servidores deleteMany
   */
  export type ServidoresDeleteManyArgs = {
    /**
     * Filter which Servidores to delete
     * 
    **/
    where?: ServidoresWhereInput
  }


  /**
   * Servidores without action
   */
  export type ServidoresArgs = {
    /**
     * Select specific fields to fetch from the Servidores
     * 
    **/
    select?: ServidoresSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ServidoresInclude | null
  }



  /**
   * Model Tasks
   */


  export type AggregateTasks = {
    _count: TasksCountAggregateOutputType | null
    _avg: TasksAvgAggregateOutputType | null
    _sum: TasksSumAggregateOutputType | null
    _min: TasksMinAggregateOutputType | null
    _max: TasksMaxAggregateOutputType | null
  }

  export type TasksAvgAggregateOutputType = {
    id: number | null
    idServidor: number | null
    interval: number | null
  }

  export type TasksSumAggregateOutputType = {
    id: number | null
    idServidor: number | null
    interval: number | null
  }

  export type TasksMinAggregateOutputType = {
    id: number | null
    idTask: string | null
    idServidor: number | null
    estatus: TasksEstatus | null
    fechaCreacion: Date | null
    interval: number | null
    error: string | null
    type: TasksTypes | null
    ultimaEjecucion: Date | null
  }

  export type TasksMaxAggregateOutputType = {
    id: number | null
    idTask: string | null
    idServidor: number | null
    estatus: TasksEstatus | null
    fechaCreacion: Date | null
    interval: number | null
    error: string | null
    type: TasksTypes | null
    ultimaEjecucion: Date | null
  }

  export type TasksCountAggregateOutputType = {
    id: number
    idTask: number
    idServidor: number
    estatus: number
    fechaCreacion: number
    interval: number
    error: number
    type: number
    ultimaEjecucion: number
    _all: number
  }


  export type TasksAvgAggregateInputType = {
    id?: true
    idServidor?: true
    interval?: true
  }

  export type TasksSumAggregateInputType = {
    id?: true
    idServidor?: true
    interval?: true
  }

  export type TasksMinAggregateInputType = {
    id?: true
    idTask?: true
    idServidor?: true
    estatus?: true
    fechaCreacion?: true
    interval?: true
    error?: true
    type?: true
    ultimaEjecucion?: true
  }

  export type TasksMaxAggregateInputType = {
    id?: true
    idTask?: true
    idServidor?: true
    estatus?: true
    fechaCreacion?: true
    interval?: true
    error?: true
    type?: true
    ultimaEjecucion?: true
  }

  export type TasksCountAggregateInputType = {
    id?: true
    idTask?: true
    idServidor?: true
    estatus?: true
    fechaCreacion?: true
    interval?: true
    error?: true
    type?: true
    ultimaEjecucion?: true
    _all?: true
  }

  export type TasksAggregateArgs = {
    /**
     * Filter which Tasks to aggregate.
     * 
    **/
    where?: TasksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     * 
    **/
    orderBy?: Enumerable<TasksOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TasksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TasksCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TasksAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TasksSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TasksMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TasksMaxAggregateInputType
  }

  export type GetTasksAggregateType<T extends TasksAggregateArgs> = {
        [P in keyof T & keyof AggregateTasks]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTasks[P]>
      : GetScalarType<T[P], AggregateTasks[P]>
  }




  export type TasksGroupByArgs = {
    where?: TasksWhereInput
    orderBy?: Enumerable<TasksOrderByWithAggregationInput>
    by: Array<TasksScalarFieldEnum>
    having?: TasksScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TasksCountAggregateInputType | true
    _avg?: TasksAvgAggregateInputType
    _sum?: TasksSumAggregateInputType
    _min?: TasksMinAggregateInputType
    _max?: TasksMaxAggregateInputType
  }


  export type TasksGroupByOutputType = {
    id: number
    idTask: string
    idServidor: number | null
    estatus: TasksEstatus | null
    fechaCreacion: Date
    interval: number | null
    error: string | null
    type: TasksTypes
    ultimaEjecucion: Date | null
    _count: TasksCountAggregateOutputType | null
    _avg: TasksAvgAggregateOutputType | null
    _sum: TasksSumAggregateOutputType | null
    _min: TasksMinAggregateOutputType | null
    _max: TasksMaxAggregateOutputType | null
  }

  type GetTasksGroupByPayload<T extends TasksGroupByArgs> = PrismaPromise<
    Array<
      PickArray<TasksGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TasksGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TasksGroupByOutputType[P]>
            : GetScalarType<T[P], TasksGroupByOutputType[P]>
        }
      >
    >


  export type TasksSelect = {
    id?: boolean
    idTask?: boolean
    idServidor?: boolean
    estatus?: boolean
    fechaCreacion?: boolean
    interval?: boolean
    error?: boolean
    type?: boolean
    ultimaEjecucion?: boolean
    Servidores?: boolean | ServidoresArgs
  }

  export type TasksInclude = {
    Servidores?: boolean | ServidoresArgs
  }

  export type TasksGetPayload<
    S extends boolean | null | undefined | TasksArgs,
    U = keyof S
      > = S extends true
        ? Tasks
    : S extends undefined
    ? never
    : S extends TasksArgs | TasksFindManyArgs
    ?'include' extends U
    ? Tasks  & {
    [P in TrueKeys<S['include']>]:
        P extends 'Servidores' ? ServidoresGetPayload<S['include'][P]> | null :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'Servidores' ? ServidoresGetPayload<S['select'][P]> | null :  P extends keyof Tasks ? Tasks[P] : never
  } 
    : Tasks
  : Tasks


  type TasksCountArgs = Merge<
    Omit<TasksFindManyArgs, 'select' | 'include'> & {
      select?: TasksCountAggregateInputType | true
    }
  >

  export interface TasksDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Tasks that matches the filter.
     * @param {TasksFindUniqueArgs} args - Arguments to find a Tasks
     * @example
     * // Get one Tasks
     * const tasks = await prisma.tasks.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TasksFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TasksFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Tasks'> extends True ? CheckSelect<T, Prisma__TasksClient<Tasks>, Prisma__TasksClient<TasksGetPayload<T>>> : CheckSelect<T, Prisma__TasksClient<Tasks | null >, Prisma__TasksClient<TasksGetPayload<T> | null >>

    /**
     * Find the first Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TasksFindFirstArgs} args - Arguments to find a Tasks
     * @example
     * // Get one Tasks
     * const tasks = await prisma.tasks.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TasksFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TasksFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Tasks'> extends True ? CheckSelect<T, Prisma__TasksClient<Tasks>, Prisma__TasksClient<TasksGetPayload<T>>> : CheckSelect<T, Prisma__TasksClient<Tasks | null >, Prisma__TasksClient<TasksGetPayload<T> | null >>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TasksFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.tasks.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.tasks.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tasksWithIdOnly = await prisma.tasks.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TasksFindManyArgs>(
      args?: SelectSubset<T, TasksFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Tasks>>, PrismaPromise<Array<TasksGetPayload<T>>>>

    /**
     * Create a Tasks.
     * @param {TasksCreateArgs} args - Arguments to create a Tasks.
     * @example
     * // Create one Tasks
     * const Tasks = await prisma.tasks.create({
     *   data: {
     *     // ... data to create a Tasks
     *   }
     * })
     * 
    **/
    create<T extends TasksCreateArgs>(
      args: SelectSubset<T, TasksCreateArgs>
    ): CheckSelect<T, Prisma__TasksClient<Tasks>, Prisma__TasksClient<TasksGetPayload<T>>>

    /**
     * Create many Tasks.
     *     @param {TasksCreateManyArgs} args - Arguments to create many Tasks.
     *     @example
     *     // Create many Tasks
     *     const tasks = await prisma.tasks.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TasksCreateManyArgs>(
      args?: SelectSubset<T, TasksCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Tasks.
     * @param {TasksDeleteArgs} args - Arguments to delete one Tasks.
     * @example
     * // Delete one Tasks
     * const Tasks = await prisma.tasks.delete({
     *   where: {
     *     // ... filter to delete one Tasks
     *   }
     * })
     * 
    **/
    delete<T extends TasksDeleteArgs>(
      args: SelectSubset<T, TasksDeleteArgs>
    ): CheckSelect<T, Prisma__TasksClient<Tasks>, Prisma__TasksClient<TasksGetPayload<T>>>

    /**
     * Update one Tasks.
     * @param {TasksUpdateArgs} args - Arguments to update one Tasks.
     * @example
     * // Update one Tasks
     * const tasks = await prisma.tasks.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TasksUpdateArgs>(
      args: SelectSubset<T, TasksUpdateArgs>
    ): CheckSelect<T, Prisma__TasksClient<Tasks>, Prisma__TasksClient<TasksGetPayload<T>>>

    /**
     * Delete zero or more Tasks.
     * @param {TasksDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.tasks.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TasksDeleteManyArgs>(
      args?: SelectSubset<T, TasksDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TasksUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const tasks = await prisma.tasks.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TasksUpdateManyArgs>(
      args: SelectSubset<T, TasksUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Tasks.
     * @param {TasksUpsertArgs} args - Arguments to update or create a Tasks.
     * @example
     * // Update or create a Tasks
     * const tasks = await prisma.tasks.upsert({
     *   create: {
     *     // ... data to create a Tasks
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tasks we want to update
     *   }
     * })
    **/
    upsert<T extends TasksUpsertArgs>(
      args: SelectSubset<T, TasksUpsertArgs>
    ): CheckSelect<T, Prisma__TasksClient<Tasks>, Prisma__TasksClient<TasksGetPayload<T>>>

    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TasksCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.tasks.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TasksCountArgs>(
      args?: Subset<T, TasksCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TasksCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TasksAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TasksAggregateArgs>(args: Subset<T, TasksAggregateArgs>): PrismaPromise<GetTasksAggregateType<T>>

    /**
     * Group by Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TasksGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TasksGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TasksGroupByArgs['orderBy'] }
        : { orderBy?: TasksGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TasksGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTasksGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tasks.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TasksClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Servidores<T extends ServidoresArgs = {}>(args?: Subset<T, ServidoresArgs>): CheckSelect<T, Prisma__ServidoresClient<Servidores | null >, Prisma__ServidoresClient<ServidoresGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Tasks findUnique
   */
  export type TasksFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Tasks
     * 
    **/
    select?: TasksSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TasksInclude | null
    /**
     * Throw an Error if a Tasks can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Tasks to fetch.
     * 
    **/
    where: TasksWhereUniqueInput
  }


  /**
   * Tasks findFirst
   */
  export type TasksFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Tasks
     * 
    **/
    select?: TasksSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TasksInclude | null
    /**
     * Throw an Error if a Tasks can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Tasks to fetch.
     * 
    **/
    where?: TasksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     * 
    **/
    orderBy?: Enumerable<TasksOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     * 
    **/
    cursor?: TasksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     * 
    **/
    distinct?: Enumerable<TasksScalarFieldEnum>
  }


  /**
   * Tasks findMany
   */
  export type TasksFindManyArgs = {
    /**
     * Select specific fields to fetch from the Tasks
     * 
    **/
    select?: TasksSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TasksInclude | null
    /**
     * Filter, which Tasks to fetch.
     * 
    **/
    where?: TasksWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     * 
    **/
    orderBy?: Enumerable<TasksOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     * 
    **/
    cursor?: TasksWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TasksScalarFieldEnum>
  }


  /**
   * Tasks create
   */
  export type TasksCreateArgs = {
    /**
     * Select specific fields to fetch from the Tasks
     * 
    **/
    select?: TasksSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TasksInclude | null
    /**
     * The data needed to create a Tasks.
     * 
    **/
    data: XOR<TasksCreateInput, TasksUncheckedCreateInput>
  }


  /**
   * Tasks createMany
   */
  export type TasksCreateManyArgs = {
    /**
     * The data used to create many Tasks.
     * 
    **/
    data: Enumerable<TasksCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Tasks update
   */
  export type TasksUpdateArgs = {
    /**
     * Select specific fields to fetch from the Tasks
     * 
    **/
    select?: TasksSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TasksInclude | null
    /**
     * The data needed to update a Tasks.
     * 
    **/
    data: XOR<TasksUpdateInput, TasksUncheckedUpdateInput>
    /**
     * Choose, which Tasks to update.
     * 
    **/
    where: TasksWhereUniqueInput
  }


  /**
   * Tasks updateMany
   */
  export type TasksUpdateManyArgs = {
    /**
     * The data used to update Tasks.
     * 
    **/
    data: XOR<TasksUpdateManyMutationInput, TasksUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     * 
    **/
    where?: TasksWhereInput
  }


  /**
   * Tasks upsert
   */
  export type TasksUpsertArgs = {
    /**
     * Select specific fields to fetch from the Tasks
     * 
    **/
    select?: TasksSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TasksInclude | null
    /**
     * The filter to search for the Tasks to update in case it exists.
     * 
    **/
    where: TasksWhereUniqueInput
    /**
     * In case the Tasks found by the `where` argument doesn't exist, create a new Tasks with this data.
     * 
    **/
    create: XOR<TasksCreateInput, TasksUncheckedCreateInput>
    /**
     * In case the Tasks was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TasksUpdateInput, TasksUncheckedUpdateInput>
  }


  /**
   * Tasks delete
   */
  export type TasksDeleteArgs = {
    /**
     * Select specific fields to fetch from the Tasks
     * 
    **/
    select?: TasksSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TasksInclude | null
    /**
     * Filter which Tasks to delete.
     * 
    **/
    where: TasksWhereUniqueInput
  }


  /**
   * Tasks deleteMany
   */
  export type TasksDeleteManyArgs = {
    /**
     * Filter which Tasks to delete
     * 
    **/
    where?: TasksWhereInput
  }


  /**
   * Tasks without action
   */
  export type TasksArgs = {
    /**
     * Select specific fields to fetch from the Tasks
     * 
    **/
    select?: TasksSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TasksInclude | null
  }



  /**
   * Model Usuarios
   */


  export type AggregateUsuarios = {
    _count: UsuariosCountAggregateOutputType | null
    _avg: UsuariosAvgAggregateOutputType | null
    _sum: UsuariosSumAggregateOutputType | null
    _min: UsuariosMinAggregateOutputType | null
    _max: UsuariosMaxAggregateOutputType | null
  }

  export type UsuariosAvgAggregateOutputType = {
    idUsuario: number | null
    estatus: number | null
  }

  export type UsuariosSumAggregateOutputType = {
    idUsuario: number | null
    estatus: number | null
  }

  export type UsuariosMinAggregateOutputType = {
    publicId: string | null
    idUsuario: number | null
    estatus: number | null
    nombre: string | null
    apellido: string | null
    email: string | null
    password: string | null
    fechaCreacion: Date | null
    fechaActualizacion: Date | null
  }

  export type UsuariosMaxAggregateOutputType = {
    publicId: string | null
    idUsuario: number | null
    estatus: number | null
    nombre: string | null
    apellido: string | null
    email: string | null
    password: string | null
    fechaCreacion: Date | null
    fechaActualizacion: Date | null
  }

  export type UsuariosCountAggregateOutputType = {
    publicId: number
    idUsuario: number
    estatus: number
    nombre: number
    apellido: number
    email: number
    password: number
    fechaCreacion: number
    fechaActualizacion: number
    _all: number
  }


  export type UsuariosAvgAggregateInputType = {
    idUsuario?: true
    estatus?: true
  }

  export type UsuariosSumAggregateInputType = {
    idUsuario?: true
    estatus?: true
  }

  export type UsuariosMinAggregateInputType = {
    publicId?: true
    idUsuario?: true
    estatus?: true
    nombre?: true
    apellido?: true
    email?: true
    password?: true
    fechaCreacion?: true
    fechaActualizacion?: true
  }

  export type UsuariosMaxAggregateInputType = {
    publicId?: true
    idUsuario?: true
    estatus?: true
    nombre?: true
    apellido?: true
    email?: true
    password?: true
    fechaCreacion?: true
    fechaActualizacion?: true
  }

  export type UsuariosCountAggregateInputType = {
    publicId?: true
    idUsuario?: true
    estatus?: true
    nombre?: true
    apellido?: true
    email?: true
    password?: true
    fechaCreacion?: true
    fechaActualizacion?: true
    _all?: true
  }

  export type UsuariosAggregateArgs = {
    /**
     * Filter which Usuarios to aggregate.
     * 
    **/
    where?: UsuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     * 
    **/
    orderBy?: Enumerable<UsuariosOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UsuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuariosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsuariosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsuariosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuariosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuariosMaxAggregateInputType
  }

  export type GetUsuariosAggregateType<T extends UsuariosAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuarios]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuarios[P]>
      : GetScalarType<T[P], AggregateUsuarios[P]>
  }




  export type UsuariosGroupByArgs = {
    where?: UsuariosWhereInput
    orderBy?: Enumerable<UsuariosOrderByWithAggregationInput>
    by: Array<UsuariosScalarFieldEnum>
    having?: UsuariosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuariosCountAggregateInputType | true
    _avg?: UsuariosAvgAggregateInputType
    _sum?: UsuariosSumAggregateInputType
    _min?: UsuariosMinAggregateInputType
    _max?: UsuariosMaxAggregateInputType
  }


  export type UsuariosGroupByOutputType = {
    publicId: string
    idUsuario: number
    estatus: number
    nombre: string
    apellido: string
    email: string | null
    password: string
    fechaCreacion: Date
    fechaActualizacion: Date | null
    _count: UsuariosCountAggregateOutputType | null
    _avg: UsuariosAvgAggregateOutputType | null
    _sum: UsuariosSumAggregateOutputType | null
    _min: UsuariosMinAggregateOutputType | null
    _max: UsuariosMaxAggregateOutputType | null
  }

  type GetUsuariosGroupByPayload<T extends UsuariosGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UsuariosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuariosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuariosGroupByOutputType[P]>
            : GetScalarType<T[P], UsuariosGroupByOutputType[P]>
        }
      >
    >


  export type UsuariosSelect = {
    publicId?: boolean
    idUsuario?: boolean
    estatus?: boolean
    nombre?: boolean
    apellido?: boolean
    email?: boolean
    password?: boolean
    fechaCreacion?: boolean
    fechaActualizacion?: boolean
    EstatusUsuarios?: boolean | EstatusUsuariosArgs
    Servidores?: boolean | ServidoresFindManyArgs
    _count?: boolean | UsuariosCountOutputTypeArgs
  }

  export type UsuariosInclude = {
    EstatusUsuarios?: boolean | EstatusUsuariosArgs
    Servidores?: boolean | ServidoresFindManyArgs
    _count?: boolean | UsuariosCountOutputTypeArgs
  }

  export type UsuariosGetPayload<
    S extends boolean | null | undefined | UsuariosArgs,
    U = keyof S
      > = S extends true
        ? Usuarios
    : S extends undefined
    ? never
    : S extends UsuariosArgs | UsuariosFindManyArgs
    ?'include' extends U
    ? Usuarios  & {
    [P in TrueKeys<S['include']>]:
        P extends 'EstatusUsuarios' ? EstatusUsuariosGetPayload<S['include'][P]> :
        P extends 'Servidores' ? Array < ServidoresGetPayload<S['include'][P]>>  :
        P extends '_count' ? UsuariosCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'EstatusUsuarios' ? EstatusUsuariosGetPayload<S['select'][P]> :
        P extends 'Servidores' ? Array < ServidoresGetPayload<S['select'][P]>>  :
        P extends '_count' ? UsuariosCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Usuarios ? Usuarios[P] : never
  } 
    : Usuarios
  : Usuarios


  type UsuariosCountArgs = Merge<
    Omit<UsuariosFindManyArgs, 'select' | 'include'> & {
      select?: UsuariosCountAggregateInputType | true
    }
  >

  export interface UsuariosDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Usuarios that matches the filter.
     * @param {UsuariosFindUniqueArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UsuariosFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UsuariosFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Usuarios'> extends True ? CheckSelect<T, Prisma__UsuariosClient<Usuarios>, Prisma__UsuariosClient<UsuariosGetPayload<T>>> : CheckSelect<T, Prisma__UsuariosClient<Usuarios | null >, Prisma__UsuariosClient<UsuariosGetPayload<T> | null >>

    /**
     * Find the first Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuariosFindFirstArgs} args - Arguments to find a Usuarios
     * @example
     * // Get one Usuarios
     * const usuarios = await prisma.usuarios.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UsuariosFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UsuariosFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Usuarios'> extends True ? CheckSelect<T, Prisma__UsuariosClient<Usuarios>, Prisma__UsuariosClient<UsuariosGetPayload<T>>> : CheckSelect<T, Prisma__UsuariosClient<Usuarios | null >, Prisma__UsuariosClient<UsuariosGetPayload<T> | null >>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuariosFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuarios.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuarios.findMany({ take: 10 })
     * 
     * // Only select the `publicId`
     * const usuariosWithPublicIdOnly = await prisma.usuarios.findMany({ select: { publicId: true } })
     * 
    **/
    findMany<T extends UsuariosFindManyArgs>(
      args?: SelectSubset<T, UsuariosFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Usuarios>>, PrismaPromise<Array<UsuariosGetPayload<T>>>>

    /**
     * Create a Usuarios.
     * @param {UsuariosCreateArgs} args - Arguments to create a Usuarios.
     * @example
     * // Create one Usuarios
     * const Usuarios = await prisma.usuarios.create({
     *   data: {
     *     // ... data to create a Usuarios
     *   }
     * })
     * 
    **/
    create<T extends UsuariosCreateArgs>(
      args: SelectSubset<T, UsuariosCreateArgs>
    ): CheckSelect<T, Prisma__UsuariosClient<Usuarios>, Prisma__UsuariosClient<UsuariosGetPayload<T>>>

    /**
     * Create many Usuarios.
     *     @param {UsuariosCreateManyArgs} args - Arguments to create many Usuarios.
     *     @example
     *     // Create many Usuarios
     *     const usuarios = await prisma.usuarios.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UsuariosCreateManyArgs>(
      args?: SelectSubset<T, UsuariosCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Usuarios.
     * @param {UsuariosDeleteArgs} args - Arguments to delete one Usuarios.
     * @example
     * // Delete one Usuarios
     * const Usuarios = await prisma.usuarios.delete({
     *   where: {
     *     // ... filter to delete one Usuarios
     *   }
     * })
     * 
    **/
    delete<T extends UsuariosDeleteArgs>(
      args: SelectSubset<T, UsuariosDeleteArgs>
    ): CheckSelect<T, Prisma__UsuariosClient<Usuarios>, Prisma__UsuariosClient<UsuariosGetPayload<T>>>

    /**
     * Update one Usuarios.
     * @param {UsuariosUpdateArgs} args - Arguments to update one Usuarios.
     * @example
     * // Update one Usuarios
     * const usuarios = await prisma.usuarios.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UsuariosUpdateArgs>(
      args: SelectSubset<T, UsuariosUpdateArgs>
    ): CheckSelect<T, Prisma__UsuariosClient<Usuarios>, Prisma__UsuariosClient<UsuariosGetPayload<T>>>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuariosDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuarios.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UsuariosDeleteManyArgs>(
      args?: SelectSubset<T, UsuariosDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuariosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuarios = await prisma.usuarios.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UsuariosUpdateManyArgs>(
      args: SelectSubset<T, UsuariosUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Usuarios.
     * @param {UsuariosUpsertArgs} args - Arguments to update or create a Usuarios.
     * @example
     * // Update or create a Usuarios
     * const usuarios = await prisma.usuarios.upsert({
     *   create: {
     *     // ... data to create a Usuarios
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuarios we want to update
     *   }
     * })
    **/
    upsert<T extends UsuariosUpsertArgs>(
      args: SelectSubset<T, UsuariosUpsertArgs>
    ): CheckSelect<T, Prisma__UsuariosClient<Usuarios>, Prisma__UsuariosClient<UsuariosGetPayload<T>>>

    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuariosCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuarios.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuariosCountArgs>(
      args?: Subset<T, UsuariosCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuariosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuariosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuariosAggregateArgs>(args: Subset<T, UsuariosAggregateArgs>): PrismaPromise<GetUsuariosAggregateType<T>>

    /**
     * Group by Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuariosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuariosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuariosGroupByArgs['orderBy'] }
        : { orderBy?: UsuariosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuariosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuariosGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuarios.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UsuariosClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    EstatusUsuarios<T extends EstatusUsuariosArgs = {}>(args?: Subset<T, EstatusUsuariosArgs>): CheckSelect<T, Prisma__EstatusUsuariosClient<EstatusUsuarios | null >, Prisma__EstatusUsuariosClient<EstatusUsuariosGetPayload<T> | null >>;

    Servidores<T extends ServidoresFindManyArgs = {}>(args?: Subset<T, ServidoresFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Servidores>>, PrismaPromise<Array<ServidoresGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Usuarios findUnique
   */
  export type UsuariosFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Usuarios
     * 
    **/
    select?: UsuariosSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsuariosInclude | null
    /**
     * Throw an Error if a Usuarios can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Usuarios to fetch.
     * 
    **/
    where: UsuariosWhereUniqueInput
  }


  /**
   * Usuarios findFirst
   */
  export type UsuariosFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Usuarios
     * 
    **/
    select?: UsuariosSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsuariosInclude | null
    /**
     * Throw an Error if a Usuarios can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Usuarios to fetch.
     * 
    **/
    where?: UsuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     * 
    **/
    orderBy?: Enumerable<UsuariosOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     * 
    **/
    cursor?: UsuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     * 
    **/
    distinct?: Enumerable<UsuariosScalarFieldEnum>
  }


  /**
   * Usuarios findMany
   */
  export type UsuariosFindManyArgs = {
    /**
     * Select specific fields to fetch from the Usuarios
     * 
    **/
    select?: UsuariosSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsuariosInclude | null
    /**
     * Filter, which Usuarios to fetch.
     * 
    **/
    where?: UsuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     * 
    **/
    orderBy?: Enumerable<UsuariosOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     * 
    **/
    cursor?: UsuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UsuariosScalarFieldEnum>
  }


  /**
   * Usuarios create
   */
  export type UsuariosCreateArgs = {
    /**
     * Select specific fields to fetch from the Usuarios
     * 
    **/
    select?: UsuariosSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsuariosInclude | null
    /**
     * The data needed to create a Usuarios.
     * 
    **/
    data: XOR<UsuariosCreateInput, UsuariosUncheckedCreateInput>
  }


  /**
   * Usuarios createMany
   */
  export type UsuariosCreateManyArgs = {
    /**
     * The data used to create many Usuarios.
     * 
    **/
    data: Enumerable<UsuariosCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Usuarios update
   */
  export type UsuariosUpdateArgs = {
    /**
     * Select specific fields to fetch from the Usuarios
     * 
    **/
    select?: UsuariosSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsuariosInclude | null
    /**
     * The data needed to update a Usuarios.
     * 
    **/
    data: XOR<UsuariosUpdateInput, UsuariosUncheckedUpdateInput>
    /**
     * Choose, which Usuarios to update.
     * 
    **/
    where: UsuariosWhereUniqueInput
  }


  /**
   * Usuarios updateMany
   */
  export type UsuariosUpdateManyArgs = {
    /**
     * The data used to update Usuarios.
     * 
    **/
    data: XOR<UsuariosUpdateManyMutationInput, UsuariosUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     * 
    **/
    where?: UsuariosWhereInput
  }


  /**
   * Usuarios upsert
   */
  export type UsuariosUpsertArgs = {
    /**
     * Select specific fields to fetch from the Usuarios
     * 
    **/
    select?: UsuariosSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsuariosInclude | null
    /**
     * The filter to search for the Usuarios to update in case it exists.
     * 
    **/
    where: UsuariosWhereUniqueInput
    /**
     * In case the Usuarios found by the `where` argument doesn't exist, create a new Usuarios with this data.
     * 
    **/
    create: XOR<UsuariosCreateInput, UsuariosUncheckedCreateInput>
    /**
     * In case the Usuarios was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UsuariosUpdateInput, UsuariosUncheckedUpdateInput>
  }


  /**
   * Usuarios delete
   */
  export type UsuariosDeleteArgs = {
    /**
     * Select specific fields to fetch from the Usuarios
     * 
    **/
    select?: UsuariosSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsuariosInclude | null
    /**
     * Filter which Usuarios to delete.
     * 
    **/
    where: UsuariosWhereUniqueInput
  }


  /**
   * Usuarios deleteMany
   */
  export type UsuariosDeleteManyArgs = {
    /**
     * Filter which Usuarios to delete
     * 
    **/
    where?: UsuariosWhereInput
  }


  /**
   * Usuarios without action
   */
  export type UsuariosArgs = {
    /**
     * Select specific fields to fetch from the Usuarios
     * 
    **/
    select?: UsuariosSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UsuariosInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const EstatusServidoresScalarFieldEnum: {
    idEstatus: 'idEstatus',
    tipo: 'tipo',
    descripcion: 'descripcion',
    titulo: 'titulo'
  };

  export type EstatusServidoresScalarFieldEnum = (typeof EstatusServidoresScalarFieldEnum)[keyof typeof EstatusServidoresScalarFieldEnum]


  export const EstatusUsuariosScalarFieldEnum: {
    idEstatus: 'idEstatus',
    tipo: 'tipo',
    descripcion: 'descripcion',
    titulo: 'titulo'
  };

  export type EstatusUsuariosScalarFieldEnum = (typeof EstatusUsuariosScalarFieldEnum)[keyof typeof EstatusUsuariosScalarFieldEnum]


  export const PingServidoresScalarFieldEnum: {
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
  };

  export type PingServidoresScalarFieldEnum = (typeof PingServidoresScalarFieldEnum)[keyof typeof PingServidoresScalarFieldEnum]


  export const ServidoresScalarFieldEnum: {
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
  };

  export type ServidoresScalarFieldEnum = (typeof ServidoresScalarFieldEnum)[keyof typeof ServidoresScalarFieldEnum]


  export const TasksScalarFieldEnum: {
    id: 'id',
    idTask: 'idTask',
    idServidor: 'idServidor',
    estatus: 'estatus',
    fechaCreacion: 'fechaCreacion',
    interval: 'interval',
    error: 'error',
    type: 'type',
    ultimaEjecucion: 'ultimaEjecucion'
  };

  export type TasksScalarFieldEnum = (typeof TasksScalarFieldEnum)[keyof typeof TasksScalarFieldEnum]


  export const UsuariosScalarFieldEnum: {
    publicId: 'publicId',
    idUsuario: 'idUsuario',
    estatus: 'estatus',
    nombre: 'nombre',
    apellido: 'apellido',
    email: 'email',
    password: 'password',
    fechaCreacion: 'fechaCreacion',
    fechaActualizacion: 'fechaActualizacion'
  };

  export type UsuariosScalarFieldEnum = (typeof UsuariosScalarFieldEnum)[keyof typeof UsuariosScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const EstatusServidoresOrderByRelevanceFieldEnum: {
    descripcion: 'descripcion',
    titulo: 'titulo'
  };

  export type EstatusServidoresOrderByRelevanceFieldEnum = (typeof EstatusServidoresOrderByRelevanceFieldEnum)[keyof typeof EstatusServidoresOrderByRelevanceFieldEnum]


  export const EstatusUsuariosOrderByRelevanceFieldEnum: {
    descripcion: 'descripcion',
    titulo: 'titulo'
  };

  export type EstatusUsuariosOrderByRelevanceFieldEnum = (typeof EstatusUsuariosOrderByRelevanceFieldEnum)[keyof typeof EstatusUsuariosOrderByRelevanceFieldEnum]


  export const PingServidoresOrderByRelevanceFieldEnum: {
    log: 'log',
    numericHost: 'numericHost'
  };

  export type PingServidoresOrderByRelevanceFieldEnum = (typeof PingServidoresOrderByRelevanceFieldEnum)[keyof typeof PingServidoresOrderByRelevanceFieldEnum]


  export const ServidoresOrderByRelevanceFieldEnum: {
    publicId: 'publicId',
    dominio: 'dominio',
    ip: 'ip',
    descripcion: 'descripcion',
    nombre: 'nombre'
  };

  export type ServidoresOrderByRelevanceFieldEnum = (typeof ServidoresOrderByRelevanceFieldEnum)[keyof typeof ServidoresOrderByRelevanceFieldEnum]


  export const TasksOrderByRelevanceFieldEnum: {
    idTask: 'idTask',
    error: 'error'
  };

  export type TasksOrderByRelevanceFieldEnum = (typeof TasksOrderByRelevanceFieldEnum)[keyof typeof TasksOrderByRelevanceFieldEnum]


  export const UsuariosOrderByRelevanceFieldEnum: {
    publicId: 'publicId',
    nombre: 'nombre',
    apellido: 'apellido',
    email: 'email',
    password: 'password'
  };

  export type UsuariosOrderByRelevanceFieldEnum = (typeof UsuariosOrderByRelevanceFieldEnum)[keyof typeof UsuariosOrderByRelevanceFieldEnum]


  /**
   * Deep Input Types
   */


  export type EstatusServidoresWhereInput = {
    AND?: Enumerable<EstatusServidoresWhereInput>
    OR?: Enumerable<EstatusServidoresWhereInput>
    NOT?: Enumerable<EstatusServidoresWhereInput>
    idEstatus?: IntFilter | number
    tipo?: IntFilter | number
    descripcion?: StringNullableFilter | string | null
    titulo?: StringFilter | string
    Servidores?: ServidoresListRelationFilter
  }

  export type EstatusServidoresOrderByWithRelationAndSearchRelevanceInput = {
    idEstatus?: SortOrder
    tipo?: SortOrder
    descripcion?: SortOrder
    titulo?: SortOrder
    Servidores?: ServidoresOrderByRelationAggregateInput
    _relevance?: EstatusServidoresOrderByRelevanceInput
  }

  export type EstatusServidoresWhereUniqueInput = {
    idEstatus?: number
    tipo?: number
    titulo?: string
  }

  export type EstatusServidoresOrderByWithAggregationInput = {
    idEstatus?: SortOrder
    tipo?: SortOrder
    descripcion?: SortOrder
    titulo?: SortOrder
    _count?: EstatusServidoresCountOrderByAggregateInput
    _avg?: EstatusServidoresAvgOrderByAggregateInput
    _max?: EstatusServidoresMaxOrderByAggregateInput
    _min?: EstatusServidoresMinOrderByAggregateInput
    _sum?: EstatusServidoresSumOrderByAggregateInput
  }

  export type EstatusServidoresScalarWhereWithAggregatesInput = {
    AND?: Enumerable<EstatusServidoresScalarWhereWithAggregatesInput>
    OR?: Enumerable<EstatusServidoresScalarWhereWithAggregatesInput>
    NOT?: Enumerable<EstatusServidoresScalarWhereWithAggregatesInput>
    idEstatus?: IntWithAggregatesFilter | number
    tipo?: IntWithAggregatesFilter | number
    descripcion?: StringNullableWithAggregatesFilter | string | null
    titulo?: StringWithAggregatesFilter | string
  }

  export type EstatusUsuariosWhereInput = {
    AND?: Enumerable<EstatusUsuariosWhereInput>
    OR?: Enumerable<EstatusUsuariosWhereInput>
    NOT?: Enumerable<EstatusUsuariosWhereInput>
    idEstatus?: IntFilter | number
    tipo?: IntFilter | number
    descripcion?: StringNullableFilter | string | null
    titulo?: StringFilter | string
    Usuarios?: UsuariosListRelationFilter
  }

  export type EstatusUsuariosOrderByWithRelationAndSearchRelevanceInput = {
    idEstatus?: SortOrder
    tipo?: SortOrder
    descripcion?: SortOrder
    titulo?: SortOrder
    Usuarios?: UsuariosOrderByRelationAggregateInput
    _relevance?: EstatusUsuariosOrderByRelevanceInput
  }

  export type EstatusUsuariosWhereUniqueInput = {
    idEstatus?: number
    tipo?: number
    titulo?: string
  }

  export type EstatusUsuariosOrderByWithAggregationInput = {
    idEstatus?: SortOrder
    tipo?: SortOrder
    descripcion?: SortOrder
    titulo?: SortOrder
    _count?: EstatusUsuariosCountOrderByAggregateInput
    _avg?: EstatusUsuariosAvgOrderByAggregateInput
    _max?: EstatusUsuariosMaxOrderByAggregateInput
    _min?: EstatusUsuariosMinOrderByAggregateInput
    _sum?: EstatusUsuariosSumOrderByAggregateInput
  }

  export type EstatusUsuariosScalarWhereWithAggregatesInput = {
    AND?: Enumerable<EstatusUsuariosScalarWhereWithAggregatesInput>
    OR?: Enumerable<EstatusUsuariosScalarWhereWithAggregatesInput>
    NOT?: Enumerable<EstatusUsuariosScalarWhereWithAggregatesInput>
    idEstatus?: IntWithAggregatesFilter | number
    tipo?: IntWithAggregatesFilter | number
    descripcion?: StringNullableWithAggregatesFilter | string | null
    titulo?: StringWithAggregatesFilter | string
  }

  export type PingServidoresWhereInput = {
    AND?: Enumerable<PingServidoresWhereInput>
    OR?: Enumerable<PingServidoresWhereInput>
    NOT?: Enumerable<PingServidoresWhereInput>
    idPingServidor?: IntFilter | number
    idServidor?: IntFilter | number
    times?: FloatNullableFilter | number | null
    packetLoss?: FloatNullableFilter | number | null
    min?: FloatNullableFilter | number | null
    max?: FloatNullableFilter | number | null
    avg?: FloatNullableFilter | number | null
    log?: StringNullableFilter | string | null
    isAlive?: BoolNullableFilter | boolean | null
    numericHost?: StringNullableFilter | string | null
    fechaPing?: DateTimeFilter | Date | string
    Servidores?: XOR<ServidoresRelationFilter, ServidoresWhereInput>
  }

  export type PingServidoresOrderByWithRelationAndSearchRelevanceInput = {
    idPingServidor?: SortOrder
    idServidor?: SortOrder
    times?: SortOrder
    packetLoss?: SortOrder
    min?: SortOrder
    max?: SortOrder
    avg?: SortOrder
    log?: SortOrder
    isAlive?: SortOrder
    numericHost?: SortOrder
    fechaPing?: SortOrder
    Servidores?: ServidoresOrderByWithRelationAndSearchRelevanceInput
    _relevance?: PingServidoresOrderByRelevanceInput
  }

  export type PingServidoresWhereUniqueInput = {
    idPingServidor?: number
  }

  export type PingServidoresOrderByWithAggregationInput = {
    idPingServidor?: SortOrder
    idServidor?: SortOrder
    times?: SortOrder
    packetLoss?: SortOrder
    min?: SortOrder
    max?: SortOrder
    avg?: SortOrder
    log?: SortOrder
    isAlive?: SortOrder
    numericHost?: SortOrder
    fechaPing?: SortOrder
    _count?: PingServidoresCountOrderByAggregateInput
    _avg?: PingServidoresAvgOrderByAggregateInput
    _max?: PingServidoresMaxOrderByAggregateInput
    _min?: PingServidoresMinOrderByAggregateInput
    _sum?: PingServidoresSumOrderByAggregateInput
  }

  export type PingServidoresScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PingServidoresScalarWhereWithAggregatesInput>
    OR?: Enumerable<PingServidoresScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PingServidoresScalarWhereWithAggregatesInput>
    idPingServidor?: IntWithAggregatesFilter | number
    idServidor?: IntWithAggregatesFilter | number
    times?: FloatNullableWithAggregatesFilter | number | null
    packetLoss?: FloatNullableWithAggregatesFilter | number | null
    min?: FloatNullableWithAggregatesFilter | number | null
    max?: FloatNullableWithAggregatesFilter | number | null
    avg?: FloatNullableWithAggregatesFilter | number | null
    log?: StringNullableWithAggregatesFilter | string | null
    isAlive?: BoolNullableWithAggregatesFilter | boolean | null
    numericHost?: StringNullableWithAggregatesFilter | string | null
    fechaPing?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ServidoresWhereInput = {
    AND?: Enumerable<ServidoresWhereInput>
    OR?: Enumerable<ServidoresWhereInput>
    NOT?: Enumerable<ServidoresWhereInput>
    publicId?: StringNullableFilter | string | null
    idServidor?: IntFilter | number
    estatus?: IntFilter | number
    dominio?: StringFilter | string
    ip?: StringNullableFilter | string | null
    fechaCreacion?: DateTimeFilter | Date | string
    fechaActualizacion?: DateTimeNullableFilter | Date | string | null
    descripcion?: StringNullableFilter | string | null
    idUsuario?: IntNullableFilter | number | null
    nombre?: StringFilter | string
    EstatusServidores?: XOR<EstatusServidoresRelationFilter, EstatusServidoresWhereInput>
    Usuarios?: XOR<UsuariosRelationFilter, UsuariosWhereInput> | null
    PingServidores?: PingServidoresListRelationFilter
    Tasks?: TasksListRelationFilter
  }

  export type ServidoresOrderByWithRelationAndSearchRelevanceInput = {
    publicId?: SortOrder
    idServidor?: SortOrder
    estatus?: SortOrder
    dominio?: SortOrder
    ip?: SortOrder
    fechaCreacion?: SortOrder
    fechaActualizacion?: SortOrder
    descripcion?: SortOrder
    idUsuario?: SortOrder
    nombre?: SortOrder
    EstatusServidores?: EstatusServidoresOrderByWithRelationAndSearchRelevanceInput
    Usuarios?: UsuariosOrderByWithRelationAndSearchRelevanceInput
    PingServidores?: PingServidoresOrderByRelationAggregateInput
    Tasks?: TasksOrderByRelationAggregateInput
    _relevance?: ServidoresOrderByRelevanceInput
  }

  export type ServidoresWhereUniqueInput = {
    idServidor?: number
  }

  export type ServidoresOrderByWithAggregationInput = {
    publicId?: SortOrder
    idServidor?: SortOrder
    estatus?: SortOrder
    dominio?: SortOrder
    ip?: SortOrder
    fechaCreacion?: SortOrder
    fechaActualizacion?: SortOrder
    descripcion?: SortOrder
    idUsuario?: SortOrder
    nombre?: SortOrder
    _count?: ServidoresCountOrderByAggregateInput
    _avg?: ServidoresAvgOrderByAggregateInput
    _max?: ServidoresMaxOrderByAggregateInput
    _min?: ServidoresMinOrderByAggregateInput
    _sum?: ServidoresSumOrderByAggregateInput
  }

  export type ServidoresScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ServidoresScalarWhereWithAggregatesInput>
    OR?: Enumerable<ServidoresScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ServidoresScalarWhereWithAggregatesInput>
    publicId?: StringNullableWithAggregatesFilter | string | null
    idServidor?: IntWithAggregatesFilter | number
    estatus?: IntWithAggregatesFilter | number
    dominio?: StringWithAggregatesFilter | string
    ip?: StringNullableWithAggregatesFilter | string | null
    fechaCreacion?: DateTimeWithAggregatesFilter | Date | string
    fechaActualizacion?: DateTimeNullableWithAggregatesFilter | Date | string | null
    descripcion?: StringNullableWithAggregatesFilter | string | null
    idUsuario?: IntNullableWithAggregatesFilter | number | null
    nombre?: StringWithAggregatesFilter | string
  }

  export type TasksWhereInput = {
    AND?: Enumerable<TasksWhereInput>
    OR?: Enumerable<TasksWhereInput>
    NOT?: Enumerable<TasksWhereInput>
    id?: IntFilter | number
    idTask?: StringFilter | string
    idServidor?: IntNullableFilter | number | null
    estatus?: EnumTasksEstatusNullableFilter | TasksEstatus | null
    fechaCreacion?: DateTimeFilter | Date | string
    interval?: IntNullableFilter | number | null
    error?: StringNullableFilter | string | null
    type?: EnumTasksTypesFilter | TasksTypes
    ultimaEjecucion?: DateTimeNullableFilter | Date | string | null
    Servidores?: XOR<ServidoresRelationFilter, ServidoresWhereInput> | null
  }

  export type TasksOrderByWithRelationAndSearchRelevanceInput = {
    id?: SortOrder
    idTask?: SortOrder
    idServidor?: SortOrder
    estatus?: SortOrder
    fechaCreacion?: SortOrder
    interval?: SortOrder
    error?: SortOrder
    type?: SortOrder
    ultimaEjecucion?: SortOrder
    Servidores?: ServidoresOrderByWithRelationAndSearchRelevanceInput
    _relevance?: TasksOrderByRelevanceInput
  }

  export type TasksWhereUniqueInput = {
    id?: number
    idTask?: string
  }

  export type TasksOrderByWithAggregationInput = {
    id?: SortOrder
    idTask?: SortOrder
    idServidor?: SortOrder
    estatus?: SortOrder
    fechaCreacion?: SortOrder
    interval?: SortOrder
    error?: SortOrder
    type?: SortOrder
    ultimaEjecucion?: SortOrder
    _count?: TasksCountOrderByAggregateInput
    _avg?: TasksAvgOrderByAggregateInput
    _max?: TasksMaxOrderByAggregateInput
    _min?: TasksMinOrderByAggregateInput
    _sum?: TasksSumOrderByAggregateInput
  }

  export type TasksScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TasksScalarWhereWithAggregatesInput>
    OR?: Enumerable<TasksScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TasksScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    idTask?: StringWithAggregatesFilter | string
    idServidor?: IntNullableWithAggregatesFilter | number | null
    estatus?: EnumTasksEstatusNullableWithAggregatesFilter | TasksEstatus | null
    fechaCreacion?: DateTimeWithAggregatesFilter | Date | string
    interval?: IntNullableWithAggregatesFilter | number | null
    error?: StringNullableWithAggregatesFilter | string | null
    type?: EnumTasksTypesWithAggregatesFilter | TasksTypes
    ultimaEjecucion?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type UsuariosWhereInput = {
    AND?: Enumerable<UsuariosWhereInput>
    OR?: Enumerable<UsuariosWhereInput>
    NOT?: Enumerable<UsuariosWhereInput>
    publicId?: StringFilter | string
    idUsuario?: IntFilter | number
    estatus?: IntFilter | number
    nombre?: StringFilter | string
    apellido?: StringFilter | string
    email?: StringNullableFilter | string | null
    password?: StringFilter | string
    fechaCreacion?: DateTimeFilter | Date | string
    fechaActualizacion?: DateTimeNullableFilter | Date | string | null
    EstatusUsuarios?: XOR<EstatusUsuariosRelationFilter, EstatusUsuariosWhereInput>
    Servidores?: ServidoresListRelationFilter
  }

  export type UsuariosOrderByWithRelationAndSearchRelevanceInput = {
    publicId?: SortOrder
    idUsuario?: SortOrder
    estatus?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fechaCreacion?: SortOrder
    fechaActualizacion?: SortOrder
    EstatusUsuarios?: EstatusUsuariosOrderByWithRelationAndSearchRelevanceInput
    Servidores?: ServidoresOrderByRelationAggregateInput
    _relevance?: UsuariosOrderByRelevanceInput
  }

  export type UsuariosWhereUniqueInput = {
    publicId?: string
    idUsuario?: number
    email?: string
  }

  export type UsuariosOrderByWithAggregationInput = {
    publicId?: SortOrder
    idUsuario?: SortOrder
    estatus?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fechaCreacion?: SortOrder
    fechaActualizacion?: SortOrder
    _count?: UsuariosCountOrderByAggregateInput
    _avg?: UsuariosAvgOrderByAggregateInput
    _max?: UsuariosMaxOrderByAggregateInput
    _min?: UsuariosMinOrderByAggregateInput
    _sum?: UsuariosSumOrderByAggregateInput
  }

  export type UsuariosScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UsuariosScalarWhereWithAggregatesInput>
    OR?: Enumerable<UsuariosScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UsuariosScalarWhereWithAggregatesInput>
    publicId?: StringWithAggregatesFilter | string
    idUsuario?: IntWithAggregatesFilter | number
    estatus?: IntWithAggregatesFilter | number
    nombre?: StringWithAggregatesFilter | string
    apellido?: StringWithAggregatesFilter | string
    email?: StringNullableWithAggregatesFilter | string | null
    password?: StringWithAggregatesFilter | string
    fechaCreacion?: DateTimeWithAggregatesFilter | Date | string
    fechaActualizacion?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type EstatusServidoresCreateInput = {
    tipo: number
    descripcion?: string | null
    titulo: string
    Servidores?: ServidoresCreateNestedManyWithoutEstatusServidoresInput
  }

  export type EstatusServidoresUncheckedCreateInput = {
    idEstatus?: number
    tipo: number
    descripcion?: string | null
    titulo: string
    Servidores?: ServidoresUncheckedCreateNestedManyWithoutEstatusServidoresInput
  }

  export type EstatusServidoresUpdateInput = {
    tipo?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    titulo?: StringFieldUpdateOperationsInput | string
    Servidores?: ServidoresUpdateManyWithoutEstatusServidoresInput
  }

  export type EstatusServidoresUncheckedUpdateInput = {
    idEstatus?: IntFieldUpdateOperationsInput | number
    tipo?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    titulo?: StringFieldUpdateOperationsInput | string
    Servidores?: ServidoresUncheckedUpdateManyWithoutEstatusServidoresInput
  }

  export type EstatusServidoresCreateManyInput = {
    idEstatus?: number
    tipo: number
    descripcion?: string | null
    titulo: string
  }

  export type EstatusServidoresUpdateManyMutationInput = {
    tipo?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    titulo?: StringFieldUpdateOperationsInput | string
  }

  export type EstatusServidoresUncheckedUpdateManyInput = {
    idEstatus?: IntFieldUpdateOperationsInput | number
    tipo?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    titulo?: StringFieldUpdateOperationsInput | string
  }

  export type EstatusUsuariosCreateInput = {
    tipo: number
    descripcion?: string | null
    titulo: string
    Usuarios?: UsuariosCreateNestedManyWithoutEstatusUsuariosInput
  }

  export type EstatusUsuariosUncheckedCreateInput = {
    idEstatus?: number
    tipo: number
    descripcion?: string | null
    titulo: string
    Usuarios?: UsuariosUncheckedCreateNestedManyWithoutEstatusUsuariosInput
  }

  export type EstatusUsuariosUpdateInput = {
    tipo?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    titulo?: StringFieldUpdateOperationsInput | string
    Usuarios?: UsuariosUpdateManyWithoutEstatusUsuariosInput
  }

  export type EstatusUsuariosUncheckedUpdateInput = {
    idEstatus?: IntFieldUpdateOperationsInput | number
    tipo?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    titulo?: StringFieldUpdateOperationsInput | string
    Usuarios?: UsuariosUncheckedUpdateManyWithoutEstatusUsuariosInput
  }

  export type EstatusUsuariosCreateManyInput = {
    idEstatus?: number
    tipo: number
    descripcion?: string | null
    titulo: string
  }

  export type EstatusUsuariosUpdateManyMutationInput = {
    tipo?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    titulo?: StringFieldUpdateOperationsInput | string
  }

  export type EstatusUsuariosUncheckedUpdateManyInput = {
    idEstatus?: IntFieldUpdateOperationsInput | number
    tipo?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    titulo?: StringFieldUpdateOperationsInput | string
  }

  export type PingServidoresCreateInput = {
    times?: number | null
    packetLoss?: number | null
    min?: number | null
    max?: number | null
    avg?: number | null
    log?: string | null
    isAlive?: boolean | null
    numericHost?: string | null
    fechaPing?: Date | string
    Servidores: ServidoresCreateNestedOneWithoutPingServidoresInput
  }

  export type PingServidoresUncheckedCreateInput = {
    idPingServidor?: number
    idServidor: number
    times?: number | null
    packetLoss?: number | null
    min?: number | null
    max?: number | null
    avg?: number | null
    log?: string | null
    isAlive?: boolean | null
    numericHost?: string | null
    fechaPing?: Date | string
  }

  export type PingServidoresUpdateInput = {
    times?: NullableFloatFieldUpdateOperationsInput | number | null
    packetLoss?: NullableFloatFieldUpdateOperationsInput | number | null
    min?: NullableFloatFieldUpdateOperationsInput | number | null
    max?: NullableFloatFieldUpdateOperationsInput | number | null
    avg?: NullableFloatFieldUpdateOperationsInput | number | null
    log?: NullableStringFieldUpdateOperationsInput | string | null
    isAlive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    numericHost?: NullableStringFieldUpdateOperationsInput | string | null
    fechaPing?: DateTimeFieldUpdateOperationsInput | Date | string
    Servidores?: ServidoresUpdateOneRequiredWithoutPingServidoresInput
  }

  export type PingServidoresUncheckedUpdateInput = {
    idPingServidor?: IntFieldUpdateOperationsInput | number
    idServidor?: IntFieldUpdateOperationsInput | number
    times?: NullableFloatFieldUpdateOperationsInput | number | null
    packetLoss?: NullableFloatFieldUpdateOperationsInput | number | null
    min?: NullableFloatFieldUpdateOperationsInput | number | null
    max?: NullableFloatFieldUpdateOperationsInput | number | null
    avg?: NullableFloatFieldUpdateOperationsInput | number | null
    log?: NullableStringFieldUpdateOperationsInput | string | null
    isAlive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    numericHost?: NullableStringFieldUpdateOperationsInput | string | null
    fechaPing?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PingServidoresCreateManyInput = {
    idPingServidor?: number
    idServidor: number
    times?: number | null
    packetLoss?: number | null
    min?: number | null
    max?: number | null
    avg?: number | null
    log?: string | null
    isAlive?: boolean | null
    numericHost?: string | null
    fechaPing?: Date | string
  }

  export type PingServidoresUpdateManyMutationInput = {
    times?: NullableFloatFieldUpdateOperationsInput | number | null
    packetLoss?: NullableFloatFieldUpdateOperationsInput | number | null
    min?: NullableFloatFieldUpdateOperationsInput | number | null
    max?: NullableFloatFieldUpdateOperationsInput | number | null
    avg?: NullableFloatFieldUpdateOperationsInput | number | null
    log?: NullableStringFieldUpdateOperationsInput | string | null
    isAlive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    numericHost?: NullableStringFieldUpdateOperationsInput | string | null
    fechaPing?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PingServidoresUncheckedUpdateManyInput = {
    idPingServidor?: IntFieldUpdateOperationsInput | number
    idServidor?: IntFieldUpdateOperationsInput | number
    times?: NullableFloatFieldUpdateOperationsInput | number | null
    packetLoss?: NullableFloatFieldUpdateOperationsInput | number | null
    min?: NullableFloatFieldUpdateOperationsInput | number | null
    max?: NullableFloatFieldUpdateOperationsInput | number | null
    avg?: NullableFloatFieldUpdateOperationsInput | number | null
    log?: NullableStringFieldUpdateOperationsInput | string | null
    isAlive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    numericHost?: NullableStringFieldUpdateOperationsInput | string | null
    fechaPing?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServidoresCreateInput = {
    publicId?: string | null
    dominio: string
    ip?: string | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string | null
    descripcion?: string | null
    nombre: string
    EstatusServidores: EstatusServidoresCreateNestedOneWithoutServidoresInput
    Usuarios?: UsuariosCreateNestedOneWithoutServidoresInput
    PingServidores?: PingServidoresCreateNestedManyWithoutServidoresInput
    Tasks?: TasksCreateNestedManyWithoutServidoresInput
  }

  export type ServidoresUncheckedCreateInput = {
    publicId?: string | null
    idServidor?: number
    estatus: number
    dominio: string
    ip?: string | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string | null
    descripcion?: string | null
    idUsuario?: number | null
    nombre: string
    PingServidores?: PingServidoresUncheckedCreateNestedManyWithoutServidoresInput
    Tasks?: TasksUncheckedCreateNestedManyWithoutServidoresInput
  }

  export type ServidoresUpdateInput = {
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    dominio?: StringFieldUpdateOperationsInput | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    nombre?: StringFieldUpdateOperationsInput | string
    EstatusServidores?: EstatusServidoresUpdateOneRequiredWithoutServidoresInput
    Usuarios?: UsuariosUpdateOneWithoutServidoresInput
    PingServidores?: PingServidoresUpdateManyWithoutServidoresInput
    Tasks?: TasksUpdateManyWithoutServidoresInput
  }

  export type ServidoresUncheckedUpdateInput = {
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    idServidor?: IntFieldUpdateOperationsInput | number
    estatus?: IntFieldUpdateOperationsInput | number
    dominio?: StringFieldUpdateOperationsInput | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    idUsuario?: NullableIntFieldUpdateOperationsInput | number | null
    nombre?: StringFieldUpdateOperationsInput | string
    PingServidores?: PingServidoresUncheckedUpdateManyWithoutServidoresInput
    Tasks?: TasksUncheckedUpdateManyWithoutServidoresInput
  }

  export type ServidoresCreateManyInput = {
    publicId?: string | null
    idServidor?: number
    estatus: number
    dominio: string
    ip?: string | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string | null
    descripcion?: string | null
    idUsuario?: number | null
    nombre: string
  }

  export type ServidoresUpdateManyMutationInput = {
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    dominio?: StringFieldUpdateOperationsInput | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type ServidoresUncheckedUpdateManyInput = {
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    idServidor?: IntFieldUpdateOperationsInput | number
    estatus?: IntFieldUpdateOperationsInput | number
    dominio?: StringFieldUpdateOperationsInput | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    idUsuario?: NullableIntFieldUpdateOperationsInput | number | null
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type TasksCreateInput = {
    idTask: string
    estatus?: TasksEstatus | null
    fechaCreacion?: Date | string
    interval?: number | null
    error?: string | null
    type?: TasksTypes
    ultimaEjecucion?: Date | string | null
    Servidores?: ServidoresCreateNestedOneWithoutTasksInput
  }

  export type TasksUncheckedCreateInput = {
    id?: number
    idTask: string
    idServidor?: number | null
    estatus?: TasksEstatus | null
    fechaCreacion?: Date | string
    interval?: number | null
    error?: string | null
    type?: TasksTypes
    ultimaEjecucion?: Date | string | null
  }

  export type TasksUpdateInput = {
    idTask?: StringFieldUpdateOperationsInput | string
    estatus?: NullableEnumTasksEstatusFieldUpdateOperationsInput | TasksEstatus | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    interval?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTasksTypesFieldUpdateOperationsInput | TasksTypes
    ultimaEjecucion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Servidores?: ServidoresUpdateOneWithoutTasksInput
  }

  export type TasksUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    idTask?: StringFieldUpdateOperationsInput | string
    idServidor?: NullableIntFieldUpdateOperationsInput | number | null
    estatus?: NullableEnumTasksEstatusFieldUpdateOperationsInput | TasksEstatus | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    interval?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTasksTypesFieldUpdateOperationsInput | TasksTypes
    ultimaEjecucion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TasksCreateManyInput = {
    id?: number
    idTask: string
    idServidor?: number | null
    estatus?: TasksEstatus | null
    fechaCreacion?: Date | string
    interval?: number | null
    error?: string | null
    type?: TasksTypes
    ultimaEjecucion?: Date | string | null
  }

  export type TasksUpdateManyMutationInput = {
    idTask?: StringFieldUpdateOperationsInput | string
    estatus?: NullableEnumTasksEstatusFieldUpdateOperationsInput | TasksEstatus | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    interval?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTasksTypesFieldUpdateOperationsInput | TasksTypes
    ultimaEjecucion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TasksUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    idTask?: StringFieldUpdateOperationsInput | string
    idServidor?: NullableIntFieldUpdateOperationsInput | number | null
    estatus?: NullableEnumTasksEstatusFieldUpdateOperationsInput | TasksEstatus | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    interval?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTasksTypesFieldUpdateOperationsInput | TasksTypes
    ultimaEjecucion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UsuariosCreateInput = {
    publicId: string
    nombre: string
    apellido: string
    email?: string | null
    password: string
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string | null
    EstatusUsuarios?: EstatusUsuariosCreateNestedOneWithoutUsuariosInput
    Servidores?: ServidoresCreateNestedManyWithoutUsuariosInput
  }

  export type UsuariosUncheckedCreateInput = {
    publicId: string
    idUsuario?: number
    estatus?: number
    nombre: string
    apellido: string
    email?: string | null
    password: string
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string | null
    Servidores?: ServidoresUncheckedCreateNestedManyWithoutUsuariosInput
  }

  export type UsuariosUpdateInput = {
    publicId?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    EstatusUsuarios?: EstatusUsuariosUpdateOneRequiredWithoutUsuariosInput
    Servidores?: ServidoresUpdateManyWithoutUsuariosInput
  }

  export type UsuariosUncheckedUpdateInput = {
    publicId?: StringFieldUpdateOperationsInput | string
    idUsuario?: IntFieldUpdateOperationsInput | number
    estatus?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Servidores?: ServidoresUncheckedUpdateManyWithoutUsuariosInput
  }

  export type UsuariosCreateManyInput = {
    publicId: string
    idUsuario?: number
    estatus?: number
    nombre: string
    apellido: string
    email?: string | null
    password: string
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string | null
  }

  export type UsuariosUpdateManyMutationInput = {
    publicId?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UsuariosUncheckedUpdateManyInput = {
    publicId?: StringFieldUpdateOperationsInput | string
    idUsuario?: IntFieldUpdateOperationsInput | number
    estatus?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    not?: NestedStringFilter | string
  }

  export type ServidoresListRelationFilter = {
    every?: ServidoresWhereInput
    some?: ServidoresWhereInput
    none?: ServidoresWhereInput
  }

  export type ServidoresOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EstatusServidoresOrderByRelevanceInput = {
    fields: Enumerable<EstatusServidoresOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type EstatusServidoresCountOrderByAggregateInput = {
    idEstatus?: SortOrder
    tipo?: SortOrder
    descripcion?: SortOrder
    titulo?: SortOrder
  }

  export type EstatusServidoresAvgOrderByAggregateInput = {
    idEstatus?: SortOrder
    tipo?: SortOrder
  }

  export type EstatusServidoresMaxOrderByAggregateInput = {
    idEstatus?: SortOrder
    tipo?: SortOrder
    descripcion?: SortOrder
    titulo?: SortOrder
  }

  export type EstatusServidoresMinOrderByAggregateInput = {
    idEstatus?: SortOrder
    tipo?: SortOrder
    descripcion?: SortOrder
    titulo?: SortOrder
  }

  export type EstatusServidoresSumOrderByAggregateInput = {
    idEstatus?: SortOrder
    tipo?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type UsuariosListRelationFilter = {
    every?: UsuariosWhereInput
    some?: UsuariosWhereInput
    none?: UsuariosWhereInput
  }

  export type UsuariosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EstatusUsuariosOrderByRelevanceInput = {
    fields: Enumerable<EstatusUsuariosOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type EstatusUsuariosCountOrderByAggregateInput = {
    idEstatus?: SortOrder
    tipo?: SortOrder
    descripcion?: SortOrder
    titulo?: SortOrder
  }

  export type EstatusUsuariosAvgOrderByAggregateInput = {
    idEstatus?: SortOrder
    tipo?: SortOrder
  }

  export type EstatusUsuariosMaxOrderByAggregateInput = {
    idEstatus?: SortOrder
    tipo?: SortOrder
    descripcion?: SortOrder
    titulo?: SortOrder
  }

  export type EstatusUsuariosMinOrderByAggregateInput = {
    idEstatus?: SortOrder
    tipo?: SortOrder
    descripcion?: SortOrder
    titulo?: SortOrder
  }

  export type EstatusUsuariosSumOrderByAggregateInput = {
    idEstatus?: SortOrder
    tipo?: SortOrder
  }

  export type FloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type BoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type ServidoresRelationFilter = {
    is?: ServidoresWhereInput
    isNot?: ServidoresWhereInput
  }

  export type PingServidoresOrderByRelevanceInput = {
    fields: Enumerable<PingServidoresOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type PingServidoresCountOrderByAggregateInput = {
    idPingServidor?: SortOrder
    idServidor?: SortOrder
    times?: SortOrder
    packetLoss?: SortOrder
    min?: SortOrder
    max?: SortOrder
    avg?: SortOrder
    log?: SortOrder
    isAlive?: SortOrder
    numericHost?: SortOrder
    fechaPing?: SortOrder
  }

  export type PingServidoresAvgOrderByAggregateInput = {
    idPingServidor?: SortOrder
    idServidor?: SortOrder
    times?: SortOrder
    packetLoss?: SortOrder
    min?: SortOrder
    max?: SortOrder
    avg?: SortOrder
  }

  export type PingServidoresMaxOrderByAggregateInput = {
    idPingServidor?: SortOrder
    idServidor?: SortOrder
    times?: SortOrder
    packetLoss?: SortOrder
    min?: SortOrder
    max?: SortOrder
    avg?: SortOrder
    log?: SortOrder
    isAlive?: SortOrder
    numericHost?: SortOrder
    fechaPing?: SortOrder
  }

  export type PingServidoresMinOrderByAggregateInput = {
    idPingServidor?: SortOrder
    idServidor?: SortOrder
    times?: SortOrder
    packetLoss?: SortOrder
    min?: SortOrder
    max?: SortOrder
    avg?: SortOrder
    log?: SortOrder
    isAlive?: SortOrder
    numericHost?: SortOrder
    fechaPing?: SortOrder
  }

  export type PingServidoresSumOrderByAggregateInput = {
    idPingServidor?: SortOrder
    idServidor?: SortOrder
    times?: SortOrder
    packetLoss?: SortOrder
    min?: SortOrder
    max?: SortOrder
    avg?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedFloatNullableFilter
    _min?: NestedFloatNullableFilter
    _max?: NestedFloatNullableFilter
  }

  export type BoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type EstatusServidoresRelationFilter = {
    is?: EstatusServidoresWhereInput
    isNot?: EstatusServidoresWhereInput
  }

  export type UsuariosRelationFilter = {
    is?: UsuariosWhereInput | null
    isNot?: UsuariosWhereInput | null
  }

  export type PingServidoresListRelationFilter = {
    every?: PingServidoresWhereInput
    some?: PingServidoresWhereInput
    none?: PingServidoresWhereInput
  }

  export type TasksListRelationFilter = {
    every?: TasksWhereInput
    some?: TasksWhereInput
    none?: TasksWhereInput
  }

  export type PingServidoresOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TasksOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServidoresOrderByRelevanceInput = {
    fields: Enumerable<ServidoresOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type ServidoresCountOrderByAggregateInput = {
    publicId?: SortOrder
    idServidor?: SortOrder
    estatus?: SortOrder
    dominio?: SortOrder
    ip?: SortOrder
    fechaCreacion?: SortOrder
    fechaActualizacion?: SortOrder
    descripcion?: SortOrder
    idUsuario?: SortOrder
    nombre?: SortOrder
  }

  export type ServidoresAvgOrderByAggregateInput = {
    idServidor?: SortOrder
    estatus?: SortOrder
    idUsuario?: SortOrder
  }

  export type ServidoresMaxOrderByAggregateInput = {
    publicId?: SortOrder
    idServidor?: SortOrder
    estatus?: SortOrder
    dominio?: SortOrder
    ip?: SortOrder
    fechaCreacion?: SortOrder
    fechaActualizacion?: SortOrder
    descripcion?: SortOrder
    idUsuario?: SortOrder
    nombre?: SortOrder
  }

  export type ServidoresMinOrderByAggregateInput = {
    publicId?: SortOrder
    idServidor?: SortOrder
    estatus?: SortOrder
    dominio?: SortOrder
    ip?: SortOrder
    fechaCreacion?: SortOrder
    fechaActualizacion?: SortOrder
    descripcion?: SortOrder
    idUsuario?: SortOrder
    nombre?: SortOrder
  }

  export type ServidoresSumOrderByAggregateInput = {
    idServidor?: SortOrder
    estatus?: SortOrder
    idUsuario?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type EnumTasksEstatusNullableFilter = {
    equals?: TasksEstatus | null
    in?: Enumerable<TasksEstatus> | null
    notIn?: Enumerable<TasksEstatus> | null
    not?: NestedEnumTasksEstatusNullableFilter | TasksEstatus | null
  }

  export type EnumTasksTypesFilter = {
    equals?: TasksTypes
    in?: Enumerable<TasksTypes>
    notIn?: Enumerable<TasksTypes>
    not?: NestedEnumTasksTypesFilter | TasksTypes
  }

  export type TasksOrderByRelevanceInput = {
    fields: Enumerable<TasksOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type TasksCountOrderByAggregateInput = {
    id?: SortOrder
    idTask?: SortOrder
    idServidor?: SortOrder
    estatus?: SortOrder
    fechaCreacion?: SortOrder
    interval?: SortOrder
    error?: SortOrder
    type?: SortOrder
    ultimaEjecucion?: SortOrder
  }

  export type TasksAvgOrderByAggregateInput = {
    id?: SortOrder
    idServidor?: SortOrder
    interval?: SortOrder
  }

  export type TasksMaxOrderByAggregateInput = {
    id?: SortOrder
    idTask?: SortOrder
    idServidor?: SortOrder
    estatus?: SortOrder
    fechaCreacion?: SortOrder
    interval?: SortOrder
    error?: SortOrder
    type?: SortOrder
    ultimaEjecucion?: SortOrder
  }

  export type TasksMinOrderByAggregateInput = {
    id?: SortOrder
    idTask?: SortOrder
    idServidor?: SortOrder
    estatus?: SortOrder
    fechaCreacion?: SortOrder
    interval?: SortOrder
    error?: SortOrder
    type?: SortOrder
    ultimaEjecucion?: SortOrder
  }

  export type TasksSumOrderByAggregateInput = {
    id?: SortOrder
    idServidor?: SortOrder
    interval?: SortOrder
  }

  export type EnumTasksEstatusNullableWithAggregatesFilter = {
    equals?: TasksEstatus | null
    in?: Enumerable<TasksEstatus> | null
    notIn?: Enumerable<TasksEstatus> | null
    not?: NestedEnumTasksEstatusNullableWithAggregatesFilter | TasksEstatus | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumTasksEstatusNullableFilter
    _max?: NestedEnumTasksEstatusNullableFilter
  }

  export type EnumTasksTypesWithAggregatesFilter = {
    equals?: TasksTypes
    in?: Enumerable<TasksTypes>
    notIn?: Enumerable<TasksTypes>
    not?: NestedEnumTasksTypesWithAggregatesFilter | TasksTypes
    _count?: NestedIntFilter
    _min?: NestedEnumTasksTypesFilter
    _max?: NestedEnumTasksTypesFilter
  }

  export type EstatusUsuariosRelationFilter = {
    is?: EstatusUsuariosWhereInput
    isNot?: EstatusUsuariosWhereInput
  }

  export type UsuariosOrderByRelevanceInput = {
    fields: Enumerable<UsuariosOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type UsuariosCountOrderByAggregateInput = {
    publicId?: SortOrder
    idUsuario?: SortOrder
    estatus?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fechaCreacion?: SortOrder
    fechaActualizacion?: SortOrder
  }

  export type UsuariosAvgOrderByAggregateInput = {
    idUsuario?: SortOrder
    estatus?: SortOrder
  }

  export type UsuariosMaxOrderByAggregateInput = {
    publicId?: SortOrder
    idUsuario?: SortOrder
    estatus?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fechaCreacion?: SortOrder
    fechaActualizacion?: SortOrder
  }

  export type UsuariosMinOrderByAggregateInput = {
    publicId?: SortOrder
    idUsuario?: SortOrder
    estatus?: SortOrder
    nombre?: SortOrder
    apellido?: SortOrder
    email?: SortOrder
    password?: SortOrder
    fechaCreacion?: SortOrder
    fechaActualizacion?: SortOrder
  }

  export type UsuariosSumOrderByAggregateInput = {
    idUsuario?: SortOrder
    estatus?: SortOrder
  }

  export type ServidoresCreateNestedManyWithoutEstatusServidoresInput = {
    create?: XOR<Enumerable<ServidoresCreateWithoutEstatusServidoresInput>, Enumerable<ServidoresUncheckedCreateWithoutEstatusServidoresInput>>
    connectOrCreate?: Enumerable<ServidoresCreateOrConnectWithoutEstatusServidoresInput>
    createMany?: ServidoresCreateManyEstatusServidoresInputEnvelope
    connect?: Enumerable<ServidoresWhereUniqueInput>
  }

  export type ServidoresUncheckedCreateNestedManyWithoutEstatusServidoresInput = {
    create?: XOR<Enumerable<ServidoresCreateWithoutEstatusServidoresInput>, Enumerable<ServidoresUncheckedCreateWithoutEstatusServidoresInput>>
    connectOrCreate?: Enumerable<ServidoresCreateOrConnectWithoutEstatusServidoresInput>
    createMany?: ServidoresCreateManyEstatusServidoresInputEnvelope
    connect?: Enumerable<ServidoresWhereUniqueInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type ServidoresUpdateManyWithoutEstatusServidoresInput = {
    create?: XOR<Enumerable<ServidoresCreateWithoutEstatusServidoresInput>, Enumerable<ServidoresUncheckedCreateWithoutEstatusServidoresInput>>
    connectOrCreate?: Enumerable<ServidoresCreateOrConnectWithoutEstatusServidoresInput>
    upsert?: Enumerable<ServidoresUpsertWithWhereUniqueWithoutEstatusServidoresInput>
    createMany?: ServidoresCreateManyEstatusServidoresInputEnvelope
    set?: Enumerable<ServidoresWhereUniqueInput>
    disconnect?: Enumerable<ServidoresWhereUniqueInput>
    delete?: Enumerable<ServidoresWhereUniqueInput>
    connect?: Enumerable<ServidoresWhereUniqueInput>
    update?: Enumerable<ServidoresUpdateWithWhereUniqueWithoutEstatusServidoresInput>
    updateMany?: Enumerable<ServidoresUpdateManyWithWhereWithoutEstatusServidoresInput>
    deleteMany?: Enumerable<ServidoresScalarWhereInput>
  }

  export type ServidoresUncheckedUpdateManyWithoutEstatusServidoresInput = {
    create?: XOR<Enumerable<ServidoresCreateWithoutEstatusServidoresInput>, Enumerable<ServidoresUncheckedCreateWithoutEstatusServidoresInput>>
    connectOrCreate?: Enumerable<ServidoresCreateOrConnectWithoutEstatusServidoresInput>
    upsert?: Enumerable<ServidoresUpsertWithWhereUniqueWithoutEstatusServidoresInput>
    createMany?: ServidoresCreateManyEstatusServidoresInputEnvelope
    set?: Enumerable<ServidoresWhereUniqueInput>
    disconnect?: Enumerable<ServidoresWhereUniqueInput>
    delete?: Enumerable<ServidoresWhereUniqueInput>
    connect?: Enumerable<ServidoresWhereUniqueInput>
    update?: Enumerable<ServidoresUpdateWithWhereUniqueWithoutEstatusServidoresInput>
    updateMany?: Enumerable<ServidoresUpdateManyWithWhereWithoutEstatusServidoresInput>
    deleteMany?: Enumerable<ServidoresScalarWhereInput>
  }

  export type UsuariosCreateNestedManyWithoutEstatusUsuariosInput = {
    create?: XOR<Enumerable<UsuariosCreateWithoutEstatusUsuariosInput>, Enumerable<UsuariosUncheckedCreateWithoutEstatusUsuariosInput>>
    connectOrCreate?: Enumerable<UsuariosCreateOrConnectWithoutEstatusUsuariosInput>
    createMany?: UsuariosCreateManyEstatusUsuariosInputEnvelope
    connect?: Enumerable<UsuariosWhereUniqueInput>
  }

  export type UsuariosUncheckedCreateNestedManyWithoutEstatusUsuariosInput = {
    create?: XOR<Enumerable<UsuariosCreateWithoutEstatusUsuariosInput>, Enumerable<UsuariosUncheckedCreateWithoutEstatusUsuariosInput>>
    connectOrCreate?: Enumerable<UsuariosCreateOrConnectWithoutEstatusUsuariosInput>
    createMany?: UsuariosCreateManyEstatusUsuariosInputEnvelope
    connect?: Enumerable<UsuariosWhereUniqueInput>
  }

  export type UsuariosUpdateManyWithoutEstatusUsuariosInput = {
    create?: XOR<Enumerable<UsuariosCreateWithoutEstatusUsuariosInput>, Enumerable<UsuariosUncheckedCreateWithoutEstatusUsuariosInput>>
    connectOrCreate?: Enumerable<UsuariosCreateOrConnectWithoutEstatusUsuariosInput>
    upsert?: Enumerable<UsuariosUpsertWithWhereUniqueWithoutEstatusUsuariosInput>
    createMany?: UsuariosCreateManyEstatusUsuariosInputEnvelope
    set?: Enumerable<UsuariosWhereUniqueInput>
    disconnect?: Enumerable<UsuariosWhereUniqueInput>
    delete?: Enumerable<UsuariosWhereUniqueInput>
    connect?: Enumerable<UsuariosWhereUniqueInput>
    update?: Enumerable<UsuariosUpdateWithWhereUniqueWithoutEstatusUsuariosInput>
    updateMany?: Enumerable<UsuariosUpdateManyWithWhereWithoutEstatusUsuariosInput>
    deleteMany?: Enumerable<UsuariosScalarWhereInput>
  }

  export type UsuariosUncheckedUpdateManyWithoutEstatusUsuariosInput = {
    create?: XOR<Enumerable<UsuariosCreateWithoutEstatusUsuariosInput>, Enumerable<UsuariosUncheckedCreateWithoutEstatusUsuariosInput>>
    connectOrCreate?: Enumerable<UsuariosCreateOrConnectWithoutEstatusUsuariosInput>
    upsert?: Enumerable<UsuariosUpsertWithWhereUniqueWithoutEstatusUsuariosInput>
    createMany?: UsuariosCreateManyEstatusUsuariosInputEnvelope
    set?: Enumerable<UsuariosWhereUniqueInput>
    disconnect?: Enumerable<UsuariosWhereUniqueInput>
    delete?: Enumerable<UsuariosWhereUniqueInput>
    connect?: Enumerable<UsuariosWhereUniqueInput>
    update?: Enumerable<UsuariosUpdateWithWhereUniqueWithoutEstatusUsuariosInput>
    updateMany?: Enumerable<UsuariosUpdateManyWithWhereWithoutEstatusUsuariosInput>
    deleteMany?: Enumerable<UsuariosScalarWhereInput>
  }

  export type ServidoresCreateNestedOneWithoutPingServidoresInput = {
    create?: XOR<ServidoresCreateWithoutPingServidoresInput, ServidoresUncheckedCreateWithoutPingServidoresInput>
    connectOrCreate?: ServidoresCreateOrConnectWithoutPingServidoresInput
    connect?: ServidoresWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ServidoresUpdateOneRequiredWithoutPingServidoresInput = {
    create?: XOR<ServidoresCreateWithoutPingServidoresInput, ServidoresUncheckedCreateWithoutPingServidoresInput>
    connectOrCreate?: ServidoresCreateOrConnectWithoutPingServidoresInput
    upsert?: ServidoresUpsertWithoutPingServidoresInput
    connect?: ServidoresWhereUniqueInput
    update?: XOR<ServidoresUpdateWithoutPingServidoresInput, ServidoresUncheckedUpdateWithoutPingServidoresInput>
  }

  export type EstatusServidoresCreateNestedOneWithoutServidoresInput = {
    create?: XOR<EstatusServidoresCreateWithoutServidoresInput, EstatusServidoresUncheckedCreateWithoutServidoresInput>
    connectOrCreate?: EstatusServidoresCreateOrConnectWithoutServidoresInput
    connect?: EstatusServidoresWhereUniqueInput
  }

  export type UsuariosCreateNestedOneWithoutServidoresInput = {
    create?: XOR<UsuariosCreateWithoutServidoresInput, UsuariosUncheckedCreateWithoutServidoresInput>
    connectOrCreate?: UsuariosCreateOrConnectWithoutServidoresInput
    connect?: UsuariosWhereUniqueInput
  }

  export type PingServidoresCreateNestedManyWithoutServidoresInput = {
    create?: XOR<Enumerable<PingServidoresCreateWithoutServidoresInput>, Enumerable<PingServidoresUncheckedCreateWithoutServidoresInput>>
    connectOrCreate?: Enumerable<PingServidoresCreateOrConnectWithoutServidoresInput>
    createMany?: PingServidoresCreateManyServidoresInputEnvelope
    connect?: Enumerable<PingServidoresWhereUniqueInput>
  }

  export type TasksCreateNestedManyWithoutServidoresInput = {
    create?: XOR<Enumerable<TasksCreateWithoutServidoresInput>, Enumerable<TasksUncheckedCreateWithoutServidoresInput>>
    connectOrCreate?: Enumerable<TasksCreateOrConnectWithoutServidoresInput>
    createMany?: TasksCreateManyServidoresInputEnvelope
    connect?: Enumerable<TasksWhereUniqueInput>
  }

  export type PingServidoresUncheckedCreateNestedManyWithoutServidoresInput = {
    create?: XOR<Enumerable<PingServidoresCreateWithoutServidoresInput>, Enumerable<PingServidoresUncheckedCreateWithoutServidoresInput>>
    connectOrCreate?: Enumerable<PingServidoresCreateOrConnectWithoutServidoresInput>
    createMany?: PingServidoresCreateManyServidoresInputEnvelope
    connect?: Enumerable<PingServidoresWhereUniqueInput>
  }

  export type TasksUncheckedCreateNestedManyWithoutServidoresInput = {
    create?: XOR<Enumerable<TasksCreateWithoutServidoresInput>, Enumerable<TasksUncheckedCreateWithoutServidoresInput>>
    connectOrCreate?: Enumerable<TasksCreateOrConnectWithoutServidoresInput>
    createMany?: TasksCreateManyServidoresInputEnvelope
    connect?: Enumerable<TasksWhereUniqueInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EstatusServidoresUpdateOneRequiredWithoutServidoresInput = {
    create?: XOR<EstatusServidoresCreateWithoutServidoresInput, EstatusServidoresUncheckedCreateWithoutServidoresInput>
    connectOrCreate?: EstatusServidoresCreateOrConnectWithoutServidoresInput
    upsert?: EstatusServidoresUpsertWithoutServidoresInput
    connect?: EstatusServidoresWhereUniqueInput
    update?: XOR<EstatusServidoresUpdateWithoutServidoresInput, EstatusServidoresUncheckedUpdateWithoutServidoresInput>
  }

  export type UsuariosUpdateOneWithoutServidoresInput = {
    create?: XOR<UsuariosCreateWithoutServidoresInput, UsuariosUncheckedCreateWithoutServidoresInput>
    connectOrCreate?: UsuariosCreateOrConnectWithoutServidoresInput
    upsert?: UsuariosUpsertWithoutServidoresInput
    disconnect?: boolean
    delete?: boolean
    connect?: UsuariosWhereUniqueInput
    update?: XOR<UsuariosUpdateWithoutServidoresInput, UsuariosUncheckedUpdateWithoutServidoresInput>
  }

  export type PingServidoresUpdateManyWithoutServidoresInput = {
    create?: XOR<Enumerable<PingServidoresCreateWithoutServidoresInput>, Enumerable<PingServidoresUncheckedCreateWithoutServidoresInput>>
    connectOrCreate?: Enumerable<PingServidoresCreateOrConnectWithoutServidoresInput>
    upsert?: Enumerable<PingServidoresUpsertWithWhereUniqueWithoutServidoresInput>
    createMany?: PingServidoresCreateManyServidoresInputEnvelope
    set?: Enumerable<PingServidoresWhereUniqueInput>
    disconnect?: Enumerable<PingServidoresWhereUniqueInput>
    delete?: Enumerable<PingServidoresWhereUniqueInput>
    connect?: Enumerable<PingServidoresWhereUniqueInput>
    update?: Enumerable<PingServidoresUpdateWithWhereUniqueWithoutServidoresInput>
    updateMany?: Enumerable<PingServidoresUpdateManyWithWhereWithoutServidoresInput>
    deleteMany?: Enumerable<PingServidoresScalarWhereInput>
  }

  export type TasksUpdateManyWithoutServidoresInput = {
    create?: XOR<Enumerable<TasksCreateWithoutServidoresInput>, Enumerable<TasksUncheckedCreateWithoutServidoresInput>>
    connectOrCreate?: Enumerable<TasksCreateOrConnectWithoutServidoresInput>
    upsert?: Enumerable<TasksUpsertWithWhereUniqueWithoutServidoresInput>
    createMany?: TasksCreateManyServidoresInputEnvelope
    set?: Enumerable<TasksWhereUniqueInput>
    disconnect?: Enumerable<TasksWhereUniqueInput>
    delete?: Enumerable<TasksWhereUniqueInput>
    connect?: Enumerable<TasksWhereUniqueInput>
    update?: Enumerable<TasksUpdateWithWhereUniqueWithoutServidoresInput>
    updateMany?: Enumerable<TasksUpdateManyWithWhereWithoutServidoresInput>
    deleteMany?: Enumerable<TasksScalarWhereInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PingServidoresUncheckedUpdateManyWithoutServidoresInput = {
    create?: XOR<Enumerable<PingServidoresCreateWithoutServidoresInput>, Enumerable<PingServidoresUncheckedCreateWithoutServidoresInput>>
    connectOrCreate?: Enumerable<PingServidoresCreateOrConnectWithoutServidoresInput>
    upsert?: Enumerable<PingServidoresUpsertWithWhereUniqueWithoutServidoresInput>
    createMany?: PingServidoresCreateManyServidoresInputEnvelope
    set?: Enumerable<PingServidoresWhereUniqueInput>
    disconnect?: Enumerable<PingServidoresWhereUniqueInput>
    delete?: Enumerable<PingServidoresWhereUniqueInput>
    connect?: Enumerable<PingServidoresWhereUniqueInput>
    update?: Enumerable<PingServidoresUpdateWithWhereUniqueWithoutServidoresInput>
    updateMany?: Enumerable<PingServidoresUpdateManyWithWhereWithoutServidoresInput>
    deleteMany?: Enumerable<PingServidoresScalarWhereInput>
  }

  export type TasksUncheckedUpdateManyWithoutServidoresInput = {
    create?: XOR<Enumerable<TasksCreateWithoutServidoresInput>, Enumerable<TasksUncheckedCreateWithoutServidoresInput>>
    connectOrCreate?: Enumerable<TasksCreateOrConnectWithoutServidoresInput>
    upsert?: Enumerable<TasksUpsertWithWhereUniqueWithoutServidoresInput>
    createMany?: TasksCreateManyServidoresInputEnvelope
    set?: Enumerable<TasksWhereUniqueInput>
    disconnect?: Enumerable<TasksWhereUniqueInput>
    delete?: Enumerable<TasksWhereUniqueInput>
    connect?: Enumerable<TasksWhereUniqueInput>
    update?: Enumerable<TasksUpdateWithWhereUniqueWithoutServidoresInput>
    updateMany?: Enumerable<TasksUpdateManyWithWhereWithoutServidoresInput>
    deleteMany?: Enumerable<TasksScalarWhereInput>
  }

  export type ServidoresCreateNestedOneWithoutTasksInput = {
    create?: XOR<ServidoresCreateWithoutTasksInput, ServidoresUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ServidoresCreateOrConnectWithoutTasksInput
    connect?: ServidoresWhereUniqueInput
  }

  export type NullableEnumTasksEstatusFieldUpdateOperationsInput = {
    set?: TasksEstatus | null
  }

  export type EnumTasksTypesFieldUpdateOperationsInput = {
    set?: TasksTypes
  }

  export type ServidoresUpdateOneWithoutTasksInput = {
    create?: XOR<ServidoresCreateWithoutTasksInput, ServidoresUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ServidoresCreateOrConnectWithoutTasksInput
    upsert?: ServidoresUpsertWithoutTasksInput
    disconnect?: boolean
    delete?: boolean
    connect?: ServidoresWhereUniqueInput
    update?: XOR<ServidoresUpdateWithoutTasksInput, ServidoresUncheckedUpdateWithoutTasksInput>
  }

  export type EstatusUsuariosCreateNestedOneWithoutUsuariosInput = {
    create?: XOR<EstatusUsuariosCreateWithoutUsuariosInput, EstatusUsuariosUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: EstatusUsuariosCreateOrConnectWithoutUsuariosInput
    connect?: EstatusUsuariosWhereUniqueInput
  }

  export type ServidoresCreateNestedManyWithoutUsuariosInput = {
    create?: XOR<Enumerable<ServidoresCreateWithoutUsuariosInput>, Enumerable<ServidoresUncheckedCreateWithoutUsuariosInput>>
    connectOrCreate?: Enumerable<ServidoresCreateOrConnectWithoutUsuariosInput>
    createMany?: ServidoresCreateManyUsuariosInputEnvelope
    connect?: Enumerable<ServidoresWhereUniqueInput>
  }

  export type ServidoresUncheckedCreateNestedManyWithoutUsuariosInput = {
    create?: XOR<Enumerable<ServidoresCreateWithoutUsuariosInput>, Enumerable<ServidoresUncheckedCreateWithoutUsuariosInput>>
    connectOrCreate?: Enumerable<ServidoresCreateOrConnectWithoutUsuariosInput>
    createMany?: ServidoresCreateManyUsuariosInputEnvelope
    connect?: Enumerable<ServidoresWhereUniqueInput>
  }

  export type EstatusUsuariosUpdateOneRequiredWithoutUsuariosInput = {
    create?: XOR<EstatusUsuariosCreateWithoutUsuariosInput, EstatusUsuariosUncheckedCreateWithoutUsuariosInput>
    connectOrCreate?: EstatusUsuariosCreateOrConnectWithoutUsuariosInput
    upsert?: EstatusUsuariosUpsertWithoutUsuariosInput
    connect?: EstatusUsuariosWhereUniqueInput
    update?: XOR<EstatusUsuariosUpdateWithoutUsuariosInput, EstatusUsuariosUncheckedUpdateWithoutUsuariosInput>
  }

  export type ServidoresUpdateManyWithoutUsuariosInput = {
    create?: XOR<Enumerable<ServidoresCreateWithoutUsuariosInput>, Enumerable<ServidoresUncheckedCreateWithoutUsuariosInput>>
    connectOrCreate?: Enumerable<ServidoresCreateOrConnectWithoutUsuariosInput>
    upsert?: Enumerable<ServidoresUpsertWithWhereUniqueWithoutUsuariosInput>
    createMany?: ServidoresCreateManyUsuariosInputEnvelope
    set?: Enumerable<ServidoresWhereUniqueInput>
    disconnect?: Enumerable<ServidoresWhereUniqueInput>
    delete?: Enumerable<ServidoresWhereUniqueInput>
    connect?: Enumerable<ServidoresWhereUniqueInput>
    update?: Enumerable<ServidoresUpdateWithWhereUniqueWithoutUsuariosInput>
    updateMany?: Enumerable<ServidoresUpdateManyWithWhereWithoutUsuariosInput>
    deleteMany?: Enumerable<ServidoresScalarWhereInput>
  }

  export type ServidoresUncheckedUpdateManyWithoutUsuariosInput = {
    create?: XOR<Enumerable<ServidoresCreateWithoutUsuariosInput>, Enumerable<ServidoresUncheckedCreateWithoutUsuariosInput>>
    connectOrCreate?: Enumerable<ServidoresCreateOrConnectWithoutUsuariosInput>
    upsert?: Enumerable<ServidoresUpsertWithWhereUniqueWithoutUsuariosInput>
    createMany?: ServidoresCreateManyUsuariosInputEnvelope
    set?: Enumerable<ServidoresWhereUniqueInput>
    disconnect?: Enumerable<ServidoresWhereUniqueInput>
    delete?: Enumerable<ServidoresWhereUniqueInput>
    connect?: Enumerable<ServidoresWhereUniqueInput>
    update?: Enumerable<ServidoresUpdateWithWhereUniqueWithoutUsuariosInput>
    updateMany?: Enumerable<ServidoresUpdateManyWithWhereWithoutUsuariosInput>
    deleteMany?: Enumerable<ServidoresScalarWhereInput>
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    not?: NestedStringFilter | string
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedBoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedFloatNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedFloatNullableFilter
    _min?: NestedFloatNullableFilter
    _max?: NestedFloatNullableFilter
  }

  export type NestedBoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedEnumTasksEstatusNullableFilter = {
    equals?: TasksEstatus | null
    in?: Enumerable<TasksEstatus> | null
    notIn?: Enumerable<TasksEstatus> | null
    not?: NestedEnumTasksEstatusNullableFilter | TasksEstatus | null
  }

  export type NestedEnumTasksTypesFilter = {
    equals?: TasksTypes
    in?: Enumerable<TasksTypes>
    notIn?: Enumerable<TasksTypes>
    not?: NestedEnumTasksTypesFilter | TasksTypes
  }

  export type NestedEnumTasksEstatusNullableWithAggregatesFilter = {
    equals?: TasksEstatus | null
    in?: Enumerable<TasksEstatus> | null
    notIn?: Enumerable<TasksEstatus> | null
    not?: NestedEnumTasksEstatusNullableWithAggregatesFilter | TasksEstatus | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumTasksEstatusNullableFilter
    _max?: NestedEnumTasksEstatusNullableFilter
  }

  export type NestedEnumTasksTypesWithAggregatesFilter = {
    equals?: TasksTypes
    in?: Enumerable<TasksTypes>
    notIn?: Enumerable<TasksTypes>
    not?: NestedEnumTasksTypesWithAggregatesFilter | TasksTypes
    _count?: NestedIntFilter
    _min?: NestedEnumTasksTypesFilter
    _max?: NestedEnumTasksTypesFilter
  }

  export type ServidoresCreateWithoutEstatusServidoresInput = {
    publicId?: string | null
    dominio: string
    ip?: string | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string | null
    descripcion?: string | null
    nombre: string
    Usuarios?: UsuariosCreateNestedOneWithoutServidoresInput
    PingServidores?: PingServidoresCreateNestedManyWithoutServidoresInput
    Tasks?: TasksCreateNestedManyWithoutServidoresInput
  }

  export type ServidoresUncheckedCreateWithoutEstatusServidoresInput = {
    publicId?: string | null
    idServidor?: number
    dominio: string
    ip?: string | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string | null
    descripcion?: string | null
    idUsuario?: number | null
    nombre: string
    PingServidores?: PingServidoresUncheckedCreateNestedManyWithoutServidoresInput
    Tasks?: TasksUncheckedCreateNestedManyWithoutServidoresInput
  }

  export type ServidoresCreateOrConnectWithoutEstatusServidoresInput = {
    where: ServidoresWhereUniqueInput
    create: XOR<ServidoresCreateWithoutEstatusServidoresInput, ServidoresUncheckedCreateWithoutEstatusServidoresInput>
  }

  export type ServidoresCreateManyEstatusServidoresInputEnvelope = {
    data: Enumerable<ServidoresCreateManyEstatusServidoresInput>
    skipDuplicates?: boolean
  }

  export type ServidoresUpsertWithWhereUniqueWithoutEstatusServidoresInput = {
    where: ServidoresWhereUniqueInput
    update: XOR<ServidoresUpdateWithoutEstatusServidoresInput, ServidoresUncheckedUpdateWithoutEstatusServidoresInput>
    create: XOR<ServidoresCreateWithoutEstatusServidoresInput, ServidoresUncheckedCreateWithoutEstatusServidoresInput>
  }

  export type ServidoresUpdateWithWhereUniqueWithoutEstatusServidoresInput = {
    where: ServidoresWhereUniqueInput
    data: XOR<ServidoresUpdateWithoutEstatusServidoresInput, ServidoresUncheckedUpdateWithoutEstatusServidoresInput>
  }

  export type ServidoresUpdateManyWithWhereWithoutEstatusServidoresInput = {
    where: ServidoresScalarWhereInput
    data: XOR<ServidoresUpdateManyMutationInput, ServidoresUncheckedUpdateManyWithoutServidoresInput>
  }

  export type ServidoresScalarWhereInput = {
    AND?: Enumerable<ServidoresScalarWhereInput>
    OR?: Enumerable<ServidoresScalarWhereInput>
    NOT?: Enumerable<ServidoresScalarWhereInput>
    publicId?: StringNullableFilter | string | null
    idServidor?: IntFilter | number
    estatus?: IntFilter | number
    dominio?: StringFilter | string
    ip?: StringNullableFilter | string | null
    fechaCreacion?: DateTimeFilter | Date | string
    fechaActualizacion?: DateTimeNullableFilter | Date | string | null
    descripcion?: StringNullableFilter | string | null
    idUsuario?: IntNullableFilter | number | null
    nombre?: StringFilter | string
  }

  export type UsuariosCreateWithoutEstatusUsuariosInput = {
    publicId: string
    nombre: string
    apellido: string
    email?: string | null
    password: string
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string | null
    Servidores?: ServidoresCreateNestedManyWithoutUsuariosInput
  }

  export type UsuariosUncheckedCreateWithoutEstatusUsuariosInput = {
    publicId: string
    idUsuario?: number
    nombre: string
    apellido: string
    email?: string | null
    password: string
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string | null
    Servidores?: ServidoresUncheckedCreateNestedManyWithoutUsuariosInput
  }

  export type UsuariosCreateOrConnectWithoutEstatusUsuariosInput = {
    where: UsuariosWhereUniqueInput
    create: XOR<UsuariosCreateWithoutEstatusUsuariosInput, UsuariosUncheckedCreateWithoutEstatusUsuariosInput>
  }

  export type UsuariosCreateManyEstatusUsuariosInputEnvelope = {
    data: Enumerable<UsuariosCreateManyEstatusUsuariosInput>
    skipDuplicates?: boolean
  }

  export type UsuariosUpsertWithWhereUniqueWithoutEstatusUsuariosInput = {
    where: UsuariosWhereUniqueInput
    update: XOR<UsuariosUpdateWithoutEstatusUsuariosInput, UsuariosUncheckedUpdateWithoutEstatusUsuariosInput>
    create: XOR<UsuariosCreateWithoutEstatusUsuariosInput, UsuariosUncheckedCreateWithoutEstatusUsuariosInput>
  }

  export type UsuariosUpdateWithWhereUniqueWithoutEstatusUsuariosInput = {
    where: UsuariosWhereUniqueInput
    data: XOR<UsuariosUpdateWithoutEstatusUsuariosInput, UsuariosUncheckedUpdateWithoutEstatusUsuariosInput>
  }

  export type UsuariosUpdateManyWithWhereWithoutEstatusUsuariosInput = {
    where: UsuariosScalarWhereInput
    data: XOR<UsuariosUpdateManyMutationInput, UsuariosUncheckedUpdateManyWithoutUsuariosInput>
  }

  export type UsuariosScalarWhereInput = {
    AND?: Enumerable<UsuariosScalarWhereInput>
    OR?: Enumerable<UsuariosScalarWhereInput>
    NOT?: Enumerable<UsuariosScalarWhereInput>
    publicId?: StringFilter | string
    idUsuario?: IntFilter | number
    estatus?: IntFilter | number
    nombre?: StringFilter | string
    apellido?: StringFilter | string
    email?: StringNullableFilter | string | null
    password?: StringFilter | string
    fechaCreacion?: DateTimeFilter | Date | string
    fechaActualizacion?: DateTimeNullableFilter | Date | string | null
  }

  export type ServidoresCreateWithoutPingServidoresInput = {
    publicId?: string | null
    dominio: string
    ip?: string | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string | null
    descripcion?: string | null
    nombre: string
    EstatusServidores: EstatusServidoresCreateNestedOneWithoutServidoresInput
    Usuarios?: UsuariosCreateNestedOneWithoutServidoresInput
    Tasks?: TasksCreateNestedManyWithoutServidoresInput
  }

  export type ServidoresUncheckedCreateWithoutPingServidoresInput = {
    publicId?: string | null
    idServidor?: number
    estatus: number
    dominio: string
    ip?: string | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string | null
    descripcion?: string | null
    idUsuario?: number | null
    nombre: string
    Tasks?: TasksUncheckedCreateNestedManyWithoutServidoresInput
  }

  export type ServidoresCreateOrConnectWithoutPingServidoresInput = {
    where: ServidoresWhereUniqueInput
    create: XOR<ServidoresCreateWithoutPingServidoresInput, ServidoresUncheckedCreateWithoutPingServidoresInput>
  }

  export type ServidoresUpsertWithoutPingServidoresInput = {
    update: XOR<ServidoresUpdateWithoutPingServidoresInput, ServidoresUncheckedUpdateWithoutPingServidoresInput>
    create: XOR<ServidoresCreateWithoutPingServidoresInput, ServidoresUncheckedCreateWithoutPingServidoresInput>
  }

  export type ServidoresUpdateWithoutPingServidoresInput = {
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    dominio?: StringFieldUpdateOperationsInput | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    nombre?: StringFieldUpdateOperationsInput | string
    EstatusServidores?: EstatusServidoresUpdateOneRequiredWithoutServidoresInput
    Usuarios?: UsuariosUpdateOneWithoutServidoresInput
    Tasks?: TasksUpdateManyWithoutServidoresInput
  }

  export type ServidoresUncheckedUpdateWithoutPingServidoresInput = {
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    idServidor?: IntFieldUpdateOperationsInput | number
    estatus?: IntFieldUpdateOperationsInput | number
    dominio?: StringFieldUpdateOperationsInput | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    idUsuario?: NullableIntFieldUpdateOperationsInput | number | null
    nombre?: StringFieldUpdateOperationsInput | string
    Tasks?: TasksUncheckedUpdateManyWithoutServidoresInput
  }

  export type EstatusServidoresCreateWithoutServidoresInput = {
    tipo: number
    descripcion?: string | null
    titulo: string
  }

  export type EstatusServidoresUncheckedCreateWithoutServidoresInput = {
    idEstatus?: number
    tipo: number
    descripcion?: string | null
    titulo: string
  }

  export type EstatusServidoresCreateOrConnectWithoutServidoresInput = {
    where: EstatusServidoresWhereUniqueInput
    create: XOR<EstatusServidoresCreateWithoutServidoresInput, EstatusServidoresUncheckedCreateWithoutServidoresInput>
  }

  export type UsuariosCreateWithoutServidoresInput = {
    publicId: string
    nombre: string
    apellido: string
    email?: string | null
    password: string
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string | null
    EstatusUsuarios?: EstatusUsuariosCreateNestedOneWithoutUsuariosInput
  }

  export type UsuariosUncheckedCreateWithoutServidoresInput = {
    publicId: string
    idUsuario?: number
    estatus?: number
    nombre: string
    apellido: string
    email?: string | null
    password: string
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string | null
  }

  export type UsuariosCreateOrConnectWithoutServidoresInput = {
    where: UsuariosWhereUniqueInput
    create: XOR<UsuariosCreateWithoutServidoresInput, UsuariosUncheckedCreateWithoutServidoresInput>
  }

  export type PingServidoresCreateWithoutServidoresInput = {
    times?: number | null
    packetLoss?: number | null
    min?: number | null
    max?: number | null
    avg?: number | null
    log?: string | null
    isAlive?: boolean | null
    numericHost?: string | null
    fechaPing?: Date | string
  }

  export type PingServidoresUncheckedCreateWithoutServidoresInput = {
    idPingServidor?: number
    times?: number | null
    packetLoss?: number | null
    min?: number | null
    max?: number | null
    avg?: number | null
    log?: string | null
    isAlive?: boolean | null
    numericHost?: string | null
    fechaPing?: Date | string
  }

  export type PingServidoresCreateOrConnectWithoutServidoresInput = {
    where: PingServidoresWhereUniqueInput
    create: XOR<PingServidoresCreateWithoutServidoresInput, PingServidoresUncheckedCreateWithoutServidoresInput>
  }

  export type PingServidoresCreateManyServidoresInputEnvelope = {
    data: Enumerable<PingServidoresCreateManyServidoresInput>
    skipDuplicates?: boolean
  }

  export type TasksCreateWithoutServidoresInput = {
    idTask: string
    estatus?: TasksEstatus | null
    fechaCreacion?: Date | string
    interval?: number | null
    error?: string | null
    type?: TasksTypes
    ultimaEjecucion?: Date | string | null
  }

  export type TasksUncheckedCreateWithoutServidoresInput = {
    id?: number
    idTask: string
    estatus?: TasksEstatus | null
    fechaCreacion?: Date | string
    interval?: number | null
    error?: string | null
    type?: TasksTypes
    ultimaEjecucion?: Date | string | null
  }

  export type TasksCreateOrConnectWithoutServidoresInput = {
    where: TasksWhereUniqueInput
    create: XOR<TasksCreateWithoutServidoresInput, TasksUncheckedCreateWithoutServidoresInput>
  }

  export type TasksCreateManyServidoresInputEnvelope = {
    data: Enumerable<TasksCreateManyServidoresInput>
    skipDuplicates?: boolean
  }

  export type EstatusServidoresUpsertWithoutServidoresInput = {
    update: XOR<EstatusServidoresUpdateWithoutServidoresInput, EstatusServidoresUncheckedUpdateWithoutServidoresInput>
    create: XOR<EstatusServidoresCreateWithoutServidoresInput, EstatusServidoresUncheckedCreateWithoutServidoresInput>
  }

  export type EstatusServidoresUpdateWithoutServidoresInput = {
    tipo?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    titulo?: StringFieldUpdateOperationsInput | string
  }

  export type EstatusServidoresUncheckedUpdateWithoutServidoresInput = {
    idEstatus?: IntFieldUpdateOperationsInput | number
    tipo?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    titulo?: StringFieldUpdateOperationsInput | string
  }

  export type UsuariosUpsertWithoutServidoresInput = {
    update: XOR<UsuariosUpdateWithoutServidoresInput, UsuariosUncheckedUpdateWithoutServidoresInput>
    create: XOR<UsuariosCreateWithoutServidoresInput, UsuariosUncheckedCreateWithoutServidoresInput>
  }

  export type UsuariosUpdateWithoutServidoresInput = {
    publicId?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    EstatusUsuarios?: EstatusUsuariosUpdateOneRequiredWithoutUsuariosInput
  }

  export type UsuariosUncheckedUpdateWithoutServidoresInput = {
    publicId?: StringFieldUpdateOperationsInput | string
    idUsuario?: IntFieldUpdateOperationsInput | number
    estatus?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PingServidoresUpsertWithWhereUniqueWithoutServidoresInput = {
    where: PingServidoresWhereUniqueInput
    update: XOR<PingServidoresUpdateWithoutServidoresInput, PingServidoresUncheckedUpdateWithoutServidoresInput>
    create: XOR<PingServidoresCreateWithoutServidoresInput, PingServidoresUncheckedCreateWithoutServidoresInput>
  }

  export type PingServidoresUpdateWithWhereUniqueWithoutServidoresInput = {
    where: PingServidoresWhereUniqueInput
    data: XOR<PingServidoresUpdateWithoutServidoresInput, PingServidoresUncheckedUpdateWithoutServidoresInput>
  }

  export type PingServidoresUpdateManyWithWhereWithoutServidoresInput = {
    where: PingServidoresScalarWhereInput
    data: XOR<PingServidoresUpdateManyMutationInput, PingServidoresUncheckedUpdateManyWithoutPingServidoresInput>
  }

  export type PingServidoresScalarWhereInput = {
    AND?: Enumerable<PingServidoresScalarWhereInput>
    OR?: Enumerable<PingServidoresScalarWhereInput>
    NOT?: Enumerable<PingServidoresScalarWhereInput>
    idPingServidor?: IntFilter | number
    idServidor?: IntFilter | number
    times?: FloatNullableFilter | number | null
    packetLoss?: FloatNullableFilter | number | null
    min?: FloatNullableFilter | number | null
    max?: FloatNullableFilter | number | null
    avg?: FloatNullableFilter | number | null
    log?: StringNullableFilter | string | null
    isAlive?: BoolNullableFilter | boolean | null
    numericHost?: StringNullableFilter | string | null
    fechaPing?: DateTimeFilter | Date | string
  }

  export type TasksUpsertWithWhereUniqueWithoutServidoresInput = {
    where: TasksWhereUniqueInput
    update: XOR<TasksUpdateWithoutServidoresInput, TasksUncheckedUpdateWithoutServidoresInput>
    create: XOR<TasksCreateWithoutServidoresInput, TasksUncheckedCreateWithoutServidoresInput>
  }

  export type TasksUpdateWithWhereUniqueWithoutServidoresInput = {
    where: TasksWhereUniqueInput
    data: XOR<TasksUpdateWithoutServidoresInput, TasksUncheckedUpdateWithoutServidoresInput>
  }

  export type TasksUpdateManyWithWhereWithoutServidoresInput = {
    where: TasksScalarWhereInput
    data: XOR<TasksUpdateManyMutationInput, TasksUncheckedUpdateManyWithoutTasksInput>
  }

  export type TasksScalarWhereInput = {
    AND?: Enumerable<TasksScalarWhereInput>
    OR?: Enumerable<TasksScalarWhereInput>
    NOT?: Enumerable<TasksScalarWhereInput>
    id?: IntFilter | number
    idTask?: StringFilter | string
    idServidor?: IntNullableFilter | number | null
    estatus?: EnumTasksEstatusNullableFilter | TasksEstatus | null
    fechaCreacion?: DateTimeFilter | Date | string
    interval?: IntNullableFilter | number | null
    error?: StringNullableFilter | string | null
    type?: EnumTasksTypesFilter | TasksTypes
    ultimaEjecucion?: DateTimeNullableFilter | Date | string | null
  }

  export type ServidoresCreateWithoutTasksInput = {
    publicId?: string | null
    dominio: string
    ip?: string | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string | null
    descripcion?: string | null
    nombre: string
    EstatusServidores: EstatusServidoresCreateNestedOneWithoutServidoresInput
    Usuarios?: UsuariosCreateNestedOneWithoutServidoresInput
    PingServidores?: PingServidoresCreateNestedManyWithoutServidoresInput
  }

  export type ServidoresUncheckedCreateWithoutTasksInput = {
    publicId?: string | null
    idServidor?: number
    estatus: number
    dominio: string
    ip?: string | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string | null
    descripcion?: string | null
    idUsuario?: number | null
    nombre: string
    PingServidores?: PingServidoresUncheckedCreateNestedManyWithoutServidoresInput
  }

  export type ServidoresCreateOrConnectWithoutTasksInput = {
    where: ServidoresWhereUniqueInput
    create: XOR<ServidoresCreateWithoutTasksInput, ServidoresUncheckedCreateWithoutTasksInput>
  }

  export type ServidoresUpsertWithoutTasksInput = {
    update: XOR<ServidoresUpdateWithoutTasksInput, ServidoresUncheckedUpdateWithoutTasksInput>
    create: XOR<ServidoresCreateWithoutTasksInput, ServidoresUncheckedCreateWithoutTasksInput>
  }

  export type ServidoresUpdateWithoutTasksInput = {
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    dominio?: StringFieldUpdateOperationsInput | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    nombre?: StringFieldUpdateOperationsInput | string
    EstatusServidores?: EstatusServidoresUpdateOneRequiredWithoutServidoresInput
    Usuarios?: UsuariosUpdateOneWithoutServidoresInput
    PingServidores?: PingServidoresUpdateManyWithoutServidoresInput
  }

  export type ServidoresUncheckedUpdateWithoutTasksInput = {
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    idServidor?: IntFieldUpdateOperationsInput | number
    estatus?: IntFieldUpdateOperationsInput | number
    dominio?: StringFieldUpdateOperationsInput | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    idUsuario?: NullableIntFieldUpdateOperationsInput | number | null
    nombre?: StringFieldUpdateOperationsInput | string
    PingServidores?: PingServidoresUncheckedUpdateManyWithoutServidoresInput
  }

  export type EstatusUsuariosCreateWithoutUsuariosInput = {
    tipo: number
    descripcion?: string | null
    titulo: string
  }

  export type EstatusUsuariosUncheckedCreateWithoutUsuariosInput = {
    idEstatus?: number
    tipo: number
    descripcion?: string | null
    titulo: string
  }

  export type EstatusUsuariosCreateOrConnectWithoutUsuariosInput = {
    where: EstatusUsuariosWhereUniqueInput
    create: XOR<EstatusUsuariosCreateWithoutUsuariosInput, EstatusUsuariosUncheckedCreateWithoutUsuariosInput>
  }

  export type ServidoresCreateWithoutUsuariosInput = {
    publicId?: string | null
    dominio: string
    ip?: string | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string | null
    descripcion?: string | null
    nombre: string
    EstatusServidores: EstatusServidoresCreateNestedOneWithoutServidoresInput
    PingServidores?: PingServidoresCreateNestedManyWithoutServidoresInput
    Tasks?: TasksCreateNestedManyWithoutServidoresInput
  }

  export type ServidoresUncheckedCreateWithoutUsuariosInput = {
    publicId?: string | null
    idServidor?: number
    estatus: number
    dominio: string
    ip?: string | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string | null
    descripcion?: string | null
    nombre: string
    PingServidores?: PingServidoresUncheckedCreateNestedManyWithoutServidoresInput
    Tasks?: TasksUncheckedCreateNestedManyWithoutServidoresInput
  }

  export type ServidoresCreateOrConnectWithoutUsuariosInput = {
    where: ServidoresWhereUniqueInput
    create: XOR<ServidoresCreateWithoutUsuariosInput, ServidoresUncheckedCreateWithoutUsuariosInput>
  }

  export type ServidoresCreateManyUsuariosInputEnvelope = {
    data: Enumerable<ServidoresCreateManyUsuariosInput>
    skipDuplicates?: boolean
  }

  export type EstatusUsuariosUpsertWithoutUsuariosInput = {
    update: XOR<EstatusUsuariosUpdateWithoutUsuariosInput, EstatusUsuariosUncheckedUpdateWithoutUsuariosInput>
    create: XOR<EstatusUsuariosCreateWithoutUsuariosInput, EstatusUsuariosUncheckedCreateWithoutUsuariosInput>
  }

  export type EstatusUsuariosUpdateWithoutUsuariosInput = {
    tipo?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    titulo?: StringFieldUpdateOperationsInput | string
  }

  export type EstatusUsuariosUncheckedUpdateWithoutUsuariosInput = {
    idEstatus?: IntFieldUpdateOperationsInput | number
    tipo?: IntFieldUpdateOperationsInput | number
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    titulo?: StringFieldUpdateOperationsInput | string
  }

  export type ServidoresUpsertWithWhereUniqueWithoutUsuariosInput = {
    where: ServidoresWhereUniqueInput
    update: XOR<ServidoresUpdateWithoutUsuariosInput, ServidoresUncheckedUpdateWithoutUsuariosInput>
    create: XOR<ServidoresCreateWithoutUsuariosInput, ServidoresUncheckedCreateWithoutUsuariosInput>
  }

  export type ServidoresUpdateWithWhereUniqueWithoutUsuariosInput = {
    where: ServidoresWhereUniqueInput
    data: XOR<ServidoresUpdateWithoutUsuariosInput, ServidoresUncheckedUpdateWithoutUsuariosInput>
  }

  export type ServidoresUpdateManyWithWhereWithoutUsuariosInput = {
    where: ServidoresScalarWhereInput
    data: XOR<ServidoresUpdateManyMutationInput, ServidoresUncheckedUpdateManyWithoutServidoresInput>
  }

  export type ServidoresCreateManyEstatusServidoresInput = {
    publicId?: string | null
    idServidor?: number
    dominio: string
    ip?: string | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string | null
    descripcion?: string | null
    idUsuario?: number | null
    nombre: string
  }

  export type ServidoresUpdateWithoutEstatusServidoresInput = {
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    dominio?: StringFieldUpdateOperationsInput | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    nombre?: StringFieldUpdateOperationsInput | string
    Usuarios?: UsuariosUpdateOneWithoutServidoresInput
    PingServidores?: PingServidoresUpdateManyWithoutServidoresInput
    Tasks?: TasksUpdateManyWithoutServidoresInput
  }

  export type ServidoresUncheckedUpdateWithoutEstatusServidoresInput = {
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    idServidor?: IntFieldUpdateOperationsInput | number
    dominio?: StringFieldUpdateOperationsInput | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    idUsuario?: NullableIntFieldUpdateOperationsInput | number | null
    nombre?: StringFieldUpdateOperationsInput | string
    PingServidores?: PingServidoresUncheckedUpdateManyWithoutServidoresInput
    Tasks?: TasksUncheckedUpdateManyWithoutServidoresInput
  }

  export type ServidoresUncheckedUpdateManyWithoutServidoresInput = {
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    idServidor?: IntFieldUpdateOperationsInput | number
    dominio?: StringFieldUpdateOperationsInput | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    idUsuario?: NullableIntFieldUpdateOperationsInput | number | null
    nombre?: StringFieldUpdateOperationsInput | string
  }

  export type UsuariosCreateManyEstatusUsuariosInput = {
    publicId: string
    idUsuario?: number
    nombre: string
    apellido: string
    email?: string | null
    password: string
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string | null
  }

  export type UsuariosUpdateWithoutEstatusUsuariosInput = {
    publicId?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Servidores?: ServidoresUpdateManyWithoutUsuariosInput
  }

  export type UsuariosUncheckedUpdateWithoutEstatusUsuariosInput = {
    publicId?: StringFieldUpdateOperationsInput | string
    idUsuario?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Servidores?: ServidoresUncheckedUpdateManyWithoutUsuariosInput
  }

  export type UsuariosUncheckedUpdateManyWithoutUsuariosInput = {
    publicId?: StringFieldUpdateOperationsInput | string
    idUsuario?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    apellido?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PingServidoresCreateManyServidoresInput = {
    idPingServidor?: number
    times?: number | null
    packetLoss?: number | null
    min?: number | null
    max?: number | null
    avg?: number | null
    log?: string | null
    isAlive?: boolean | null
    numericHost?: string | null
    fechaPing?: Date | string
  }

  export type TasksCreateManyServidoresInput = {
    id?: number
    idTask: string
    estatus?: TasksEstatus | null
    fechaCreacion?: Date | string
    interval?: number | null
    error?: string | null
    type?: TasksTypes
    ultimaEjecucion?: Date | string | null
  }

  export type PingServidoresUpdateWithoutServidoresInput = {
    times?: NullableFloatFieldUpdateOperationsInput | number | null
    packetLoss?: NullableFloatFieldUpdateOperationsInput | number | null
    min?: NullableFloatFieldUpdateOperationsInput | number | null
    max?: NullableFloatFieldUpdateOperationsInput | number | null
    avg?: NullableFloatFieldUpdateOperationsInput | number | null
    log?: NullableStringFieldUpdateOperationsInput | string | null
    isAlive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    numericHost?: NullableStringFieldUpdateOperationsInput | string | null
    fechaPing?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PingServidoresUncheckedUpdateWithoutServidoresInput = {
    idPingServidor?: IntFieldUpdateOperationsInput | number
    times?: NullableFloatFieldUpdateOperationsInput | number | null
    packetLoss?: NullableFloatFieldUpdateOperationsInput | number | null
    min?: NullableFloatFieldUpdateOperationsInput | number | null
    max?: NullableFloatFieldUpdateOperationsInput | number | null
    avg?: NullableFloatFieldUpdateOperationsInput | number | null
    log?: NullableStringFieldUpdateOperationsInput | string | null
    isAlive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    numericHost?: NullableStringFieldUpdateOperationsInput | string | null
    fechaPing?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PingServidoresUncheckedUpdateManyWithoutPingServidoresInput = {
    idPingServidor?: IntFieldUpdateOperationsInput | number
    times?: NullableFloatFieldUpdateOperationsInput | number | null
    packetLoss?: NullableFloatFieldUpdateOperationsInput | number | null
    min?: NullableFloatFieldUpdateOperationsInput | number | null
    max?: NullableFloatFieldUpdateOperationsInput | number | null
    avg?: NullableFloatFieldUpdateOperationsInput | number | null
    log?: NullableStringFieldUpdateOperationsInput | string | null
    isAlive?: NullableBoolFieldUpdateOperationsInput | boolean | null
    numericHost?: NullableStringFieldUpdateOperationsInput | string | null
    fechaPing?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TasksUpdateWithoutServidoresInput = {
    idTask?: StringFieldUpdateOperationsInput | string
    estatus?: NullableEnumTasksEstatusFieldUpdateOperationsInput | TasksEstatus | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    interval?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTasksTypesFieldUpdateOperationsInput | TasksTypes
    ultimaEjecucion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TasksUncheckedUpdateWithoutServidoresInput = {
    id?: IntFieldUpdateOperationsInput | number
    idTask?: StringFieldUpdateOperationsInput | string
    estatus?: NullableEnumTasksEstatusFieldUpdateOperationsInput | TasksEstatus | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    interval?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTasksTypesFieldUpdateOperationsInput | TasksTypes
    ultimaEjecucion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TasksUncheckedUpdateManyWithoutTasksInput = {
    id?: IntFieldUpdateOperationsInput | number
    idTask?: StringFieldUpdateOperationsInput | string
    estatus?: NullableEnumTasksEstatusFieldUpdateOperationsInput | TasksEstatus | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    interval?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumTasksTypesFieldUpdateOperationsInput | TasksTypes
    ultimaEjecucion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ServidoresCreateManyUsuariosInput = {
    publicId?: string | null
    idServidor?: number
    estatus: number
    dominio: string
    ip?: string | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string | null
    descripcion?: string | null
    nombre: string
  }

  export type ServidoresUpdateWithoutUsuariosInput = {
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    dominio?: StringFieldUpdateOperationsInput | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    nombre?: StringFieldUpdateOperationsInput | string
    EstatusServidores?: EstatusServidoresUpdateOneRequiredWithoutServidoresInput
    PingServidores?: PingServidoresUpdateManyWithoutServidoresInput
    Tasks?: TasksUpdateManyWithoutServidoresInput
  }

  export type ServidoresUncheckedUpdateWithoutUsuariosInput = {
    publicId?: NullableStringFieldUpdateOperationsInput | string | null
    idServidor?: IntFieldUpdateOperationsInput | number
    estatus?: IntFieldUpdateOperationsInput | number
    dominio?: StringFieldUpdateOperationsInput | string
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    nombre?: StringFieldUpdateOperationsInput | string
    PingServidores?: PingServidoresUncheckedUpdateManyWithoutServidoresInput
    Tasks?: TasksUncheckedUpdateManyWithoutServidoresInput
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}