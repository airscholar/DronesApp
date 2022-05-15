import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/User.entity';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async register(user: User): Promise<User> {
    return await this.save(user);
  }
}
