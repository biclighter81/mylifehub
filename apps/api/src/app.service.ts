import { Injectable } from '@nestjs/common';
import { ShareTest } from 'types';

@Injectable()
export class AppService {
  getHello(): string {
    const x: ShareTest = { id: '1' };
    return 'Hello World!';
  }
}
