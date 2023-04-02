import { Image, Text, View } from 'react-native';
import Button from '../../UI/button';
import { styles } from './styles';

export const UserListItem = ({ user }) => {
    console.log({ ...user, photo: 123 });
    const buttonInfo = {
        action: user.isFollowing
            ? console.log('seguindo')
            : console.log('seguir'),
        text: user.isFollowing ? 'Seguindo' : 'Seguir',
    };
    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: `data:image/png;base64,${user.photo}`,
                }}
                style={styles.image}
            />
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.username}</Text>
            </View>
            <Button title={buttonInfo.text} />
        </View>
    );
};
