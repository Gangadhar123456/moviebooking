import React, { Component } from "react";
import './index.css'

class SeatMap extends Component {
  constructor(props) {
    super(props);

    this.rows = ['K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
    this.seatsPerRow = {
      A: 20, B: 21, C: 21, D: 21, E: 21, F: 21, G: 21, H: 21, I: 27, J: 27, K: 27,
    };

    this.seatPrices = {
      A: 430.0, B: 430.0, C: 450.0, D: 450.0, E: 450.0, F: 450.0, G: 450.0,
      H: 450.0, I: 470.0, J: 470.0, K: 470.0,
    };

    this.seatType = {
      A: "Normal", B: 430.0, C: "Normal", D: "Exclusive", E: "Exclusive", F: "Exclusive", G: "Exclusive",
      H: "Exclusive", I: "Premium", J: "Premium", K: "Premium",
    }

    this.state = {
      selectedSeats: [],
      isProceedClicked: false,
    };
  }

  handleSeatClick = (row, seat) => {
    if (!this.state.isProceedClicked) {
      const isSelected = this.state.selectedSeats.some(
        (selectedSeat) =>
          selectedSeat.row === row && selectedSeat.seat === seat
      );

      if (isSelected) {
        this.setState((prevState) => ({
          selectedSeats: prevState.selectedSeats.filter(
            (selectedSeat) =>
              !(selectedSeat.row === row && selectedSeat.seat === seat)
          ),
        }));
      } else {
        this.setState((prevState) => ({
          selectedSeats: [...prevState.selectedSeats, { row, seat, seatType: this.seatType[row] }],
        }));
      }
    }
  };

  handleProceedClick = () => {
    this.setState({ isProceedClicked: true });
  };

  handleContinueBooking = () => {
    this.setState({
      isProceedClicked: false,
    });
  };

  handleReset = () => {
    this.setState({
      selectedSeats: [],
      isProceedClicked: false,
    });
  };

  calculateTotalAmount = () => {
    const totalAmount = this.state.selectedSeats.reduce((total, seat) => {
      const seatPrice = this.seatPrices[seat.row];
      return total + seatPrice;
    }, 0);
    return totalAmount;
  };

  render() {
    const { selectedSeats, isProceedClicked } = this.state;
    const totalAmount = this.calculateTotalAmount();

    return (
      <div>
        <div style={{display : "flex" , justifyContent : "space-around", margin: 10}}>
        <div>
          <h3>PREMIUM - Rs. 470.00   <span style={{color : "red"}}>: I, J, K rows</span></h3>
        </div>
        <div>
          <h3>EXCLUSIVE - Rs. 450.00 <span style={{color : "red"}}>: C, D, E, F, G, H  rows</span></h3>
        </div>
        <div>
          <h3>NORMAL - Rs. 430.00 <span style={{color : "red"}}>: A, B rows</span></h3>
        </div>
        </div>
        <div>
          <div className="seat-map">
            {this.rows.map((row) => (
              <div key={row} className="row">
                {Array.from({ length: this.seatsPerRow[row] }, (_, index) => (
                  <div
                    key={index + 1}
                    className={
                      selectedSeats.some(
                        (selectedSeat) =>
                          selectedSeat.row === row && selectedSeat.seat === index + 1
                      )
                        ? "seat selected"
                        : isProceedClicked
                        ? selectedSeats.some(
                          (selectedSeat) =>
                            selectedSeat.row === row && selectedSeat.seat === index + 1
                          )
                          ? "seat booked"
                          : "seat"
                        : "seat"
                    }
                    onClick={() => this.handleSeatClick(row, index + 1)}
                    disabled={isProceedClicked && selectedSeats.length > 0}
                  >
                    {row}
                    {index + 1}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3>Total Amount: Rs. {totalAmount.toFixed(2)}</h3>
        </div>
        {!isProceedClicked && (
          <button onClick={this.handleProceedClick}>Proceed</button>
        )}
        {isProceedClicked && selectedSeats.length > 0 && (
          <div>
            <h3>Booked Tickets:</h3>
            <ul>
              {selectedSeats.map((seat, index) => (
                <li key={index}>
                  Row: {seat.row}, Seat: {seat.seat}, Type: {seat.seatType}
                </li>
              ))}
            </ul>
            <button onClick={this.handleContinueBooking}>Continue Booking</button>
          </div>
        )}
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}

export default SeatMap;
