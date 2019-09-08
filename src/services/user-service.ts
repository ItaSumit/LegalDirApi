import {inject} from '@loopback/context';
import {HttpErrors} from '@loopback/rest';

import {UserService, UserProfile} from '@loopback/authentication';
import {createUserProfile} from './helper';
import {UserServiceBindings} from '../keys';
import {Credentials} from '../repositories';
import {User} from '../models/user.model';
import {UserRepository} from '../repositories/user.repository';

export class MyUserService implements UserService<User, Credentials> {
  constructor(
    @inject(UserServiceBindings.USER_REPO)
    private userRepository: UserRepository,
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<User> {
    if (!credentials) {
      throw new HttpErrors.Unauthorized(`'credentials' is null`);
    }

    if (!credentials.email) {
      throw new HttpErrors.Unauthorized(`'credentials.username' is null`);
    }

    if (!credentials.password) {
      throw new HttpErrors.Unauthorized(`'credentials.password' is null`);
    }

    const foundUser = await this.userRepository.findOne({
      where: {email: credentials.email},
    });
    if (!foundUser) {
      throw new HttpErrors['Unauthorized'](
        `User with username ${credentials.email} not found.`,
      );
    }

    if (credentials.password !== foundUser.password) {
      throw new HttpErrors.Unauthorized('The password is not correct.');
    }

    return foundUser;
  }

  convertToUserProfile(user: User): UserProfile {
    if (!user) {
      throw new HttpErrors.Unauthorized(`'user' is null`);
    }

    if (!user.id) {
      throw new HttpErrors.Unauthorized(`'user id' is null`);
    }

    return createUserProfile(user);
  }
}
