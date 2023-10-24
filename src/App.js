
import { Component } from "react";
import './App.css'
import BookingHeader from "./components/BookingHeader";
import SeatMap from "./components/BookingHeader/SeatMap";
class App extends Component {
  render() {
    return(
      <div >
      <BookingHeader />
      <SeatMap />
    </div>
    
    )
  }
}

export default App