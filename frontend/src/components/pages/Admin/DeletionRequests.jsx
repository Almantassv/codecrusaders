import { List, Datagrid, TextField } from 'react-admin';
import useFetch from '../../../services/useFetch';
import ProjectList from '../projectsDashboard/ProjectList';

export function DeletionRequests() {
    const { data: project, error, isPending } = useFetch('http://localhost:8080/api/projects');

    if (isPending) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <List>
            <Datagrid rowClick="edit">
                {/* Assuming ProjectList returns an array of project objects */}
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="description" />
                <TextField source="status" />
                {/* You can add more TextField components for other project fields */}
            </Datagrid>
        </List>
    );
};
