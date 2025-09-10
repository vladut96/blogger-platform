"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
let cachedApp = null;
async function bootstrap() {
    if (!cachedApp) {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors();
        app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: false,
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
        app.useGlobalPipes(new common_1.ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: false,
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