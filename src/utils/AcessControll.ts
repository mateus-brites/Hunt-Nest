import { IJwt } from '@modules/login/types/IJwt';
import { UserModel } from '@modules/user/user';
import jwtDecode from 'jwt-decode';

export async function AcessControll(token: string, type: string) {
  const jwt = jwtDecode(token) as IJwt;
  console.log(jwt.sub);

  const user = await UserModel.findById({ _id: jwt.sub });

  console.log(user, type);
  if (user.type === type) {
    console.log('true');
    return true;
  } else {
    console.log('false');
    return false;
  }
}
