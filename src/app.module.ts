import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CategorysModule } from './categorys/categorys.module';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './config/prisma.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { ImageModule } from './image/image.module';
import { DeliveringModule } from './delivering/delivering.module';
import { TestMiddleware } from './middlewares/test';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '5day' },
    }),

    CategorysModule,

    ProductModule,

    UserModule,

    CartModule,

    OrderModule,

    ImageModule,

    DeliveringModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, PrismaService],
})
export class AppModule implements NestModule {
  configure(cunsumer: MiddlewareConsumer) {
    cunsumer
      .apply(TestMiddleware)
      .forRoutes({ path: '/', method: RequestMethod.ALL });
  }
}
