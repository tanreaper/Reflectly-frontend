'use client';
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface DateComponentProps {
    date: Date | undefined;
    onDateChange: (date: Date | undefined) => void
}

export default function DateComponent({ date, onDateChange }: Readonly<DateComponentProps>) {
    const [showCalendar, setShowCalendar] = useState(false)
    const calendarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setShowCalendar(false);
            }
        };

        if (showCalendar) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showCalendar]);

    return (
        <div className='relative'>
            <button onClick={() => setShowCalendar(!showCalendar)} className='flex items-center space-x-2 cursor-pointer'>
                <CalendarIcon className='w-5 h-5' />
                <Input
                    value={date ? format(date, 'PPP') : ''}
                    readOnly
                    className="w-[160px] cursor-pointer"
                />
            </button>
            {showCalendar && (
                <div ref={calendarRef} className="absolute z-10 mt-2 bg-white border rounded shadow animate-fadeIn">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d) => {
                            onDateChange(d);         // 🔔 Notify the parent
                            setShowCalendar(false);  // Hide calendar
                        }}
                    />
                </div>
            )}
        </div>
    );
}