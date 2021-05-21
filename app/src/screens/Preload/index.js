import React, { useEffect } from 'react';
import { Container, LoadingIcon } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native'


import BarberLogo from '../../assets/barber.svg';



export default () => {

    const navigation = useNavigation();

    useEffect(() => {
        const checkTocken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                //validar token

            } else {
                navigation.navigate('SignIn')
            }
        }
        checkTocken();

    }, []);

    return (
        <Container>
            <BarberLogo width="100%" height="160" />
            <LoadingIcon size="large" color="#ffffff" />
        </Container>

    );


}