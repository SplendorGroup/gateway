import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type AnyObject = { [key: string]: any };

function sortObjectWithArraysLast(obj: any, seen = new WeakSet()): any {
  if (Array.isArray(obj)) {
    return sortArray(obj, seen);
  } else if (typeof obj === 'object' && obj !== null) {
    if (seen.has(obj)) {
      console.warn('Circular reference detected');
      throw new Error('Circular reference detected');
    }
    seen.add(obj);
    return sortObject(obj, seen);
  } else {
    return obj;
  }
}

function sortArray(arr: any[], seen: WeakSet<any>): any[] {
  return arr.map((item) => sortObjectWithArraysLast(item, seen));
}

function sortObject(obj: AnyObject, seen: WeakSet<any>): AnyObject {
  const sortedObj: AnyObject = {};
  const { nonArrayKeys, arrayKeys } = getSortedKeys(obj);

  [...nonArrayKeys, ...arrayKeys].forEach((key) => {
    sortedObj[key] = sortObjectWithArraysLast(obj[key], seen);
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
    return next.handle().pipe(
      map((data) => {
        try {
          return sortObjectWithArraysLast(data);
        } catch (error) {
          if (error.message === 'Circular reference detected') {
            console.warn('Returning original data due to circular reference');
            return data; // Retorna os dados originais em caso de referência circular
          }
          throw error; // Re-throw other errors
        }
      }),
    );
  }
}
