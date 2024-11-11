import { useEffect, useState, useRef } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import StreakCalendar from "./StreakCalendar";
import Navbar from "./Navbar";
import styles from "./MyActivity.module.css";
import Footer from "./Footer";
import { User } from "../models/User"; // Adjust import path as needed

const MyActivity = () => {
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); // State to hold the image URL
  const glowRef = useRef(null);
  const canvasRef = useRef(null);
  const ballsRef = useRef([]);
  const [balls, setBalls] = useState([]);
  const mouse = useRef({ x: undefined, y: undefined });
  const rgb = [
    "rgb(26, 188, 156)",
    "rgb(46, 204, 113)",
    "rgb(52, 152, 219)",
    "rgb(155, 89, 182)",
    "rgb(241, 196, 15)",
    "rgb(230, 126, 34)",
    "rgb(231, 76, 60)",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h;

    function resizeReset() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function init() {
      resizeReset();
      animationLoop();
    }

    function animationLoop() {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      drawBalls(ctx);

      // Filter out balls whose time has exceeded their TTL
      ballsRef.current = ballsRef.current.filter(
        (ball) => ball.time <= ball.ttl
      );

      requestAnimationFrame(animationLoop);
    }

    function drawBalls(ctx) {
      ballsRef.current.forEach((ball) => {
        ball.update();
        ball.draw(ctx);
      });
    }
    function mousemove(e) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Directly add new balls to ballsRef.current instead of using state
      Array.from({ length: 3 }).forEach(() =>
        ballsRef.current.push(new Ball(mouse.current))
      );
    }

    function mouseout() {
      mouse.current.x = undefined;
      mouse.current.y = undefined;
    }

    function getRandomInt(min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    }

    function easeOutQuart(x) {
      return 1 - Math.pow(1 - x, 4);
    }

    class Ball {
      constructor(mouse) {
        this.start = {
          x: mouse.x + Math.random() * 40 - 20,
          y: mouse.y + Math.random() * 40 - 20,
          size: Math.random() * 10 + 30,
        };
        this.end = {
          x: this.start.x + Math.random() * 600 - 300,
          y: this.start.y + Math.random() * 600 - 300,
        };
        this.x = this.start.x;
        this.y = this.start.y;
        this.size = this.start.size;
        this.style = rgb[Math.floor(Math.random() * rgb.length)];
        this.time = 0;
        this.ttl = 120;
      }
      draw(ctx) {
        ctx.fillStyle = this.style;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      update() {
        const progress = 1 - (this.ttl - this.time) / this.ttl;
        this.size = this.start.size * (1 - (1 - progress) ** 4); // easeOutQuart
        this.x += (this.end.x - this.x) * 0.01;
        this.y += (this.end.y - this.y) * 0.01;
        this.time++;
      }
    }

    animationLoop();
    // Add event listeners
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseout", mouseout);
    window.addEventListener("resize", resizeReset);

    // Initialize animation
    init();

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseout", mouseout);
      window.removeEventListener("resize", resizeReset);
    };
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");
      const fetchedUser = await User.fetch(userId);
      setUser(fetchedUser);

      if (fetchedUser.imageUrl) {
        // Fetch the download URL for the image
        const storage = getStorage();
        const storageRef = ref(storage, fetchedUser.imageUrl);
        try {
          const url = await getDownloadURL(storageRef);
          setImageUrl(url); // Set the image URL state
        } catch (error) {
          console.error("Error fetching image URL:", error);
        }
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className={styles.pageContainer_Outer} ref={glowRef}>
      {/* <div
        className="glowingEffect"
        style={{
          position: "absolute",
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          width: "1px",
          height: "1px",
          backgroundColor: "#6a3ba3",
          borderRadius: "50%",
          boxShadow: "0 0 200px 200px #fffff",
          pointerEvents: "none",
          transform: "scale(1)",
          transition: "all 0s ease-in-out",
          opacity: 0.3,
          animation: "pulse 0s infinite",
        }}
      ></div> */}
      <div className={styles.pageContainer}>
        <div className={styles.pageContainer_Inner}>
          <div className={styles.container}>
            <div className={styles.navbar}>
              <Navbar />
            </div>
            <div className={styles.streak_outer}>
              <div className={styles.streak}>
                {/* <canvas ref={canvas} className={styles.canvas}>
                  balls = <span></span>
                </canvas> */}
                <canvas ref={canvasRef} className={styles.canvas} id="canvas" />
                <h1 className={styles.heading}>My Activity</h1>
                {/* <div id="debug" className={styles.debug}>
                  balls.length <span></span>
                </div> */}
                <br></br>
                <br></br>
                {user && (
                  <div className={styles.userGreeting}>
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt="Profile"
                        className={styles.profileImage}
                      />
                    )}
                    <h2 className={styles.userTask}>{user.username}'s Task</h2>
                  </div>
                )}
                <StreakCalendar />
              </div>
            </div>
          </div>
          <Footer className={styles.footer} />
        </div>
      </div>
    </div>
  );
};

export default MyActivity;
