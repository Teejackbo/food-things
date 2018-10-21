import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const RequireAuth = () => UseGuards(AuthGuard('bearer'));
