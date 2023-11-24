import { timeOptions } from "../../data/timeOptions";


const mobileStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const AddEvent = ({
  selectedEvent,
  setSelectedEvent,
  selectedDate,
  setSelectedDate,
  formMode,
  saveEventForm,
  deleteEvent,
  closeEventForm,
  popupPosition,
  showEventForm
}) => {

  return (
    <div
      className="p-3 border border-1 border-gray-200 bg-gray-100 text-[#2c3e50] lg:w-1/5 rounded-lg shadow-lg z-10"
      style={{
        position: "absolute",
        top: popupPosition.top,
        left: popupPosition.left,
        ...(showEventForm && window.innerWidth <= 767 ? mobileStyle : {}),
      }}
    >
      <p className="text-center text-sm mb-3 font-bold text-gray-700">
        {" "}
        {formMode === "eventClick"
          ? `Edit event - ${selectedEvent?.title}`
          : `Add a new event on ${selectedDate}`}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveEventForm(selectedEvent);
        }}
      >
        <div className="flex flex-col items-center">
          <label className="text-sm flex flex-col">
            Title:
            <input
              type="text"
              value={selectedEvent?.title}
              onChange={(e) =>
                setSelectedEvent({
                  ...selectedEvent,
                  title: e.target.value,
                })
              }
              placeholder="Add Title"
              required
              className="rounded-md mb-3 text-gray-900 px-3"
            />
          </label>

          <label className="text-sm flex flex-col">
            Date:
            <input
              type="text"
              value={selectedDate}
              onChange={(e) => {
                setSelectedEvent({
                  ...selectedEvent,
                  date: e.target.value,
                });
                setSelectedDate(e.target.value);
              }}
              className="rounded-md mb-3 text-gray-900 px-3"
              placeholder="YYYY-MM-DD"
              required
            />
          </label>
          <label className="text-sm flex flex-col">
            Time:
            <select
              value={selectedEvent?.time}
              onChange={(e) =>
                setSelectedEvent({
                  ...selectedEvent,
                  time: e.target.value,
                })
              }
              className="rounded-md mb-3 text-gray-900 px-12"
            >
              {timeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm flex flex-col">
            Description:
            <textarea
              value={selectedEvent?.description}
              onChange={(e) =>
                setSelectedEvent({
                  ...selectedEvent,
                  description: e.target.value,
                })
              }
              className="rounded-md mb-5 text-gray-900 px-3"
              placeholder="Add Description"
            />
          </label>
        </div>
        <div className="flex flex-row justify-around">
          <button
            className="bg-green-300 border border-1 border-green-500 text-white text-sm rounded-full px-2"
            type="submit"
          >
            {formMode === "eventClick" ? "Save" : "Add event"}
          </button>
          {formMode === "eventClick" && (
            <button
              className="bg-red-400 border border-1 border-red-500  text-white text-sm rounded-full px-2"
              type="button"
              onClick={deleteEvent}
            >
              Delete
            </button>
          )}
          <button
            className="bg-purple-400 border border-1 border-purple-700  text-white text-sm rounded-full px-2"
            type="button"
            onClick={closeEventForm}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
