export const openEventForm = (clickEvent, setPopupPosition) => {
  const position = {
    top: clickEvent.clientY - 10 + "px",
    left: clickEvent.clientX - 150 + "px",
  };

  setPopupPosition(position);
};