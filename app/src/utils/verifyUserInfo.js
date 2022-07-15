export default function verifyUserInfo(user) {
    return !!user.photo && !!user.address;
}
