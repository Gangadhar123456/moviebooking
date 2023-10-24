import { Component } from "react";

class BookingHeader extends Component {
  state = {
    tickets: 0, 
  };

  handleTicketsChange = (e) => {
    const newTickets = parseInt(e.target.value, 10); 
    this.setState({ tickets: newTickets });
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "gray" }}>
        <div>
          <p>Brahmastra</p>
          <p>cinepolis: Nexus Shantinikethan Bangalore | Today, 12 Sep, 06:55 PM</p>
        </div>
        <div>
        <input type="number" onChange={this.handleTicketsChange} value={this.state.tickets} />

        </div>
      </div>
    );
  }
}

export default BookingHeader;
