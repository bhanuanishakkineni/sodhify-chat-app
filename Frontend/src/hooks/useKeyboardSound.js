const keyStrokeSounds = [
  new Audio("src/assets/sounds/keystroke1.mp3"),
  new Audio("src/assets/sounds/keystroke2.mp3"),
  new Audio("src/assets/sounds/keystroke3.mp3"),
  new Audio("src/assets/sounds/keystroke4.mp3"),
];

export function useKeyboardSound () {
    const playRandomKeyStrokeSound = () => {
        const randomSound = keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];
        randomSound.currentTime = 0;
        randomSound.play().catch(err => console.log("Keyboard strokes failed", err));
    };
    return { playRandomKeyStrokeSound };
}
