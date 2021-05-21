import React, { useState } from 'react';
import { Container, InputArea, CustomButton, CustomButtonText, SignMessageButton, SignMessageButtonText, SignMessageButtonTextBold } from './styles';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import Api from '../../Api';

import BarberLogo from '../../assets/barber.svg';
import SignInput from '../../components/SignInput';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg'

export default () => {

    const navigation = useNavigation();

    const [emailField, setEmailField] = useState(''); //onde vai o email digitado pelo usuário para logar
    const [passwordField, setPasswordField] = useState(''); //onde vai a senha digitada pelo usuário para logar

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{ name: 'SignUp' }]
        });
    };
    const handleSignClick = async() => {
        if(emailField != '' && passwordField != ''){
            let res = await Api.signIn(emailField, passwordField);
            if(json.token){
                alert("Deu Certo")
            }else{
                alert("E-maile/ou senha errados!")
            }
        }else{
            alert("Preencha os campos!")
        }
    };

    return (
        <Container>
            <BarberLogo width="100%" height="160" />

            <InputArea>
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

                    <CustomButtonText>LOGIN</CustomButtonText>

                </CustomButton>

            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta ?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>

    );


}