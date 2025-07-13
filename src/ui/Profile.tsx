import { useEffect, useState } from "react";
import image1 from "./assets/images/ProfilePic.png";
import image2 from "./assets/images/New.png";
import confetti from "./assets/images/confetti.gif";
import popper from "./assets/images/partypopper.gif";

export default function Profile() {
  const [flipped, setFlipped] = useState(false);
  const [isBDay, celebrate] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    console.log(
      "Day:",
      currentDate.getDate(),
      "Month:",
      currentDate.getMonth()
    );
    if (currentDate.getMonth() === 2 && currentDate.getDate() === 2) {
      console.log("It's your Birthday! Click your profile to Celebrate!");
      celebrate(true);
    }
  }, []);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      className={`dp-container ${flipped ? "flip" : ""}`}
      onClick={handleClick}
    >
      <div className="flipper">
        <div className="front">
          <img src={image2} />
        </div>
        <div className="back">
          <img src={image1} />
        </div>

        {isBDay && (
          <div className="celebrate">
            <img className="confetti" src={confetti} alt="" />
            <img className="popper-left" src={popper} alt="" />
            <img className="popper-right" src={popper} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}
