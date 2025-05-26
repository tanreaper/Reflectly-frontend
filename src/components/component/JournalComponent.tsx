'use client'
import { useState, useRef, useEffect } from "react";
import DateComponent from "./DateComponent";
import { format } from "date-fns";


interface JournalComponentProps {
  selectedDate: Date | undefined;
}

export default function JournalComponent({ selectedDate }: Readonly<JournalComponentProps>) {
  const [date, setDate] = useState<Date | undefined>(selectedDate ?? new Date());
  const [showModal, setShowModal] = useState(false);
  const [entry, setEntry] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (showModal && titleRef.current) {
      titleRef.current.focus();
    }
  }, [showModal])
  const handleSave = async () => {
    setIsLoading(true);
    const payload = {
      date: format(date!, 'yyyy-MM-dd'),
      title,
      entry
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/createJournalEntry`, {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json()
      console.log(result)
      if (!response.ok) {
        setError(true)
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      setError(false)
      setSaveSuccess(true);
      setTitle('');
      setEntry('');
      setTimeout(() => {
        setSaveSuccess(false);
        // setShowModal(false);
      }, 1500);
      setIsLoading(false)
    } catch (error) {
      setError(true)
      console.error('Failed to save journal entry:', error)
      setIsLoading(false)
    }
  };
  return (
    <div>
      <button onClick={() => setShowModal(true)} className="border rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg flex items-center justify-center w-40 h-40">
        <span className="text-3xl font-bold">+</span>
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-full h-[600px] max-w-md shadow-lg space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">New Journal Entry</h2>
              {saveSuccess && <p className="text-green-600 text-sm">Journal saved successfully!</p>}
              {error && <p className="text-red-600 text-sm">Error saving the journal</p>}

              <button onClick={() => setShowModal(false)}>✖</button>
            </div>
            <DateComponent date={date} onDateChange={setDate} />
            <input ref={titleRef} type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded-md p-2" placeholder="Title" />
            <textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="Write your thoughts..."
              rows={13}
            />

            <div className="flex justify-end space-x-2">
              <button onClick={handleSave} disabled={isLoading} className={`px-4 py-2 rounded-md text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-600'}`}>{isLoading ? 'Saving...' : 'Save'}</button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-md">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}