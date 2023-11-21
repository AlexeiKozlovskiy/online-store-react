import { API_ROUTES } from '@/helpers/constant';
import { commonError } from '@/helpers/helpersFunc';
import { UserProfile, UserProfileResp } from '@/types/types';
import axios from 'axios';

export async function createProfile(formPayment: UserProfile, id: string) {
  try {
    await axios({
      method: 'POST',
      url: API_ROUTES.PROFILE_CREATE,
      data: { ...formPayment, userId: id },
    });
    return { error: null, data: null };
  } catch (err) {
    return commonError(err);
  }
}

export async function getProfile(accessToken: string, idUser: string) {
  try {
    const response: UserProfileResp = await axios({
      method: 'GET',
      url: API_ROUTES.PROFILE + idUser,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return { error: null, data: response.data };
  } catch (err) {
    return commonError(err);
  }
}

export async function updateProfile(formPayment: UserProfile, id: string) {
  try {
    await axios({
      method: 'PUT',
      url: API_ROUTES.PROFILE_UPDATE,
      data: { ...formPayment, userId: id },
    });
    return { error: null, data: null };
  } catch (err) {
    return commonError(err);
  }
}
