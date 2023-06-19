import { Optional } from '@nestjs/common';
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGoal {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  @Optional()
  description: string;
  @IsNotEmpty()
  @IsNumber()
  goal: number;
  @IsNotEmpty()
  @IsString()
  @IsIn([
    'minutes',
    'hours',
    'steps',
    'miles',
    'kilometers',
    'meters',
    'reps',
    'sets',
    'pounds',
    'kilograms',
    'liters',
    'ounces',
    'cups',
    'gallons',
    'calories',
    'boolean',
    'other',
    'count',
  ])
  unit: string;
  @IsNotEmpty()
  @IsNumber()
  stepSize: number;
}
