"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
let cachedApp = null;
async function bootstrap() {
    if (!cachedApp) {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors();
        app.use((0, cookie_parser_1.default)());
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            transform: true,
            stopAtFirstError: true,
            exceptionFactory: (errors) => {
                const errorsForResponse = errors.map((e) => ({
                    message: Object.values(e.constraints)[0],
                    field: e.property,
                }));
                return new common_1.BadRequestException({ errorsMessages: errorsForResponse });
            },
        }));
        await app.init();
        cachedApp = app;
    }
    return cachedApp.getHttpAdapter().getInstance();
}
if (!process.env.VERCEL) {
    (async () => {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors();
        app.use((0, cookie_parser_1.default)());
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            transform: true,
            stopAtFirstError: true,
            exceptionFactory: (errors) => {
                const errorsForResponse = errors.map((e) => ({
                    message: Object.values(e.constraints)[0],
                    field: e.property,
                }));
                return new common_1.BadRequestException({ errorsMessages: errorsForResponse });
            },
        }));
        await app.listen(process.env.PORT ?? 3000);
        console.log(`🚀 Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
    })();
}
async function handler(req, res) {
    const app = await bootstrap();
    return app(req, res);
}
//# sourceMappingURL=main.js.map