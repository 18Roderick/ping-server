/* eslint-disable */
export default async () => {
  const t = {};
  return {
    '@nestjs/swagger': {
      models: [
        [
          import('./server/dto/server.dto'),
          {
            CreateServerDto: {
              url: { required: true, type: () => String },
              ip: { required: true, type: () => String },
              description: { required: true, type: () => String },
              title: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./user/dto/user.dto'),
          {
            CreateUserDto: {
              password: { required: true, type: () => String },
              email: { required: true, type: () => String, maxLength: 255 },
              name: { required: true, type: () => String, minLength: 4, maxLength: 255 },
            },
            UpdateUser: {},
          },
        ],
        [import('./user/dto/update-user.dto'), { UpdateUserDto: {} }],
        [
          import('./auth/dto/auth.dto'),
          {
            AuthDto: {
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./user/dto/signin.dto'),
          {
            Signing: {
              name: { required: true, type: () => String, minLength: 3 },
              lastName: { required: true, type: () => String, minLength: 3 },
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
            },
          },
        ],
        [import('./user/entities/user.entity'), { User: {} }],
      ],
      controllers: [
        [import('./app.controller'), { AppController: { getHello: { type: String } } }],
        [
          import('./server/server.controller'),
          { ServerController: { getServer: {}, createServer: {} } },
        ],
        [
          import('./user/user.controller'),
          {
            UserController: {
              create: { type: String },
              findAll: { type: String },
              findOne: { type: String },
              update: { type: String },
              remove: { type: String },
            },
          },
        ],
        [
          import('./auth/auth.controller'),
          { AuthController: { signUp: { type: Object }, signIn: { type: Object } } },
        ],
        [
          import('./task/task.controller'),
          {
            TaskController: {
              createTask: { type: String },
              taskInterval: {},
              getTask: {},
              removeTaskJob: {},
            },
          },
        ],
      ],
    },
  };
};
