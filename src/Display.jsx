import { useEffect, useState } from "react";
import style from "./Display.module.css";
import Card from "./components/card/main";
import LoadingCard from "./components/loadingCard/main";

export default function Display() {
  const [listings, setListings] = useState([]);
  const [listingNumber, setListingNumber] = useState(0);
  const [backendRes, setBackendRes] = useState(false);
  const [expressRes, setexpressRes] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("../backend/listings.json");
        var data = await res.json();
        data = sortListings(data);
        setListings(data);
        setBackendRes(true);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchExpress = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/data");
        setexpressRes(true)
      } catch (err) {
        console.error("Error fetching express: ", err);
      }
    };
    fetchExpress();
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
      console.log(newNumber);
      return newNumber;
    });

    fetch("http://localhost:8080/api/data")
      .then((response) => response.json())
      .catch((error) => console.error("Error", error));
  }
  function swipeLeft() {
    var currentListing = listings[listingNumber];

    fetch("http://localhost:8080/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key: currentListing }),
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div className={style.mainContent}>
      <div className={style.screen}>
        {expressRes && backendRes ? (
          <Card listing={listings[listingNumber]} />
        ) : (
          <LoadingCard />
        )}
      </div>
      <div className={style.selection}>
        <button onClick={swipeLeft}>reject</button>
        <button onClick={swipeRight}>next</button>
      </div>
    </div>
  );
}
