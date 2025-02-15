import { APIGatewayEvent } from 'aws-lambda';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

export const seed = async (event: APIGatewayEvent) => {
  try {
    const quantity = event.queryStringParameters?.quantity
      ? parseInt(event.queryStringParameters.quantity, 10)
      : 10;

    for (let i = 0; i < quantity; i++) {
      const user = await prisma.user.create({
        data: {
          email: faker.internet.email(),
          name: faker.person.fullName(),
          password: faker.internet.password(),
          age: faker.number.int({ min: 18, max: 60 }),
          updatedAt: new Date(),
          Customer: {
            create: {
              phone: faker.phone.number(),
              address: faker.location.streetAddress(),
            }
          }
        },
        include: {
          Customer: true,
        },
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({message: 'users criados com sucesso'}),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'Error processing lambda',
          error: error.message,
        },
        null,
        2
      ),
    };
  }
};
