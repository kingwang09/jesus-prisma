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
    let createUsers: Prisma.UserCreateInput[] = [
        {
            email: "cisco2007@naver.com",
            extendedPetsData: {
                "pet1": {
                    "petName": "Claudine",
                    "petType": "House cat"
                },
                "pet2": {
                    "petName": "Sunny",
                    "petType": "Gerbil"
                }
            }
        }
    ];
    let createdUsers = await prisma.user.createMany({
        data: createUsers
    });
    console.log(createdUsers)
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