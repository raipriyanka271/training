

import React, { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nextDirection: "arrowright",
            keyPressed: false,
            isDiamond: false,
            checkarrow: [],

        }
        this.toggleImage = this.toggleImage.bind(this);
    }


    toggleImage(i, j) {
        let tempDiamond = this.props.diamondPosition;
        let check = (8 * i) + j;

        if (tempDiamond.includes(check)) {
            this.setState({
                isDiamond: true,
                keyPressed: true
            });
            this.props.countScore();
            this.props.removeDiamond(check);
        } else {
            let minR = 8;
            let minC = 8;
            let nearestNeighbour;
            let arr = this.state.checkarrow;
            arr.push(check);
            tempDiamond.forEach(diamond => {
                let diamondRow = diamond / 8;
                let diamondCol = diamond % 8;

                if (((Math.abs(diamondRow - i) + Math.abs(diamondCol - j)) / 2) < ((minC + minR) / 2)) {
                    minR = Math.abs(diamondRow - i);
                    minC = Math.abs(diamondCol - j);
                    nearestNeighbour = diamond;
                }
                let nearestdiamR = nearestNeighbour / 8;
                let nearestdiamC = nearestNeighbour % 8;
                let direction = "";
                if ((Math.abs(nearestdiamR - i) < Math.abs(nearestdiamC - j)) || nearestdiamR === i) {
                    if (nearestdiamC - j < 0) {
                        direction = "arrowleft";
                    }
                    else {
                        direction = "arrowright";
                    }

                } else {
                    if (nearestdiamR - i > 0) {
                        direction = "arrowup";
                    }
                    else {
                        direction = "arrowdown";
                    }

                }

                this.props.countScore();

                this.setState({
                    nextDirection: direction,
                    keyPressed: true,
                    checkarrow: arr,
                    lastclick: check

                });

            })



        }

    }


    render() {
        let question = "/quest.png";
        let arrow = "/arrow.png";
        let diamond = "/diam.jpg";

        let row = this.props.row;
        let col = this.props.col;
        let check = (8 * row) + col;

        if (!this.state.keyPressed) {
            return (
                <img className="" src={question} height="40" width="40" onClick={() => this.toggleImage(row, col)} />
            );
        }
        else {
            if (this.state.isDiamond) {
                return (
                    <img className="" src={diamond} height="40" width="40" />
                );
            }
            else {
               return <img src={arrow} className={this.state.nextDirection} alt="arrow" height="40" width="40" />
            }
        }
    }



}



export default Item;