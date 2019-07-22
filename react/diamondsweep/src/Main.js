import React, { Component } from 'react';
import Item from './Item';
const randomInt = require('random-int');



class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: Array(8).fill().map(() => Array(8).fill(0)),
            diamondPosition: [],
            click: -1,
            isGameOver: false,
            moves: 64
        }

        this.renderRow = this.renderRow.bind(this);
        this.renderRowElements = this.renderRowElements.bind(this);
        this.removeDiamond = this.removeDiamond.bind(this);
        this.renderTable = this.renderTable.bind(this);
        this.renderGameOver = this.renderGameOver.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        let diamCordinate = [];
        let j = 0;
        while (diamCordinate.length != 8) {
            let num = randomInt(0, 63);
            let check = (diamCordinate.includes(num) === false ? diamCordinate.push(num) : null)
        }
        console.log(diamCordinate)
        this.setState({
            diamondPosition: diamCordinate,

        })
    }
    countScore = () => {
        console.log(this.state.moves)
        let newmove = this.state.moves - 1
        this.setState({
            moves: newmove
        })

    }
    removeDiamond(diamond) {
        let tempDiamond = this.state.diamondPosition;
        const index = tempDiamond.indexOf(diamond);
        tempDiamond.splice(index, 1);
        this.setState({
            diamondPosition: tempDiamond
        });
        if (this.state.diamondPosition.length === 0) {
            this.setState({
                isGameOver: true
            });
        }

    }
    renderRowElements(row) {
        let rowElements = []
        let check;
        for (let j = 0; j < 8; j++) {
            check = (8 * row) + j;

            rowElements.push(
                <td key={j + '' + row}>
                    <Item row={row} col={j}
                        diamondPosition={this.state.diamondPosition}
                        removeDiamond={(diamond) => this.removeDiamond(diamond)}
                        countScore={this.countScore} />
                </td>


            )
        }

        return rowElements;
    }

    renderRow() {
        let row = [];
        for (let i = 0; i < 8; i++) {
            row.push(

                <tr key={i}>
                    {this.renderRowElements(i)}
                </tr>
            );
        }
        return row;

    }
    renderTable() {
        let list = "";
        let temp = JSON.parse(localStorage.getItem("leaderboard") || "[]");
        if (temp.length > 0) {
            let lb = temp.sort((a, b) => b.score - a.score);
            lb.slice(0, 10);
            list = lb.map((user, i) => {
                return (
                    <p key="i">{i}){user.name}:{user.score}</p>
                );
            });
        }
        return (
            <div>
                <div className="game-board">
                    <p>Diamonds Left:{this.state.diamondPosition.length}</p>
                    <p>Moves Left:{this.state.moves}</p>
                    <table>
                        <tbody>{this.renderRow()}</tbody>
                    </table>
                </div>
                <div className="leader-board">
                    <h1>Leader board</h1>
                    {list}
                </div>


            </div>


        );
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        let lb = JSON.parse(localStorage.getItem("leaderboard") || "[]");

        lb.push({ "name": name, "score": this.state.moves });
        localStorage.setItem('leaderboard', JSON.stringify(lb));
        console.log(JSON.parse(localStorage.getItem("leaderboard") || "[]"));
    }
    renderGameOver() {
        let list = "";
        let temp = JSON.parse(localStorage.getItem("leaderboard") || "[]");
        if (temp.length > 0) {
            let lb = temp.sort((a, b) => a.score - b.score);
            lb.slice(0, 10);
            list = lb.map((user, i) => {
                return (
                    <p key="i">{user.name}:{user.score}</p>
                );
            });
        }
        return (
            <div>
                <p>Congratulation!You have found all the diamonds</p>
                <p>Your score is: {this.state.moves}</p>
                <p>Reload to Play again</p>
                <form onSubmit={this.handleSubmit}>
                    <label for="name">Enter Your Name</label>
                    <input type="text" id="name" name="name" />
                    <button type="submit">Submit</button>
                </form>
                <div className="leader-board">
                    <h1>Leader board</h1>
                    {list}

                </div>
            </div>
        );
    }
    render() {

        return (

            <div className="container">
                {this.state.isGameOver ? this.renderGameOver() : this.renderTable()}
            </div>

        );
    };
}



export default Main;