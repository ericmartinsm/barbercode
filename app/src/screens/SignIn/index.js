import React, { useState , useContext} from 'react';
import { Container, InputArea, CustomButton, CustomButtonText, SignMessageButton, SignMessageButtonText, SignMessageButtonTextBold } from './styles';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { UserContext} from '../../contexts/UserContext'

import Api from '../../Api';

import BarberLogo from '../../assets/barber.svg';
import SignInput from '../../components/SignInput';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg'

export default () => {
    const { dispatch: userDispatch } = useContext(UserContext) // vai mandar as info para o context
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState(''); //onde vai o email digitado pelo usuário para logar
    const [passwordField, setPasswordField] = useState(''); //onde vai a senha digitada pelo usuário para logar

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{ name: 'SignUp' }]
        });
    };
    const handleSignClick = async () => {
        // console.log("email", emailField)
        // console.log("passawor", passwordField)
        if (emailField != '' && passwordField != '') {
            let json = await Api.signIn(emailField, passwordField);
            console.log('AAAAAAAAAAAAAAAAAAAAAAAA',json)
            if (json.token) {
                await AsyncStorage.setItem('token',json.token); //vai armazenar o toekn do usuário
                userDispatch({
                    type: 'setAvatar',
                    payload:{
                        avatar: json.data.avatar
                    }
                });

                navigation.reset({
                    routes:[{name:'MainTab'}]
                });
            } else {
                alert("E-mail e/ou senha errados!")
            }
        } else {
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