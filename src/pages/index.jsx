"use client"

import { useState } from "react"
import Head from "next/head"
import imag1 from "../../public/image1.webp"

export default function Home() {
  // Create an array of 30 players
  const [players, setPlayers] = useState(
    Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      eliminated: false,
    })),
  )

  const [inputValue, setInputValue] = useState("")
  const [error, setError] = useState("")

  const handleEliminate = () => {
    const id = Number.parseInt(inputValue)

    if (isNaN(id) || id < 1 || id > 30) {
      setError("Please enter a valid number between 1 and 30")
      return
    }

    setError("")
    setPlayers(players.map((player) => (player.id === id ? { ...player, eliminated: true } : player)))
    setInputValue("")
  }

  // Format ID to have leading zeros (e.g., 001, 002, etc.)
  const formatId = (id) => {
    return id.toString().padStart(3, "0")
  }

  // Utility function to conditionally join class names
  const cn = (...classes) => {
    return classes.filter(Boolean).join(" ")
  }

  return (
    <div>
      <Head>
        <title>Squid Game Player Grid</title>
        <meta name="description" content="A Squid Game inspired player grid with elimination functionality" />
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
        <div style={{ maxWidth: "1200px", margin: "0 auto"  }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "2rem",
              color: "#ff0080",
            }}
          >
            SQUID GAME
          </h1>

          {/* Control Panel */}
          <div style={{ marginBottom: "2rem", maxWidth: "500px", margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                "@media (min-width: 640px)": {
                  flexDirection: "row",
                },
              }}
            >
              <div style={{ flex: 1 }}>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter player ID (1-30)"
                  style={{
                    width: "100%",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    color: "white",
                  }}
                />
                {error && <p style={{ color: "#ef4444", fontSize: "0.875rem", marginTop: "0.25rem" }}>{error}</p>}
              </div>
              <button
                onClick={handleEliminate}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  backgroundColor: "#e5006f",
                  color: "white",
                  transition: "background-color 0.2s",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#cc0063")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#e5006f")}
              >
                Eliminate
              </button>
            </div>
          </div>

          {/* Player Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "2px",
              backgroundColor: "black",
              padding: "2px",
              maxWidth: "1100px",
              margin: "0 auto",
              marginTop:"30px",
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
                  opacity: player.eliminated ? 0.2 : 1,
                  transform: player.eliminated ? "scale(0.95)" : "scale(1)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    backgroundColor: "#ff0080",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={imag1.src || "/placeholder.svg"}
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
                      background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
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
                      {formatId(player.id)}
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
          font-family: 'Digital-7';
          src: url('https://fonts.cdnfonts.com/css/digital-7-mono') format('woff2');
          font-weight: normal;
          font-style: normal;
        }
      `}</style>
    </div>
  )
}

