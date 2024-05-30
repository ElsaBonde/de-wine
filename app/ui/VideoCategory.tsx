"use client";

import { Pause, PlayArrow } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useRef, useState } from "react";

export default function VideoCategory({
  category,
}: {
  category: { title: string };
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  let videoSrc;

  switch (category.title) {
    case "Red":
      videoSrc = "/redWineVideo.mp4";
      break;
    case "White":
      videoSrc = "/whiteWineVideo.mp4";
      break;
    case "Sparkling":
      videoSrc = "/sparklingWineVideo.mp4";
      break;
    default:
      videoSrc = "/redWineVideo.mp4";
  }

  const togglePlay = () => {
    setIsPlaying((prevState) => !prevState);
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: { xs: "250px", md: "500px" },
        overflow: "hidden",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        controls={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 20%",
        }}
      ></video>
      {isHovered && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        >
          <IconButton
            onClick={togglePlay}
            sx={{ color: "white", height: "70px", width: "70px", opacity: 0.8, "&:hover": { opacity: 1, backgroundColor: "rgba(0, 0, 0, 0.5)"}}}
          >
            {isPlaying ? (
              <Pause sx={{ height: "70px", width: "70px" }} />
            ) : (
              <PlayArrow sx={{ height: "70px", width: "70px" }} />
            )}
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
