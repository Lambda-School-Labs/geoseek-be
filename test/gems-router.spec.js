const request= require('supertest')
const gems= require('../gems/gems-router')
const db= require('../dbConfig')
const server= require('../server')

beforeEach(()=>{
    return db.migrate.rollback('users')
    .then(()=>db.migrate.latest('users'))
})

describe('Post Endpoints', () => {
  it('should create a new gem', async () => {
    const res= await request(gems)
      .post('/api/gems')
      .send({
        created_by_user: 1,
        longitude: 1.01,
        latitude: 1.01,
        difficulty: 3,
        description: 'very cool place'
      })
      .then(res=>{
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('post')
      })
  })
})

describe('Get Endpoints', () => {
    it('should return gems', async() => {
      const res= await request(gems)
        .get('/api/gems')
        .then(res=>{
            expect(res.statusCode).toEqual(201)
            expect(res.body).toHaveProperty('get')
        })
    })
    it('should return specific gem', async () => {
        const res= await request(gems)
        .get('/api/gems/3')
        .then(res=>{
            expect(res.statusCode).toEqual(201)
            expect(res.body).toHaveProperty('get')
            expect(res.body.id).toEqual(3)
        })
      })
})

describe('Put Endpoints', () => {
    it('should update gem', async () => {
        const res= await request(gems)
        .put('api/gems/3')
        .send({
            created_by_user: 2,
            longitude: 1.02,
            latitude: 1.02,
            difficulty: 2,
            description: 'decent place'
        })
        .then(res=>{
            expect(res.statusCode).toEqual(201)
            expect(res.body).toHaveProperty('post')
        })
    })
})

describe('Delete Endpoints', () => {
    it('should delete gem with given id', async () => {
        const res= await request(gems)
        .delete('/api/gems/3')
        .then(res=>{
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('delete')
        })
    })
})