import { Resource, Admin } from 'react-admin';
import { DataProvider } from './DataProvider';
import { DeletionRequests } from './DeletionRequests';

function AdminBoard () {
        
    return (
        <Admin dataProvider={DataProvider}>
            <Resource name="admin" list={DeletionRequests} />
        </Admin>
    );
}

export default AdminBoard;