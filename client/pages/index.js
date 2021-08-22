import buildClient from "../api/build-client";
const IndexPage = ({currentUser}) => {
    console.log('User for debug:', currentUser);
    return currentUser?<h1>Your are signed in</h1>: <h1>you are not signed in</h1>;
};

IndexPage.getInitialProps = async (context) => {
    const client = buildClient(context);
    const {data} = await client.get('/api/users/currentuser');
    return data;
};

export default IndexPage;