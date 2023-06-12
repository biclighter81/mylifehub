import {
  ArrayMinSize,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRoutine {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  @IsNotEmpty()
  preferredTime: string;
  @IsEnum(['community', 'friends'])
  @IsOptional()
  published: 'community' | 'friends';

  @ValidateNested()
  @Type(() => CreateStage)
  stages: CreateStage[];
}

export class CreateStage {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsNumber()
  @IsNotEmpty()
  estimatedDuration: number;
}
