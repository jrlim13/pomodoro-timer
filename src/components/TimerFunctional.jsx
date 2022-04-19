import React, { useState, useReducer, useRef } from 'react';
import { useInterval } from 'beautiful-react-hooks';
import useSound from 'use-sound';
import '../styles/Timer.css'
import keyboardSound from '../assets/audio/Keyboard press - Sound Effect-PXkIBbkbJCk.mp3'
import alarmSound from '../assets/audio/iPhone Radar Alarm_Ringtone (Apple Sound) - Sound Effect for Editing-kcT-i9xzC-8.mp3';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function TimerFunctional() {

    const [state, dispatch] = useReducer(reducer, {
        tab: tabs[0].tab,
        minutes: tabs[0].minutes,
        seconds: tabs[0].seconds,
        running: false,
        timerId: 0,
        ctr: 4
    });
    const timerId = useRef(0);

    useInterval(() => {
        if (state.running)
            dispatch({ type: "reduce" });
    }, 1000);

    const [play] = useSound(keyboardSound);

    const toggleRun = () => {
        play();
        if (!state.running)
            dispatch({ type: "run" });
        else {
            dispatch({ type: "stop" });
        }
    }

    const toggleReset = () => {
        play();
        dispatch({ type: "stop" });
        const searchedTab = tabs.find(tab => tab.tab === state.tab);
        dispatch({ type: "reset", payload: searchedTab })
    }

    const toggleTab = (tab) => {
        if (tab.tab !== state.tab) {
            dispatch({ type: "setTab", payload: { tab: tab.tab, minutes: tab.minutes, seconds: tab.seconds } })
        }
    }

    return (
        <main>
            <div className="tc-width mx-auto">
                <div className="h-80 bg-peach-100/30 rounded-lg">
                    <ul className="flexrounded-lg rounded-lg divide-x divide-gray-200 shadow flex">
                        {
                            tabs.map((tab, i) =>
                                <li key={i} className="w-full">
                                    <button
                                        className={`inline-block relative py-4 px-4 w-full text-sm font-medium text-center ${tab.tab === state.tab ? "text-red bg-beige" : "text-beige bg-peach-100/30 hover:bg-peach-200"} ${i === 0 ? "rounded-l-lg" : ""} ${i === tabs.length - 1 ? "rounded-r-lg" : ""}`}
                                        onClick={toggleTab.bind(this, tab)}
                                    >
                                        {tab.tab}
                                    </button>
                                </li>
                            )
                        }
                    </ul>
                    <div className="t-text whitespace-nowrap p-8 text-9xl font-semibold">{state.minutes.toString().padStart(2, 0)} : {state.seconds.toString().padStart(2, 0)} </div>
                    <div className="relative">
                        <button data-testid="btn-play-pause" className="px-8 text-red bg-beige rounded-md btn-animation" onClick={toggleRun}>{state.running ? <PauseIcon style={{ fontSize: "50px" }} /> : <PlayArrowIcon style={{ fontSize: "50px" }} />}</button>
                        <button className="p-1 text-red bg-beige rounded-md absolute right-3 bottom-0 btn-animation" onClick={toggleReset}><RestartAltIcon /></button>
                    </div>
                </div>
            </div>
        </main>
    );
}

const reducer = (state, action) => {
    switch (action.type) {
        case "setTab":
            return { ...state, ...action.payload };
        case "run":
            return { ...state, running: true };
        case "stop":
            return { ...state, running: false };
        case "reduce":
            if (state.minutes === 0 && state.seconds === 0) {
                alert("Time's up!");
                // const searchedTab = tabs.find(tab => tab.tab === state.tab);
                
                if (state.tab === "Pomodoro" && state.ctr % 4 == 0) {
                    const currentTab = tabs[2];
                    return { ...state, ...currentTab, running: false };
                } else if (state.tab === "Short Break" || state.tab === "Long Break") {
                    const currentTab = tabs[0];
                    return { ...state, ...currentTab, running: false };
                }

                const currentTab = tabs[1];
                return { ...state, ...currentTab, running: false };
            }
            if (state.seconds === 0) {
                return { ...state, minutes: state.minutes - 1, seconds: 59 };
            } else {
                return { ...state, seconds: state.seconds - 1 };
            }
        case "reset":
            return { ...state, ...action.payload }
        default:
            return state;
    }
}

const tabs = [
    { tab: "Pomodoro", minutes: 25, seconds: 0 },
    { tab: "Short Break", minutes: 5, seconds: 0 },
    { tab: "Long Break", minutes: 30, seconds: 0 }
];

export default TimerFunctional;