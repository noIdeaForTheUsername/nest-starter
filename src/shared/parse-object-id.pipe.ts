import { ArgumentMetadata, BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor, PipeTransform } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { Observable } from 'rxjs';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: string) {
    if (ObjectId.isValid(value)) return new ObjectId(value);
    else throw new BadRequestException("Inalid format of Object ID");
  }
}
