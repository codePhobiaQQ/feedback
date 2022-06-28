import {
  Body,
  Controller,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto, TakeMessageDto } from './dto/message.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post('/')
  // @UseGuards(JwtAuthGuard)
  create(@Body() dto: TakeMessageDto, @Req() req: Request) {
    // @ts-ignore
    const message = new MessageDto(Object.assign({ userId: req.user.id }, dto));
    return this.messageService.create(message);
  }
}
