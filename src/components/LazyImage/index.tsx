import React ,{useState, useEffect}from 'react';
import {Animated} from 'react-native';
import {Small,Original} from './styles';

const OriginalAnimated = Animated.createAnimatedComponent(Original);

interface Props {
    smallSource:{uri:string};
    source:{uri:string};
    aspecRatio:string;
}

const LazyImage = ({smallSource, source, aspecRatio}: Props) => {
    const opacity = new Animated.Value(0);
    const [loaded,setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true)
        }, 1000);
    },[])
    
    function handleAnimate(){
        Animated.timing(opacity,{
            toValue:1,
            duration:500,
            useNativeDriver:true
        }).start();
    }

    return (
        <Small source={smallSource} ratio={aspecRatio} resizeMode="contain" blurRadius={2}>
            {loaded && <OriginalAnimated style={{opacity}} source={source} ratio={aspecRatio} resizeMode="contain" onLoadEnd={handleAnimate} />}
        </Small>
    )
}
export default LazyImage;