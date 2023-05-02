import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoutine {
  @IsNotEmpty()
  @IsString()
  name: string;
  description: string;
  preferredTime: string;
  published: 'community' | 'friends';
}
