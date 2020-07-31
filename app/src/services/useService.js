import { alertError, alertMessageEmailVerification } from '../utils/Alert';

export default async function useService(service, functionName, params = []) {
    try {
        let functionReturn = await service[functionName](...params);
        return functionReturn;
    } catch (error) {
        console.log(error);
        if (error.code == 'auth/email-not-verified') {
            alertMessageEmailVerification(error.message);
        } else {
            alertError(error);
        }
        return { error: true };
    }
}
