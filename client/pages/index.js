import buildClient from "../api/build-client";
import Link from 'next/link';

const IndexPage = ({currentUser}) => {
    console.log('User for debug:', currentUser);
    return currentUser? (
        <div>
            <h1>Your are signed in</h1>
            <Link href='url/list'>
            <a className="nav-link">Add URL</a>
            </Link>
        </div>
    ) : (
        <h1>you are not signed in</h1>
    )
};

IndexPage.getInitialProps = async (context) => {
    const client = buildClient(context);
    const {data} = await client.get('/api/users/currentuser');
    return data;
};

export default IndexPage;