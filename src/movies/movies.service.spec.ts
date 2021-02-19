import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  //beforeEach 테스트를 진행하기 전에 실행됨
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should be 4", () =>{
    expect(2+3).toEqual(5);
  });

  describe("getAll", () =>{
    it("should return an Array", () =>{

      //상단에 service = module.get<MoviesService>(MoviesService); 부분에서 MoviesService를 이미 가져와서 바로 getAll()을 실행해 볼수 있다.
      const result = service.getAll(); 

      expect(result).toBeInstanceOf(Array); //result 의 인스턴스가 Array인지 확인한다.
    })
  })

  describe("getOne", () =>{ 

    it("should return a movie", () => {
      //getOne을 테스트 하기 위해서는 하나라도 movie 객체가 있어야 한다
      //테스트 용으로 생성해 줍니다.
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    //404 에러가 잘 작동하는지 테스트
    it("should throw 404 error", () => {
      try{
        service.getOne(999);
      } catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID: 999 not found.")
      }
    });
  });

  describe("deleteOne", ()=>{
    it("delete a movie", () =>{
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(allMovies);
    });
    it('should return a 404', () => {
      try{
        service.deleteOne(999);
      } catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID: 999 not found.")
      }
    })
  })

  describe("create", () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  })

  describe("update", () => {
    it("should update a movie", ()=>{
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      service.update(1, {title: 'Updated Test'});
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    })

    it('should throw a NotFoundException', () => {
      try{
        service.update(999, {title: 'Updated Test'});
      } catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID: 999 not found.")
      }
    })
  })
});
