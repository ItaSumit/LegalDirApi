import { Application } from '@loopback/core';
import { RestComponent } from '@loopback/rest';
import { UserProfile } from '@loopback/authentication'


import { User } from '../models/user.model';


export function createUserProfile(user: User): UserProfile {
  const userProfile: UserProfile = { id: '', email: user.email };

  if (user.id) {
    userProfile.id = user.id.toString();
  }


  userProfile.name = `${user.firstname} ${user.lastname}`;

  return userProfile;
}
