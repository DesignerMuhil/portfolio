import { useEffect, useRef } from "react";
import "../styles/Cursor.css";

function Cursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;

    let followerX = 0;
    let followerY = 0;

    const moveMouse = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", moveMouse);

    const animate = () => {
      // Fast inner dot
      cursorX += (mouseX - cursorX) * 0.35;
      cursorY += (mouseY - cursorY) * 0.35;

      // Slow outer ring
      followerX += (mouseX - followerX) * 0.08;
      followerY += (mouseY - followerY) * 0.08;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      }

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    const hoverables = document.querySelectorAll("a, button");

    const handleEnter = () => {
      if (followerRef.current) {
        followerRef.current.classList.add("cursor-hover");
      }
    };

    const handleLeave = () => {
      if (followerRef.current) {
        followerRef.current.classList.remove("cursor-hover");
      }
    };

    hoverables.forEach((item) => {
      item.addEventListener("mouseenter", handleEnter);
      item.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveMouse);

      hoverables.forEach((item) => {
        item.removeEventListener("mouseenter", handleEnter);
        item.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={followerRef}
        className="cursor-follower"
      ></div>

      <div
        ref={cursorRef}
        className="custom-cursor"
      ></div>
    </>
  );
}

export default Cursor;