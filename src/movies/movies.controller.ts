import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Movie } from './entites/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies') //이부분이 springboot의 requestMapping 역할
export class MoviesController {

    //service를 import 하는 방법
    constructor(private readonly moviesService: MoviesService){}


    @Get()//비워놓으면 라우터를 의미합니다. ('/')
    getAll(): Movie[]{
        return this.moviesService.getAll(); //위에서 constructor 한 Service 덕분에 getAll()을 사용할 수 있습니다.
    }

    @Get('/:id') //id값을 받는다 ('/1'), ('/2') ...
    getOne(@Param('id') movieId: string): Movie{
        return this.moviesService.getOne(movieId);
    }
    
    @Post()
    create(@Body() movieData){
        return this.moviesService.create(movieData);
    }

    @Delete('/:id')
    remove(@Param('id') movieId: string){
        return this.moviesService.deleteOne(movieId);
    }
    
    @Patch('/:id')
    path(@Param('id') movieId: string, @Body() updateData){
        return {
            updatedMovie: movieId,
            ...updateData,
        };
    }


}
