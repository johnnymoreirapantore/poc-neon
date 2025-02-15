import { APIGatewayEvent} from 'aws-lambda'
import { prisma } from '../database/prisma';

export const listCustomers = async (event: APIGatewayEvent) => {
  try {
    
    const customers = await prisma.customer.findMany({
      include: {
        User: true
      }
    })

    return {
      statusCode: 200,
      body: JSON.stringify(
        customers,
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'Error to process lambda',
          error
        },
        null,
        2
      ),
    };
  }
};
