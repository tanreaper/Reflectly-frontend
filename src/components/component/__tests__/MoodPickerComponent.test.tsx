import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MoodPickerComponent from '../MoodPickerComponent';

describe('MoodPickerComponent', () => {
  it('calls onMoodSelect with the selected mood label', async () => {
    const onMoodSelect = jest.fn();
    render(<MoodPickerComponent selectedMood={null} onMoodSelect={onMoodSelect} />);
    const moodButton = screen.getByRole('button', { name: /smile/i });
    await userEvent.click(moodButton);
    expect(onMoodSelect).toHaveBeenCalledWith('Smile');
  });
});
