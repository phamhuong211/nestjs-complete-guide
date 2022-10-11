import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { createMessageDto } from './dtos/create-message.dto';
import { MesssageService } from './messages.service';

@Controller('messages')
export class MessagesController {
    messagesService: MesssageService;
    constructor() {
        //DON'T DO THIS ON REAL APP
        //USE DEPENEDENCY INJECTION
        this.messagesService = new MesssageService();
    }
    @Get()
    listMessages() {
        return this.messagesService.findAll();
    }

    @Post()
    createMessage(@Body() body: createMessageDto) {
        return this.messagesService.create(body.content)
    }

    @Get(':id')
    async getMessage(@Param("id") id: string) {
        const message = await this.messagesService.findOne(id);
        if (!message) {
            throw new NotFoundException("message not found")
        }

        return message;
    }
}