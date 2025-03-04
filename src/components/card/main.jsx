import style from "./main.module.css";

export default function Card({ listing }) {
  return (
    <div className={style.card}>
        <h2 className={style.companyName}>{listing.company_name}</h2>
        <h3 className={style.jobTitle}>{listing.title}</h3>
        <div className={style.description}>
          <ul>
            <li className={style.terms}>{listing.terms}</li>
            <li className={style.locations}>{listing.locations}</li>
            <li className={style.date_posted}>
              {new Date(listing.date_posted * 1000).toLocaleDateString()}
            </li>
          </ul>
        </div>
    </div>
  );
}
