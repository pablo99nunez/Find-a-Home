var React = require('react');

function Home() {
    return (
        <DefaultLayout >
            <div>
                <h1>HEY</h1>
            </div>
        </DefaultLayout>
    );
}

function DefaultLayout() {
    return (
        <html>
            <body>
                <h1>Home</h1>
                <a href="/login">login</a> <br />
                <a href="/logout">logout</a><br />
                <hr />
                <a href="/admin/manage">Admin panel</a> <br />
                <a href="/user/role">Check your user in db</a> <br />
                <a href="/user/profile">Check your auth0 info</a> <br />
                <a href="/any">Login not needed here</a> <br />

            </body>
        </html>
    );
}

module.exports = Home;
