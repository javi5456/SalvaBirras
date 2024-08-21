import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  imgUrl: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;
}
export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  imgUrl: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  stock: number;
}
