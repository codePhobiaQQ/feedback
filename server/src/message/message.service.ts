import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './message.model';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message) private messageRepository: typeof Message,
  ) {}

  async create(dto: MessageDto) {
    return this.messageRepository.create(dto);
  }
}
