import { useState, useEffect, useCallback } from "react";

const TUTORIAL_KEY = "codia_tutorial_completed";

export function useTutorial() {
  const [hasSeenTutorial, setHasSeenTutorial] = useState(true); // Default to true to prevent flash
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const completed = localStorage.getItem(TUTORIAL_KEY);
    setHasSeenTutorial(completed === "true");
    setLoading(false);
  }, []);

  const completeTutorial = useCallback(() => {
    localStorage.setItem(TUTORIAL_KEY, "true");
    setHasSeenTutorial(true);
  }, []);

  const resetTutorial = useCallback(() => {
    localStorage.removeItem(TUTORIAL_KEY);
    setHasSeenTutorial(false);
  }, []);

  return {
    hasSeenTutorial,
    loading,
    completeTutorial,
    resetTutorial,
    shouldShowTutorial: !loading && !hasSeenTutorial,
  };
}
