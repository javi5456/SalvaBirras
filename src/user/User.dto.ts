import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 20, { message: 'El nombre no puede tener más de 20 caracteres.' })
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'La contraseña debe tener un mínimo de 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula y un número.',
  })
  password: string;
}
