import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { UserContext } from '../../../store/contexts/userContext';
import { Input } from '../../atoms/Input';
import parseDate from '../../../utils/parseDate';

export const PersonalDataForm = () => {
    const { user, isEntity } = useContext(UserContext);
    const [name, setName] = useState(user?.name || '');
    const [birthday, setBirthday] = useState(parseDate(user?.birthday) || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [id, setId] = useState(user?.cpf || user?.cnpj || '');

    const identifier = isEntity ? 'cnpj' : 'cpf';

    return (
        <View>
            <Input
                label={'Nome Completo'}
                placeholder={'Digite seu nome'}
                value={name}
                setValue={setName}
            />
            <Input
                label={'Data de Nascimento'}
                placeholder={'Digite sua data de nascimento'}
                value={birthday}
                setValue={setBirthday}
                mask={'datetime'}
            />
            <Input
                label={'Telefone'}
                placeholder={'Digite seu telefone'}
                value={phone}
                setValue={setPhone}
                mask={'cel-phone'}
            />
            <Input
                label={identifier.toUpperCase()}
                placeholder={`Digite seu ${identifier.toUpperCase()}`}
                value={id}
                setValue={setId}
                mask={identifier}
                disabled={user?.cpf || user?.cnpj}
            />
        </View>
    );
};
