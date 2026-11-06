import { checkNetworkConnection, loginUser } from '../../data/authRepository';
import { LoginApiResponse, LoginCredentials } from '../types';

export const checkConnectionUseCase = async (): Promise<boolean> => {
    return checkNetworkConnection();
};

export const loginUserUseCase = async (credentials: LoginCredentials): Promise<LoginApiResponse> => {
    return loginUser(credentials);
};
