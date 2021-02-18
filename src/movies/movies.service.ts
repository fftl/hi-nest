import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entites/movie.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(id: string): Movie {
        // return this.movies.find(movie => movie.id === parseInt(id));
        const movie = this.movies.find(movie => movie.id === +id); //이렇게도 int로 변경할 수 있다.
        if(!movie){
            throw new NotFoundException(`Movie with ID: ${id} not found.`); //nestjs에서 제공되는 exception
        }
        
        return movie;
    }

    deleteOne(id: string): boolean{
        this.movies.filter(movie => movie.id !== +id);
        return true;
    }
    
    create(movieData){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        })
    }
}
