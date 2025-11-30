import useAdminGuard from '../../../hooks/use-isAdmin'
import './Reports.css'
import useTitle from '../../../hooks/use-title';

export default function Admin() {

    useAdminGuard();
    useTitle('Admin reports panel');

    return (
        <div className='Reports'>
            <h2> Vacations Reports </h2>

            <h1> reports coming soon.... </h1>


        </div>
    )
}