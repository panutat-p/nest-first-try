import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { accessToken } from "./access-token.interface";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post("/login")
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<accessToken> {
    return this.authService.signIn(authCredentialsDto);
  }
}
