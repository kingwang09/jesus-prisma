import { PrismaClient, Prisma } from '@prisma/client'

//이벤트 기반 로깅
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
  errorFormat: 'pretty',
})

prisma.$on('query', (e) => {
  console.info('Query: ' + e.query)
  console.info('Params: ' + e.params)
  console.warn('Duration: ' + e.duration + 'ms')
})

async function main() {
    let id = undefined;
    let findUsers = await prisma.user.findMany({
        where: {
            id
        }
    });
    console.log(findUsers);
    console.log("-------------------------------");

    findUsers = await prisma.user.findMany({
        where:{
            id:{
                in: [1, 2, 3, 4]
            }
        }
    });
    console.log(JSON.stringify(findUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

//npx ts-node script.ts
//npx prisma studio