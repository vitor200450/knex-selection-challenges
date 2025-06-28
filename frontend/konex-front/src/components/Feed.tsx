import CreatePost from './CreatePost';
import PostContainer from './PostContainer';

function Feed() {
    return (
        <div className="flex-1">
            <CreatePost />
            <PostContainer />
        </div>
    );
}

export default Feed;
