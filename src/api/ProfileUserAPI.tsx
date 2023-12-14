import { API_ROUTES } from '@/helpers/constant';
import { Profile, UserProfileResp } from '@/types/types';
import axios from 'axios';

export async function createProfile(formPayment: Profile, id: string) {
  await axios({
    method: 'POST',
    url: API_ROUTES.PROFILE_CREATE,
    data: { ...formPayment, userId: id },
  });
}

export async function getProfile(accessToken: string | null, idUser: string | null) {
  const response: UserProfileResp = await axios({
    method: 'GET',
    url: API_ROUTES.PROFILE + idUser,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

export async function updateProfile(formPayment: Profile, id: string) {
  await axios({
    method: 'PUT',
    url: API_ROUTES.PROFILE_UPDATE,
    data: { ...formPayment, userId: id },
  });
}
