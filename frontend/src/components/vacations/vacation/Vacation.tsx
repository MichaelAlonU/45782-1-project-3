import { useEffect, useState } from 'react';
import './Vacation.css';
import Spinner from '../../common/spinner/Spinner';
import useTitle from '../../../hooks/use-title';
import { useAppDispatcher, useAppSelector } from '../../../redux/hooks';
import { init } from '../../../redux/vacationSlice';
import VacationService from '../../../services/auth-aware/VacationService';
import { RootState } from '../../../redux/store';
import VacationCard from '../VacationCard/VacationCard';
import { useService } from '../../../hooks/use-service';

export default function Vacations() {
    useTitle('Vacations R Us');

    const vacationService = useService(VacationService);
    const vacations = useAppSelector((state: RootState) => state.vacations.vacations);
    const isAdmin = useAppSelector((state: RootState) => state.auth.user.isAdmin);
    const dispatch = useAppDispatcher();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        (async () => {
            try {
                if (vacations.length === 0) {
                    const vacationFromServer = await vacationService.getAll();
                    dispatch(init(vacationFromServer));
                }
            } catch (e) {
                alert(e);
            }
        })();
    }, [dispatch, vacations.length, vacationService]);

    // מיון לפי startTime עולה
    const sortedVacations = [...vacations].sort(
        (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );

    // pagination slice
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const paginatedVacations = sortedVacations.slice(startIdx, endIdx);
    const totalPages = Math.ceil(sortedVacations.length / itemsPerPage);

    return (
        <div className='Vacations'>
            {vacations.length > 0 ? (
                <>
                    {paginatedVacations.map(vac => (
                        <VacationCard
                            key={vac.id}
                            vacation={vac}
                            isEditAllowed={isAdmin}
                            isDeleteAllowed={isAdmin}
                            isLikeAllowed={!isAdmin}
                        />
                    ))}

                    {/* Pagination Controls */}
                    <div className="pagination">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>
                        <span>{currentPage} / {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <p>Loading vacations...</p>
                    <Spinner />
                </>
            )}
        </div>
    );
}
