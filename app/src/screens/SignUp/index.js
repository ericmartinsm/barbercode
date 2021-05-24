import React, { useState, useContext } from 'react';
import { Container, InputArea, CustomButton, CustomButtonText, SignMessageButton, SignMessageButtonText, SignMessageButtonTextBold } from './styles';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContext'

import BarberLogo from '../../assets/barber.svg';
import SignInput from '../../components/SignInput';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg'
import PersonIcon from '../../assets/person.svg'
import Api from '../../Api';

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext)
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState(''); //onde vai o email digitado pelo usuário para logar
    const [passwordField, setPasswordField] = useState(''); //onde vai a senha digitada pelo usuário para logar
    const [nameField, setNameField] = useState('')

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{ name: 'SignIn' }]
        });
    };
    const handleSignClick = async () => {
        if (nameField != '' && emailField != '' && passwordField != '') {
            let res = await Api.signUp(nameField, emailField, passwordField);
            if (res.token) {
                await AsyncStorage.setItem('token', res.token); //vai armazenar o toekn do usuário
                userDispatch({
                    type: 'setAvatar',
                    payload: {
                        avatar: res.data.avatar
                    }
                });

                navigation.reset({
                    routes: [{ name: 'MainTab' }]
                });
            } else {
                alert("Erro:" + res.error)
            }
        } else {
            alert("Preencha os campos");
        }
    };

    return (
        <Container>
            <BarberLogo width="100%" height="160" />

            <InputArea>

                <SignInput
                    IconSvg={PersonIcon}
                    placeholder="Digite seu e-mail"
                    value={nameField}
                    onChangeText={t => setNameField(t)}//mandar o e-mail para o state
                />
                <SignInput
                    IconSvg={EmailIcon}
                    placeholder="Digite seu e-mail"
                    value={emailField}
                    onChangeText={t => setEmailField(t)}//mandar o e-mail para o state
                />

                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={t => setPasswordField(t)}
                    password={true}
                />

                <CustomButton onPress={handleSignClick}>

                    <CustomButtonText>CADASTRAR</CustomButtonText>

                </CustomButton>

            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Já possui uma conta ?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>

    );


}