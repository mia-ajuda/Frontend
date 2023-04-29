import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { UserContext } from '../../../store/contexts/userContext';
import { Input } from '../../atoms/Input';
import { Formik, useFormik } from 'formik';
import { initialValues, schema } from './constructor';
import Button from '../../UI/button';

export const PersonalDataForm = ({ submissionFunction }) => {
    const { user, isEntity } = useContext(UserContext);

    const identifier = isEntity ? 'CNPJ' : 'CPF';

    const handleOnSubmit = (values) => {
        const submissionData = {
            ...values,
            [identifier]: values.id,
        };
        submissionFunction(submissionData);
    };

    const { handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues: initialValues(user),
        validationSchema: schema(identifier),
        onSubmit: handleOnSubmit,
    });
    return (
        <View>
            <Input
                label={'Nome Completo'}
                placeholder={'Digite seu nome'}
                value={values.name}
                setValue={handleChange('name')}
                error={errors.name && touched.name}
                errorMessage={errors.name}
            />
            <Input
                label={'Data de Nascimento'}
                placeholder={'Digite sua data de nascimento'}
                mask={'datetime'}
                value={values.birthday}
                setValue={handleChange('birthday')}
                error={errors.birthday && touched.birthday}
                errorMessage={errors.birthday}
            />
            <Input
                label={'Telefone'}
                placeholder={'Digite seu telefone'}
                mask={'cel-phone'}
                value={values.phone}
                setValue={handleChange('phone')}
                error={errors.phone && touched.phone}
                errorMessage={errors.phone}
            />
            <Input
                label={identifier}
                placeholder={`Digite seu ${identifier}`}
                mask={identifier.toLocaleLowerCase()}
                value={values.id}
                setValue={handleChange('id')}
                disabled={user?.cpf || user?.cnpj}
                error={errors.id && touched.id}
                errorMessage={errors.id}
            />
            <Button type={'submit'} press={handleSubmit} title={'Salvar'} />
        </View>
    );
};
