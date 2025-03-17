import { createContext, useContext, useState, useEffect } from "react";

const SlotContext = createContext();

export const SlotProvider = ({ children }) => {
  const [eliminatedPlayers, setEliminatedPlayers] = useState([]);

  // Sync state with localStorage
  useEffect(() => {
    const storedPlayers =
      JSON.parse(localStorage.getItem("eliminatedPlayers")) || [];
    setEliminatedPlayers(storedPlayers);
  }, []);

  // Update localStorage and state when eliminatedPlayers changes
  const eliminatePlayer = (playerId) => {
    const updatedPlayers = [...eliminatedPlayers, playerId];
    localStorage.setItem("eliminatedPlayers", JSON.stringify(updatedPlayers));
    setEliminatedPlayers(updatedPlayers);
  };

  // Remove player from eliminated list (revive)
  const revivePlayer = (playerId) => {
    const updatedPlayers = eliminatedPlayers.filter((id) => id !== playerId);
    localStorage.setItem("eliminatedPlayers", JSON.stringify(updatedPlayers));
    setEliminatedPlayers(updatedPlayers);
  };

  // Listen for storage events (changes in other tabs)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "eliminatedPlayers") {
        setEliminatedPlayers(JSON.parse(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <SlotContext.Provider
      value={{
        eliminatedPlayers,
        eliminatePlayer,
        revivePlayer,
        isPlayerEliminated: (id) => eliminatedPlayers.includes(id),
      }}
    >
      {children}
    </SlotContext.Provider>
  );
};

export const useSlot = () => useContext(SlotContext);
