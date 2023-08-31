/* eslint-disable prettier/prettier */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        console.log('request method => ', request.method)
        console.log('request body => ', request.body)
        console.log('request query => ', request.query)
        console.log('Before request...')
        const now = Date.now();

        return next
            .handle()
            .pipe(
                tap(() => console.log(`After request... Time: ${Date.now() - now} ms`)),
        );
    }
}