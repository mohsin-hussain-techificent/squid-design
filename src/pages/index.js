"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import imag1 from "../../public/image1.webp";
import { useSlot } from "../context/SlotContext";

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(
  require.context(
    "../../public/player-images",
    false,
    /\.(png|jpe?g|svg|webp)$/
  )
);

export default function Home() {
  // Create an array of 29 players
  const { eliminatedPlayers, isPlayerEliminated } = useSlot();

  const [players, setPlayers] = useState(
    Array.from({ length: 29 }, (_, i) => ({
      id: i + 1,
      eliminated: false,
      image: images[i % images.length].default.src,
    }))
  );
  const [successMessage, setSuccessMessage] = useState("");

  // Update players when eliminatedPlayers changes
  useEffect(() => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        eliminated: isPlayerEliminated(player.id),
      }))
    );
  }, [eliminatedPlayers, isPlayerEliminated]);

  // Format ID to have leading zeros (e.g., 001, 002, etc.)
  const formatId = (id) => {
    return id.toString().padStart(3, "0");
  };

  // Utility function to conditionally join class names
  const cn = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div>
      <Head>
        <title>Squid Game Player Grid</title>
        <meta
          name="description"
          content="A Squid Game inspired player grid with elimination functionality"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "black",
          color: "white",
          padding: "1rem",
        }}
      >
        <div style={{ margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "2rem",
              color: "#ff0080",
            }}
          >
            TECHI SQUID GAME
          </h1>

          {/* Player Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(10, 1fr)",
              gap: "2px",
              backgroundColor: "black",
              padding: "2px",
              margin: "0 auto",
              marginTop: "30px",
              "@media (min-width: 640px)": {
                gridTemplateColumns: "repeat(3, 1fr)",
              },
              "@media (min-width: 768px)": {
                gridTemplateColumns: "repeat(3, 1fr)",
              },
              "@media (min-width: 1024px)": {
                gridTemplateColumns: "repeat(3, 1fr)",
              },
            }}
          >
            {players.slice(0, 30).map((player) => (
              <div
                key={player.id}
                style={{
                  position: "relative",
                  aspectRatio: "1/1",
                  transition: "all 1s",
                  opacity: player.eliminated ? 0.1 : 1,
                  transform: player.eliminated ? "scale(0.95)" : "scale(1)",
                  margin: 10,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    backgroundColor: "#ff0080",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      clipPath:
                        "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      boxShadow:
                        "0 0 10px #ff0066, 0 0 20px #ff0066, 0 0 30px #ff0066, 0 0 40px #ff0066",
                      filter: "blur(5px)",
                      zIndex: 1,
                    }}
                  ></div>
                  <img
                    src={player.image || "/image1.webp"}
                    alt={`Player ${player.id}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center 30%",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      right: "0",
                      height: "30%",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      paddingBottom: "10%",
                    }}
                  >
                    <span
                      style={{
                        color: "#4ade80",
                        fontFamily: "'Digital-7', monospace",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        textShadow: "0 0 5px rgba(74, 222, 128, 0.7)",
                      }}
                    >
                      {player.id}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Digital font style */}
      <style jsx global>{`
        @font-face {
          font-family: "Digital-7";
          src: url("https://fonts.cdnfonts.com/css/digital-7-mono")
            format("woff2");
          font-weight: normal;
          font-style: normal;
        }
      `}</style>
    </div>
  );
}
