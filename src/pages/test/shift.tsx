import React, { useState } from 'react';
import './shift.css';
// Define the Staff and Shift interfaces
interface Staff {
    id: number;
    name: string;
}

interface Shift {
    staffId: number;
    staffName: string;
    date: string;
    startTime: string;
    endTime: string;
}

const initialStaffList: Staff[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Michael Johnson' },
];

export default function ShiftScheduler(): JSX.Element {
    const [staffList] = useState<Staff[]>(initialStaffList);
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [selectedStaff, setSelectedStaff] = useState<number | null>(null);
    const [date, setDate] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleScheduleShift = () => {
        // Validate the inputs
        if (!selectedStaff || !date || !startTime || !endTime) {
            setError('Please fill out all fields.');
            return;
        }

        if (new Date(`${date}T${startTime}`) >= new Date(`${date}T${endTime}`)) {
            setError('End time must be after the start time.');
            return;
        }

        const staff = staffList.find((s) => s.id === selectedStaff);
        if (!staff) return;

        const newShift: Shift = {
            staffId: staff.id,
            staffName: staff.name,
            date,
            startTime,
            endTime,
        };

        setShifts([...shifts, newShift]);
        clearForm();
    };

    const clearForm = () => {
        setSelectedStaff(null);
        setDate('');
        setStartTime('');
        setEndTime('');
        setError(null);
    };

    return (
        <div className="shift-scheduler">
            <h1>Schedule Staff Shifts</h1>

            <div className="schedule-form">
                <h2>Schedule a New Shift</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleScheduleShift();
                    }}
                >
                    <div>
                        <label>Staff Member</label>
                        <select
                            value={selectedStaff || ''}
                            onChange={(e) => setSelectedStaff(Number(e.target.value))}
                        >
                            <option value="" disabled>
                                Select Staff
                            </option>
                            {staffList.map((staff) => (
                                <option key={staff.id} value={staff.id}>
                                    {staff.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Start Time</label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>End Time</label>
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                        />
                    </div>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <button type="submit">Schedule Shift</button>
                </form>
            </div>

            <div className="scheduled-shifts">
                <h2>Scheduled Shifts</h2>
                {shifts.length === 0 ? (
                    <p>No shifts scheduled yet.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Staff Member</th>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shifts.map((shift, index) => (
                                <tr key={index}>
                                    <td>{shift.staffName}</td>
                                    <td>{shift.date}</td>
                                    <td>{shift.startTime}</td>
                                    <td>{shift.endTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
