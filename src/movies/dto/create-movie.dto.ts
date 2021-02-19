import { IsString, IsNumber, IsOptional } from 'class-validator';


export class CreateMovieDTO{

    //받아야 하는 항목들을 입력해 줍니다.
    //readonly를 적어 읽기 전용임을 선언해줍니다.
    @IsString()
    readonly title: string;

    @IsNumber()
    readonly year: number;

    @IsString({each: true})
    @IsOptional()
    readonly genres: string[];
}