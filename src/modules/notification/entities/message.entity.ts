import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm'

@Entity({name: 'messages'})
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    topic: string 

    @Column()
    body: string

    @Column()
    title: string

    @Column()
    author: string

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date
}