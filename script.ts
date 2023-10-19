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
  // ... you will write your Prisma Client queries here
  // const user = await prisma.user.create({
  //     data: {
  //       name: 'Alice',
  //       email: 'alice@prisma.io',
  //     },
  //   })
  // console.log(user)

//     const users = await prisma.user.findMany()
//     console.log(users)

    // 관계를 포함한 데이터 추가
    // const user = await prisma.user.create({
    //     data: {
    //       name: 'hyungeun.jin',
    //       email: 'hyungeun.jin@nosearch.com',
    //       posts: {
    //         create: {
    //           title: 'Hello World',
    //         },
    //       },
    //     },
    // })
    // console.log(user)

    //관계 쿼리 조회
//     const usersWithPosts = await prisma.user.findMany({
//         include: {
//           posts: true,
//         },
//     })
//     console.dir(usersWithPosts, { depth: null })

//prisma에서 자동 생성해주는 타입
    // let user: Prisma.UserCreateInput
    // user = {
    //     email: 'elsa@prisma.io',
    //     name: 'Elsa Prisma',
    //     //test: "",
    // }
    // const createUser = await prisma.user.create({ data: user })


    let createUsers = [
      { name: 'Bob', email: 'bob@prisma.io' },
      { name: 'Bobo', email: 'bob@prisma.io' }, // Duplicate unique key!
      { name: 'Yewande', email: 'yewande@prisma.io' },
      { name: 'Angelique', email: 'angelique@prisma.io' },
    ]
    

    //bulk insert: 실행은 되는데 insert가 안됨.
    // await prisma.$transaction( async (tx) =>{
    //   createUsers.map((v)=>{
    //     console.log("before: ", v)
    //     const createdUser = tx.user.create({
    //       data: v
    //     })
    //     console.log("createdUser: ", createdUser)
        
    //   })
    // });

    const createMany = await prisma.user.createMany({
      data: [
        { name: 'Bob', email: 'bob@prisma.io' },
        { name: 'Bobo', email: 'bob@prisma.io' }, // Duplicate unique key!
        { name: 'Yewande', email: 'yewande@prisma.io' },
        { name: 'Angelique', email: 'angelique@prisma.io' },
      ],
      skipDuplicates: true, // Skip 'Bobo'
    })
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