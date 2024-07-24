import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'User API',
        version: '1.0.0',
        description: 'API for managing users',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development Server',
        },
    ],
    components:{
        schemas:{
            CreateUserDTO:{
                type: 'object',
                required: ['username', 'name', 'lastName', 'email', 'password', 'city'],
                properties:{
                    username: {
                        type: 'string',
                        description: 'Username'
                    },
                    name:{
                        type: 'string',
                        description: 'User name'
                    },
                    lastName:{
                        type: 'string',
                        description: 'User last name'
                    },
                    email:{
                        type: 'string',
                        description: 'User email'
                    },
                    password:{
                        type: 'string',
                        description: 'User password'
                    },
                    city:{
                        type: 'string',
                        description: 'User city'
                    },
                }
            },
            CreatedUserResponse: {
                type: 'object',
                properties:{
                    id:{
                        type: 'string',
                        description: 'User ID'
                    },
                    username:{
                        type: 'string',
                        description: 'Username'
                    }
                }
            },
            LoginDTO:{
                type: 'object',
                properties:{
                    email:{
                        type: 'string',
                        description: 'User email'
                    },
                    password:{
                        type: 'string',
                        description: 'User password'
                    },
                }
            },
            GetUserResponse:{
                type: 'object',
                properties:{
                    id:{
                        type: 'string',
                        description: 'User ID'
                    },
                    username:{
                        type: 'string',
                        description: 'Username'
                    },
                    name:{
                        type: 'string',
                        description: 'User name'
                    },
                    lastName:{
                        type: 'string',
                        description: 'User last name'
                    },
                    email:{
                        type: 'string',
                        description: 'User email'
                    },
                    city:{
                        type: 'string',
                        description: 'User city'
                    },
                    puntuation:{
                        type: 'number',
                        description: 'User puntuation'
                    }
                }
            },
            UpdatePasswordDTO:{
                type: 'object',
                properties:{
                    id:{
                        type: 'string',
                        description: 'User ID'
                    },
                    currentPassword:{
                        type: 'string',
                        description: 'Current user password'
                    },
                    newPassword:{
                        type: 'string',
                        description: 'New user password'
                    }
                }
            },
            GetUsersResponse:{
                type: 'array',
                items: {
                    $ref: '#/components/schemas/GetUserResponse'
                }
            }
        }
    }
}
const options = {
    swaggerDefinition,
    apis: ['./src/Application/Routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;