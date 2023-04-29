import React, { useContext } from 'react';
import { View } from 'react-native';
import { UserContext } from '../../../store/contexts/userContext';
import { Input } from '../../atoms/Input';
import { useFormik } from 'formik';
import { initialValues, schema } from './constructor';
import Button from '../../UI/button';
import { CepContext } from '../../../store/contexts/cepContext';
import { LoadingContext } from '../../../store/contexts/loadingContext';

export const AddressForm = ({ submissionFunction }) => {
    const { user } = useContext(UserContext);
    const { getCepInformation } = useContext(CepContext);
    const { setIsLoading } = useContext(LoadingContext);

    const handleOnSubmit = (values) => {
        const submissionData = {
            ...values,
        };
        submissionFunction(submissionData);
    };

    const {
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
    } = useFormik({
        initialValues: initialValues(user?.address),
        validationSchema: schema,
        onSubmit: handleOnSubmit,
    });

    const handleCepChange = async (newCep) => {
        if (newCep.length == 8) {
            setIsLoading(true);
            const cepInfo = await getCepInformation(newCep);
            setIsLoading(false);
            if (cepInfo.error) {
                return;
            }
            setFieldValue('city', cepInfo.localidade);
            setFieldValue(
                'complement',
                `${cepInfo.logradouro} / ${cepInfo.bairro}`,
            );
            setFieldValue('state', cepInfo.uf);
        }
    };

    const onCepChange = (newCep, handleChange) => {
        handleChange(newCep);
        handleCepChange(newCep);
    };

    return (
        <View>
            <Input
                label={'CEP'}
                placeholder={'Digite seu CEP'}
                value={values.cep}
                setValue={(newValue) =>
                    onCepChange(newValue, handleChange('cep'))
                }
                error={errors.cep && touched.cep}
                errorMessage={errors.cep}
            />
            <Input
                label={'Cidade'}
                placeholder={'Digite sua cidade'}
                value={values.city}
                setValue={handleChange('city')}
                error={errors.city && touched.city}
                errorMessage={errors.city}
            />
            <View className="flex-row w-full justify-between">
                <Input
                    className={'basis-2/5'}
                    label={'Estado'}
                    placeholder={'Digite seu estado'}
                    value={values.state}
                    setValue={handleChange('state')}
                    error={errors.state && touched.state}
                    errorMessage={errors.state}
                />
                <Input
                    className={'basis-1/2'}
                    type={'numeric'}
                    label={'Número'}
                    placeholder={'Número da sua casa'}
                    value={values.number}
                    setValue={handleChange('number')}
                    error={errors.number && touched.number}
                    errorMessage={errors.number}
                />
            </View>
            <Input
                label={'Complemento'}
                placeholder={'Digite seu complemento'}
                value={values.complement}
                setValue={handleChange('complement')}
                error={errors.complement && touched.complement}
                errorMessage={errors.complement}
            />
            <Button type={'submit'} press={handleSubmit} title={'Salvar'} />
        </View>
    );
};
