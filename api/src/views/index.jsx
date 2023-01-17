var React = require('react');

//registro
function DataEntryForm() {
    return (
        <div>
            
            <form action="/" method="post">
                <div>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="name"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="name"
                    />
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email"
                    />
                </div>
                <div>
                    
                </div>
                <div>
                    <input
                        type="text"
                        name="image"
                        id="image"
                        placeholder="image"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="adress"
                        id="adress"
                        placeholder="adress"
                    />
                </div>
                <input type="submit" />
            </form>
        </div>
    );
}


//listado de items
function DataList({ dataItems }) {
    return (
        <table>
            <thead>
                <th>Name</th>
                <th>Email</th>
                <th>Image</th>
                <th>Adress</th>
                <th>
                    Delete{' '}
                    {dataItems.length > 1 && <a href="/admin/delete?all=true">all</a>}
                </th>
            </thead>
            {dataItems.map((item) => {
                const id = item._id.toString();
                return (
                    <tr key={id} id={id}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.image}</td>
                        <td>{item.adress}</td>
                        <td>
                            <a href={'admin/delete?id=' + id}>Delete</a>
                        </td>
                    </tr>
                );
            })}
        </table>
    );
}

/* props = {
        data: [],
        dbStatus: false
    }
*/
function Index(props) {
    return (
        <DefaultLayout >
            {props.dbStatus === false && <div>No database found.</div>}

            {props.dbStatus === true && (
                <div>
                    <div>
                        <DataEntryForm></DataEntryForm>
                    </div>
                    {props.data.length > 0 && (
                        <div>
                            <DataList dataItems={props.data}></DataList>
                        </div>
                    )}
                </div>
            )}
        </DefaultLayout>
    );
}

function DefaultLayout(props) {
    return (
        <html>
            <body>{props.children}</body>
        </html>
    );
}

module.exports = Index;
