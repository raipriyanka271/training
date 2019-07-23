import React, { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nextDirection: "arrowright",
            keyPressed: false,
            isDiamond: false,
            current: -1,
            alreadyClicked: false
        }

        this.toggleImage = this.toggleImage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      const currentIndex = (8 * this.props.row) + this.props.col;

        if (currentIndex === nextProps.previousIndex) {
            this.setState({
                keyPressed: true,
            })
        } else {
            this.setState({
                keyPressed: false,
                current: -1
            })
        }
    }

    toggleImage(i, j) {

        let tempDiamond = this.props.diamondPosition;
        let check = (8 * i) + j;


        if (tempDiamond.includes(check)) {
            this.setState({
                isDiamond: true,
                keyPressed: true,
                alreadyClicked: true
            });
            this.props.countScore(check);
            this.props.removeDiamond(check);
        } else {
            let minR = 8;
            let minC = 8;
            let nearestNeighbour;
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
                this.props.countScore(check);
                this.setState({
                    nextDirection: direction,
                    keyPressed: true,
                    current: check,
                    alreadyClicked: true
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
        let imgsrc = this.state.current === check ? 'arrow.png' : 'blank.jpg';

        const { alreadyClicked } = this.state;

        if (!this.state.keyPressed && !alreadyClicked) {
            return (
                <img className="" src={question} height="50" width="50" onClick={() => this.toggleImage(row, col)} />
            );
        }
        else {
            if (this.state.isDiamond) {
                return (
                    <img className="" src={diamond} height="50" width="50" />
                );
            } else if (this.state.current === check) {
                return <img src={arrow} className={this.state.nextDirection} alt="arrow" height="50" width="50" />
            }
            return <img src="blank.jpg" className={this.state.nextDirection} alt="arrow" height="50" width="50" />
        }
    }
}

export default Item;