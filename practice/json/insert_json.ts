import { PrismaClient, Prisma } from '@prisma/client'

//기본 로깅
//const prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error'],})

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
    let userJson = [
      { name: 'Bob the dog' },
      { name: 'Claudine the cat' },
    ] as Prisma.JsonArray

    let createdUser = await prisma.user.create({
      data: {
        email: 'json-user@helloworld.com',
        name: 'Basic Json',
        extendedPetsData: userJson
      }
    });

    console.log(createdUser);
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