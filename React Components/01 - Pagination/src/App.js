import "./styles.css";
import React, { useEffect, useState, useRef } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getData();
  }, [page]);

  async function getData() {
    let res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`,
    );
    let d = await res.json();
    setData(d);
    setTotalPages(d.total);
    console.log(data);
  }
  return (
    <>
      <div className="App">
        {totalPages > 0 &&
          data.products.map((item, index) => {
            return (
              <div className="product">
                <img src={item.thumbnail} />
                {item.title}
              </div>
            );
          })}
      </div>
      {totalPages > 0 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            ◀️
          </button>
          {[...Array(totalPages / 10)].map((item, i) => {
            return (
              <span
                className={page === i + 1 ? "pageSelected" : ""}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <button
            disabled={page === totalPages / 10}
            onClick={() => setPage(page + 1)}
          >
            ▶️
          </button>
        </div>
      )}
    </>
  );
}
