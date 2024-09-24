import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
@Catch(RpcException)
export class RcpCustomExceptionFilter implements ExceptionFilter {
    catch(exception: RpcException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const rpcError = exception.getError();
        console.log(rpcError);

        if (typeof rpcError === 'object' && 'statusCode' in rpcError && 'message' in rpcError) {
            response.status(rpcError.statusCode).json({
                statusCode: rpcError.statusCode,
                message: rpcError.message,
                timestamp: new Date().toISOString(),
                path: request.url,
            });
            return;
        }

        response.status(400).json({
            statusCode: 400,
            message: rpcError
        });
    }
}