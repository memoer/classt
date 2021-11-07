import { AuthGuard } from '../guard/auth.guard';

export class GetUserArgs {
  id: number;
  type: keyof typeof AuthGuard.TYPE;
}
