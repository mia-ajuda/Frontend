export default function verifyUserInfo(user) {
    if (user.cnpj) {
        console.log({ ...user, photo: '' });
        return !!user.photo && !!user.address;
    } else {
        return 'hmm';
    }
}
