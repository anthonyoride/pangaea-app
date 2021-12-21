import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm'

@Entity({name: 'subscriptions'})
export class Subscription {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    topic: string 

    @Column()
    url: string

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date
}