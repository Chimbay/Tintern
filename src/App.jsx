import { useEffect, useState } from "react";
import style from "./App.module.css";
import Card from "./components/card/main";

export default function App() {
  const [listings, setListings] = useState([]);
  const [listingNumber, setListingNumber] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "Summer2025-Internships/.github/scripts/listings.json"
        );
        var data = await response.json();
        data = sortListings(data)
        setListings(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetch('http://localhost:8080/api/data')
      .then(response => response.json())
      .catch(error => console.error('Error', error));
  }, []);

  function sortListings(listings) {
    var newListing = listings
      .filter((listing) => listing.active)
      .sort((a, b) => {
        if (b.date_posted - a.date_posted !== 0)
          return b.date_posted - a.date_posted;
        if (a.company_name.toLowerCase() > b.company_name.toLowerCase())
          return 1;
        if (a.company_name.toLowerCase() < b.company_name.toLowerCase())
          return -1;
        return b.date_updated - a.date_updated;
      });

    return newListing;
  }

  function swipeRight() {
    setListingNumber((number) => {
        const newNumber = number + 1;
        console.log(newNumber)
        return newNumber
    });

    fetch('http://localhost:8080/api/data')
    .then(response => response.json())
    .catch(error => console.error('Error', error));
  }
  function swipeLeft() {
    var currentListing = listings[listingNumber]

    fetch('http://localhost:8080/api/data', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({key: currentListing})
    })
    .then((response) => response.json())
    .then((data) => console.log("Success:", data))
    .catch((error) => console.error("Error:", error));
  }


  return (
    <div className={style.mainContent}>
      {listings.length > 0 && <Card listing={listings[listingNumber]} />}
      <div className={style.selection}>
        <button onClick={swipeLeft}>reject</button>
        <button onClick={swipeRight}>next</button>
      </div>
    </div>
  );
}
