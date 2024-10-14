import React, { useState } from 'react';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';

// Define the Staff and Shift interfaces
interface Staff {
    id: number;
    name: string;
}

interface Shift {
    staffId: number;
    staffName: string;
    start: Date;
    end: Date;
    title: string; // Will be used for event title
}

// Set the localizer to moment.js for date/time handling
const localizer = momentLocalizer(moment);


const initialStaffList: Staff[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Michael Johnson' },
];

export default function ShiftSchedulerCalendar(): JSX.Element {
    const [staffList] = useState<Staff[]>(initialStaffList);
    const [shifts, setShifts] = useState<Shift[]>([]);

    const [selectedStaff, setSelectedStaff] = useState<number | null>(null);
    const [date, setDate] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    // Handle scheduling shift and add it to the shifts array
    const handleScheduleShift = () => {
        if (!selectedStaff || !date || !startTime || !endTime) {
            setError('Please fill out all fields.');
            return;
        }

        const startDateTime = new Date(`${date}T${startTime}`);
        const endDateTime = new Date(`${date}T${endTime}`);

        if (startDateTime >= endDateTime) {
            setError('End time must be after the start time.');
            return;
        }

        const staff = staffList.find((s) => s.id === selectedStaff);
        if (!staff) return;

        const newShift: Shift = {
            staffId: staff.id,
            staffName: staff.name,
            start: startDateTime,
            end: endDateTime,
            title: `${staff.name} shift`,
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

            {/* Shift Form */}
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

            {/* Calendar displaying shifts */}
            <div className="calendar-container" style={{ height: '500px', marginTop: '20px' }}>
                <Calendar
                    localizer={localizer}
                    events={shifts as Event[]}
                    startAccessor="start"
                    endAccessor="end"
                    titleAccessor="title"
                    defaultView="week"
                    style={{ height: 500 }}
                    views={['month', 'week', 'day']}
                />
            </div>
        </div>
    );
}
