function DatePicker({ selectedDay, onChange }) {
  return (
    <div className="datePicker">
      <label>
        Select day:{" "}
        <input
          type="date"
          value={selectedDay}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}

export default DatePicker;

