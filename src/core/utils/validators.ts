export interface LoginErrors {
    username?: string;
    password?: string;
}

export const validateLogin = (
    username: string,
    password: string,
): { isValid: boolean; errors: LoginErrors } => {
    const errors: LoginErrors = {};

    if (!username.trim()) {
        errors.username = 'Username is required';
    } else if (username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters';
    }

    if (!password) {
        errors.password = 'Password is required';
    } else if (password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }

    return { isValid: Object.keys(errors).length === 0, errors };
};
