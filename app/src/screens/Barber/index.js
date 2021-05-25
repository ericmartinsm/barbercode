import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import Swiper from 'react-native-swiper';
import Stars from '../../components/Stars';
import FavoriteIcon from '../../assets/favorite.svg';
import BackIcon from '../../assets/back.svg'

import { useNavigation, useRoute } from '@react-navigation/native'
import {
    Container,
    Scroller,
    FakeSwiper,
    PageBody,
    UserInfoArea,
    ServiceArea,
    TestimonialArea,
    SwipeDot,
    SwipeDotActive,
    SwipeItem,
    SwipeImage,
    UserAvatar,
    UserInfo,
    UserInfoName,
    UserFavButton,
    BackButton,
    

} from './styles';

import Api from '../../Api';

export default () => {

    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({

        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars,
    });

    const [loading, setLoading] = useState(false);


    useEffect(() => { //hooks, assim que entrar na tela vai executar
        const getBarberInfo = async () => {
            setLoading(true);
            let json = await Api.getBarber(userInfo.id);
            if (json.error == '') {
                setUserInfo(json.data);
            } else {
                alert('error:' + json.error)
            }
            setLoading(false);
        }
        getBarberInfo();
    }, [])

    const handleBackButton = () =>{
        
    }

    return (
        <Container>
            <Scroller>
                {userInfo.photos && userInfo.photos.length > 0 ?
                    <Swiper 
                    
                    style={{height:240}}
                    dot={<SwipeDot/>}
                    activeDot={<SwipeDotActive/>}
                    paginationStyle={{top:15, right: 15,Bottom: null, left: null}}
                    autoplay={true} //vai rocar de foto automaticamente
                    >
                        {userInfo.photos.map((item, key)=>(
                            <SwipeItem key={key}>
                                <SwipeImage source={{uri:item.url}} resizeMode="cover" />
                            </SwipeItem>

                        ))}
                    </Swiper>
                    :
                    <FakeSwiper></FakeSwiper>
                }
                <PageBody>
                    <UserInfoArea>
                        <UserAvatar source={{uri:userInfo.avatar}}/>
                        <UserInfo>
                            <UserInfoName>{userInfo.name}</UserInfoName>
                            <Stars stars={userInfo.stars} showNumber={true}/>
                        </UserInfo>
                        <UserFavButton>
                            <FavoriteIcon width="24" height="24" fill="#ff0000"/>
                        </UserFavButton>
                    </UserInfoArea>
                    <ServiceArea>

                    </ServiceArea>
                    <TestimonialArea>

                    </TestimonialArea>
                </PageBody>

            </Scroller>
            <BackButton onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFFFFF">

                </BackIcon>
            </BackButton>
        </Container>
    )
}