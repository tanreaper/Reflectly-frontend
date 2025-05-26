'use client';
import { Button } from "@/components/ui/button";
import { Meh, Frown, Smile, CalendarIcon, MessageSquare, Laugh, Annoyed, Angry, Currency } from 'lucide-react';

interface MoodPickerProps {
    selectedMood: string | null;
    onMoodSelect: (mood: string) => void;

}

const moods = [
  { icon: <Laugh className="w-4 h-4"/>, color: 'bg-green-200', label: 'Very Happy'},
  { icon: <Smile className="w-4 h-4"/>, color: 'bg-yellow-200', label: 'Smile'},
  { icon: <Meh className="w-4 h-4"/>, color: 'bg-blue-200', label: 'Meh' },
  { icon: <Annoyed className="w-4 h-4" />, color: 'bg-pink-200', label: 'Annoyed' },
  { icon: <Frown className="w-4 h-4"/>, color: 'bg-orange-200', label: 'Sad'},
  { icon: <Angry className="w-4 h-4"/>, color: 'bg-red-400', label: 'Angry' }
]

export default function MoodPickerComponent({
    selectedMood, onMoodSelect}: Readonly<MoodPickerProps>) {
        return (
            <div className="flex flex-wrap gap-2">
                {moods.map((mood) => (
                    <Button key={mood.label} variant={selectedMood === mood.label ? "default" : "outline"} className={`flex items-center gap-1 ${mood.color}`} onClick={() => onMoodSelect(mood.label)}> {mood.icon} {mood.label}
                    </Button>
                ))}
            </div>
        )
    }