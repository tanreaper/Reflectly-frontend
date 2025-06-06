"use client";

import { useState, useEffect, useRef } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Meh, Frown, Smile, CalendarIcon, MessageSquare, Laugh, Annoyed, Angry, Currency } from 'lucide-react';
import { format } from "date-fns" 
import DateComponent from '@/components/component/DateComponent';
import MoodPickerComponent from '@/components/component/MoodPickerComponent';
import JournalComponent from '@/components/component/JournalComponent';
import SignInModal from '@/components/component/SignInModal';

/* 
  Defining the mood here, which will direct how the ai assistant would behave and would be used for sentiment analysis 
*/

export default function Home() {
  const [showSignIn, setShowSignIn] = useState(false)
  const [selectedMood, setSelectedMood] = useState(null)
  // const [journalEntries, setJournalEntries] = useState([]);
  // const [entryText, setEntryText] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  //Calculate Today's Date
  const currentDate = new Date()
  const day: number = currentDate.getDate();
  const month: number = currentDate.getMonth() + 1;
  const year: number = currentDate.getFullYear();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // const handleSave = () => {
  //   if (!entryText) return;
  //   const newEntry = {
  //     date, 
  //     mood: selectedMood,
  //     text: entryText,
  //   };
  //   // setJournalEntries([newEntry, ...journalEntries]);
  //   setEntryText('');
  //   setSelectedMood(null);
  // }

  
  return (
    <>
    <header className='flex justify-end p-4'>
      <button onClick={() => setShowSignIn(true)} className='text-white bg-black text-sm px-4 py-2 border rounded-md'>
        Sign In
      </button>
    </header>
    <div className='max-w-3xl mx-auto p-6 space-y-6'>
      <h1 className="text-3xl font-bold">{monthNames[month-1]} {day}, {year}</h1>
      <h2 className='text-xl'>How are you feeling? </h2>
      
      <DateComponent date={date} onDateChange={setDate} />
      <MoodPickerComponent selectedMood={selectedMood} onMoodSelect={setSelectedMood} />
      <JournalComponent selectedDate={date} />
      <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
    </div>
    </>
  );
}
