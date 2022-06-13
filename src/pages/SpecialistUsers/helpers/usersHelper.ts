import { BaseUser } from '../../../@types/entities/BaseUser';
import { Role } from '../../../@types/entities/Role';
import { TARIFF } from '../../../@types/entities/Tariff';

export function filterUsersByRoles(
  users: BaseUser[],
  roles: (Role | undefined)[],
) {
  if (roles.length === 1 && !roles[0]) {
    return users;
  }

  return users.filter(user => {
    const userRoles = user.roles;
    for (const userRole of userRoles) {
      if (roles.some(it => it?.name === userRole.name)) {
        return true;
      }
    }
    return false;
  });
}

export function filterUsersByTariffs(
  users: BaseUser[],
  tariffs: (TARIFF | undefined)[],
) {
  if (tariffs.length === 1 && !tariffs[0]) {
    return users;
  }

  return users.filter(user => {
    const userTariff = user.tariff;
    return tariffs.includes(userTariff);
  });
}

export function filterUsersByQuery(users: BaseUser[], q: string) {
  const query = q.toLowerCase().trim();
  return users.filter(user => {
    return (
      user.name?.toLowerCase().includes(query) ||
      user.lastname?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    );
  });
}
