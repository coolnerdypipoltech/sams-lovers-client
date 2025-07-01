import { useState, useRef, useEffect } from "react";
import "../styles/Filter.css";
import filterIcon from "../assets/Icon_desplegar.svg";
import checkMark from "../assets/checkMark.svg";

function FilterMenu({
  selectedValue,
  onValueChange,
  options,
  title,
  optionKey,
}) {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  const getLabelFromKey = (key) => {
    const index = optionKey.indexOf(key);
    return options[index] || "";
  };

  const getKeyFromLabel = (label) => {
    const index = options.indexOf(label);
    return optionKey[index] || "";
  };

  const handleSelect = (currentKey) => {
    onValueChange(currentKey);
    setOpen(false);
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="filterMenuContainer">
      <p className="filterMenuTitle">{title}</p>
      <div onClick={() => setOpen(true)} className="filterDisplay">
        <p className="filterMenuSelectedItem">
          {getLabelFromKey(selectedValue)}
        </p>
        <img className="filterMenuIcon" src={filterIcon} alt="filter" />
      </div>

      {isOpen && (
        <div className="filterOverlayMenu">
          <p
            style={{ paddingLeft: "27px", fontSize: "12px" }}
            className="filterOverlayText"
          >
            {title}
          </p>

          {options.map((option, index) => {
            const currentKey = optionKey[index];
            const isSelected = selectedValue === currentKey;

            return (
              <div
                className="filterOverlayContainer"
                key={index}
                onClick={() => {
                  handleSelect(currentKey);
                }}
              >
                {isSelected ? (
                  <>
                    <img
                      src={checkMark}
                      alt="checkmark"
                      className="filterOverlayIcon"
                    />
                    <p className="filterOverlayText">{option}</p>
                  </>
                ) : (
                  <p
                    style={{ paddingLeft: "27px" }}
                    className="filterOverlayText"
                  >
                    {option}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FilterMenu;
