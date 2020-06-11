import React, {useState ,useEffect} from 'react';
import {View,FlatList} from 'react-native';
import {Post, Header, Avatar, Name, PostImage, Description, Loading} from './styles';

interface Feed {
    author:{
        avatar:string;
        name:string;
    };
    aspectRatio:string;
    image:string;
    description:string;

}

const Feed: React.FC = () => {
    const [feed,setFeed] = useState<Feed[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    async function loadPage(pageNumber = page, shouldRefresh = false){
            if(total && pageNumber>total) return;

            setLoading(true);

            const response = await fetch(`http://localhost:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`)

            const data = await response.json();
            const totalItems = response.headers.get('X-Total-Count');

            if(totalItems){
                setTotal(Math.floor(Number(totalItems) / 5));
            }
            setLoading(false);
            setFeed(shouldRefresh ? data : [...feed,...data]);
            setPage(pageNumber + 1);
            
        }

    useEffect(() => {
        loadPage()
    }, [])

    async function refreshList(){
        setRefreshing(true);

        await loadPage(1,true);

        setRefreshing(false);
    }

    return (
        <View>
            <FlatList
                data={feed}
                keyExtractor={(post:any) => String(post.id)}
                onEndReached={() => loadPage()}
                onEndReachedThreshold={0.1}
                ListFooterComponent={loading && (<Loading />)}
                onRefresh={refreshList}
                refreshing={refreshing}
                renderItem={({item}) => (
                    <Post>
                        <Header>
                            <Avatar source={{uri: item.author.avatar}} />
                            <Name>{item.author.name}</Name>
                        </Header>
                        <PostImage ratio={item.aspectRatio} source={{uri: item.image}} />
                        <Description>
                            <Name>{item.author.name}</Name> {item.description}
                        </Description>
                    </Post>
                )}
            />
        </View>
    )
}

export default Feed;