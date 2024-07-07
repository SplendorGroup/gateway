import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type AnyObject = { [key: string]: any };

function sortObjectWithArraysLast(obj: any): any {
  if (Array.isArray(obj)) {
    return sortArray(obj);
  } else if (typeof obj === 'object' && obj !== null) {
    return sortObject(obj);
  } else {
    return obj;
  }
}

function sortArray(arr: any[]): any[] {
  return arr.map((item) => sortObjectWithArraysLast(item));
}

function sortObject(obj: AnyObject): AnyObject {
  const sortedObj: AnyObject = {};
  const { nonArrayKeys, arrayKeys } = getSortedKeys(obj);

  [...nonArrayKeys, ...arrayKeys].forEach((key) => {
    sortedObj[key] = sortObjectWithArraysLast(obj[key]);
  });

  return sortedObj;
}

function getSortedKeys(obj: AnyObject): {
  nonArrayKeys: string[];
  arrayKeys: string[];
} {
  const keys = Object.keys(obj);
  const nonArrayKeys = keys.filter((key) => !Array.isArray(obj[key])).sort();
  const arrayKeys = keys.filter((key) => Array.isArray(obj[key])).sort();
  return { nonArrayKeys, arrayKeys };
}

@Injectable()
export class SortResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => sortObjectWithArraysLast(data)));
  }
}
