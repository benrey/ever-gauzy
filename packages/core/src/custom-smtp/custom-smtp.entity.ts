import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ICustomSmtp } from '@gauzy/contracts';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
import { ISMTPConfig } from '@gauzy/common';

@Entity('custom_smtp')
export class CustomSmtp
	extends TenantOrganizationBaseEntity
	implements ICustomSmtp {
	@ApiProperty({ type: () => String })
	@Column()
	host: string;

	@ApiProperty({ type: () => Number })
	@Column()
	port: number;

	@ApiProperty({ type: () => Boolean })
	@Column()
	secure: boolean;

	@ApiProperty({ type: () => String })
	@IsNotEmpty()
	@Exclude({ toPlainOnly: true })
	@Column()
	username: string;

	@ApiProperty({ type: () => String })
	@IsNotEmpty()
	@Exclude({ toPlainOnly: true })
	@Column()
	password: string;

	@ApiProperty({ type: () => Boolean, default: false })
	@Column({ default: false })
	isValidate?: boolean;

	getSmtpTransporter?() {
		return {
			host: this.host,
			port: this.port,
			secure: this.secure || false, // true for 465, false for other ports
			auth: {
				user: this.username,
				pass: this.password
			}
		} as ISMTPConfig
	}
}
