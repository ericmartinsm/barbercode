import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import Api from '../../Api'
import { Platform, RefreshControl } from 'react-native'; //usado para verificar qual plataforma esta rodando, IOS ou Android

import {
    Container,
    Scroller,

    HeaderArea,
    HeaderTitle,
    SearchButton,

    LocationArea,
    LocationInput,
    LocationFinder,

    LoadingIcon,
    ListArea,

} from './styles';

import MylocationIcon from '../../assets/my_location.svg';
import SearchIcon from '../../assets/search.svg';
import BarberItem  from '../../components/BarberItem';


export default () => {

    const navigation = useNavigation(); //vai passar Search como router
    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const handleLocationFinder = async () => {
        setCoords(null);
        let result = await request(
            Platform.OS === 'ios' ?
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                :
                PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
        );

        if (result == 'granted') { //será granted caso o usuário aceitar a permission de geolocation

            setLoading(true);
            setLocationText('');
            setList([]);

            Geolocation.getCurrentPosition((info) => {
                setCoords(info.coords);
                getBarbers(); //func q vai pegar a lista de barbeiros
            })
        }
    };

    const handleLocationSearch = () => {
        setCoords({});
        getBarbers();
    };

    const getBarbers = async () => {
        setLoading(true);
        setList([]);

        let lat = null;
        let lng = null;
        if(coords){
            lat = coords.latitude;
            lng = coords.longitude;
        }

        let res = await Api.getBarbers(lat, lng, locationText);
            console.log(res)
        if(res.error == ''){
            if(res.loc){ //loc = location 

                setLocationText(res.loc); //
            }
            setList(res.data);
        }else{
            alert("Error:"+ res.error);
        }
        setLoading(false);
    };

    useEffect(()=>{
        getBarbers();
        // quando iniciar a home irá executar a função getBarbers
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        getBarbers();
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

            }>
                <HeaderArea>
                    <HeaderTitle numberOfLine={2}>
                        Encontre o seu barbeiro favorito
                    </HeaderTitle>
                    <SearchButton onPress={() => navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#ffffff" />
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput
                        placeholder="Onde você está ?"
                        placeholderTextColor="#ffffff"
                        value={locationText}
                        onChangeText={t => setLocationText(t)}
                        onEndEditing={handleLocationSearch}
                    >

                    </LocationInput>
                    <LocationFinder onPress={handleLocationFinder}>
                        <MylocationIcon width="24" height="24" fill="#ffffff"></MylocationIcon>
                    </LocationFinder>
                </LocationArea>
                {loading && 
                    <LoadingIcon size="large" color="#ffffff" /> //só vai aparecer caso loading for (true)
                }
                <ListArea>
                    {list.map((item, k)=>(
                        <BarberItem key={k} data={item} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    )
}