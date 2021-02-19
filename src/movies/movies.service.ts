import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entites/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: number): Movie {
        console.log(id);
        // return this.movies.find(movie => movie.id === parseInt(id));
        const movie = this.movies.find(movie => movie.id === id); //이렇게도 int로 변경할 수 있다.
        if(!movie){
            throw new NotFoundException(`Movie with ID: ${id} not found.`); //nestjs에서 제공되는 exception
        }
        
        return movie;
    }

    deleteOne(id: number){
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
    }
    
    create(movieData: CreateMovieDTO){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        })
    }

    update(id:number, updateData: UpdateMovieDTO){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData}); //메모리 데이터를 사용하기 때문에 삭제한 뒤 다시 입력해야합니다.
    }
}
