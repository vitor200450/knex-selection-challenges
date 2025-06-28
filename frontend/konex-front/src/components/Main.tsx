import ProfileCard from './ProfileCard';
import Feed from './Feed';

function Main() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
            <ProfileCard />
            <Feed />
        </div>
    );
}

export default Main;
