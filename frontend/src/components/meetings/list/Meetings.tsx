import { useEffect, useState } from 'react'
import './Meetings.css'
import TeamsService from '../../../services/teams'
import MeetingsService from '../../../services/meetings'
import { Team } from '../../../models/Teams'
import { Meet } from '../../../models/Meet'

export default function Meetings() {
    const [teams, setTeams] = useState<Team[]>([])
    const [selectedTeam, setSelectedTeam] = useState<string>('')
    const [meetings, setMeetings] = useState<Meet[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchTeams() {
            try {
                const t = await TeamsService.getAll()
                setTeams(t)
            } catch (e) {
                console.error(e)
            }
        }
        fetchTeams()
    }, [])

    useEffect(() => {
        if (!selectedTeam) {
            setMeetings([])
            return
        }

        setLoading(true)
        async function fetchMeetings() {
            try {
                const m = await MeetingsService.getByTeamsId(selectedTeam)
                setMeetings(m)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        fetchMeetings()
    }, [selectedTeam])

    return (
        <div className='Meetings'>
            <h2>Meetings</h2>

            <div className='controls'>
                <label htmlFor='team-select'>Choose a team</label>
                <select id='team-select' value={selectedTeam} onChange={e => setSelectedTeam(e.target.value)}>
                    <option value=''>-- choose a team --</option>
                    {teams.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                </select>
            </div>

            {loading && <p>Loading meetings...</p>}

            <div className='cards'>
                {meetings.length === 0 && !loading && <p>No meetings found for this team.</p>}
                {meetings.map(m => (
                    <div className='card' key={m.id}>
                        <div className='card-header'>
                            <strong>{m.meetRoom}</strong>
                            <span className='datetime'>{new Date(m.startTime).toLocaleString()} - {new Date(m.endTime).toLocaleString()}</span>
                        </div>
                        <div className='card-body'>
                            <p>{m.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}