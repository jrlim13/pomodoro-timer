import React from 'react';
import '../styles/Timer.css'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: tabs[0].tab,
            minutes: tabs[0].minutes,
            seconds: tabs[0].seconds,
            running: false,
            timerId: 0
        };
    }

    toggleTab = (tab) => {
        if (tab.tab !== this.state.tab) {
            clearInterval(this.state.timerId);
            tab.running = false;
            this.setState(tab);
        }
    };

    toggleRun = () => {
        if (!this.state.running) {
            const timerId = setInterval(() => {
                this.setState(state => {
                    if (this.state.minutes === 0 && this.state.seconds === 0) {
                        clearInterval(timerId);
                        alert("Time's up!");
                        const searchedTab = tabs.find(tab => tab.tab === this.state.tab);
                        return ({ ...searchedTab, running: !state.running, timerId: 0 })
                    }
                    if (state.seconds === 0) {
                        return ({ minutes: state.minutes - 1, seconds: 59 });
                    } else {
                        return ({ seconds: state.seconds - 1 });
                    }
                });
            }, 1000);

            this.setState(state => ({ running: !state.running, timerId: timerId }));
        }
        else {
            clearInterval(this.state.timerId);
            this.setState(state => ({ running: !state.running, timerId: 0 }));
        }

    };

    toggleReset = () => {
        clearInterval(this.state.timerId);
        const searchedTab = tabs.find(tab => tab.tab === this.state.tab);
        this.setState({ ...searchedTab, running: false, timerId: 0 });
    };

    iconStyles = {
        fontSize: "50px"
    };

    render() {
        return (
            <main>
                <div className="tc-width mx-auto">
                    <div className="h-80 bg-peach-100/30 rounded-lg">
                        <ul className="flexrounded-lg rounded-lg divide-x divide-gray-200 shadow flex">
                            {
                                tabs.map((tab, i) =>
                                    <li key={i} className="w-full">
                                        <button
                                            className={`inline-block relative py-4 px-4 w-full text-sm font-medium text-center ${tab.tab === this.state.tab ? "text-red bg-beige" : "text-beige bg-peach-100/30 hover:bg-peach-200"} ${i === 0 ? "rounded-l-lg" : ""} ${i === tabs.length - 1 ? "rounded-r-lg" : ""}`}
                                            onClick={this.toggleTab.bind(this, tab)}
                                        >
                                            {tab.tab}
                                        </button>
                                    </li>
                                )
                            }
                        </ul>
                        <div className="p-8 text-9xl font-semibold">{this.state.minutes.toString().padStart(2, 0)} : {this.state.seconds.toString().padStart(2, 0)} </div>
                        <div className="relative">
                            <button className="px-8 text-red bg-beige rounded-md btn-animation" onClick={this.toggleRun}>{this.state.running ? <PauseIcon style={this.iconStyles} /> : <PlayArrowIcon style={this.iconStyles} />}</button>
                            <button className="p-1 text-red bg-beige rounded-md absolute right-3 bottom-0 btn-animation" onClick={this.toggleReset}><RestartAltIcon /></button>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

const tabs = [
    { tab: "Pomodoro", minutes: 25, seconds: 0 },
    { tab: "Short Break", minutes: 5, seconds: 0 },
    { tab: "Long Break", minutes: 30, seconds: 0 }
];

export default Timer;