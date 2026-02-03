import {keyStrokeSounds} from "../utils/sounds";

export function useKeyboardSound () {
    const playRandomKeyStrokeSound = () => {
        const randomSound = keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];
        randomSound.currentTime = 0;
        randomSound.play().catch(err => console.log("Keyboard strokes failed", err));
    };
    return { playRandomKeyStrokeSound };
}
