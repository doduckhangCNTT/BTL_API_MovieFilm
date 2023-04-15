import React from "react";
import "./header.scss";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const headerNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Movies",
    path: "/movie",
  },
  {
    display: "Blogs",
    path: "/blog",
  },
  {
    display: "Create Blog",
    path: "/create_blog",
  },
  {
    display: "TV Series",
    path: "/tv",
  },
];

const Header = () => {
  const { pathname } = useLocation(); // trả về cái nội dung tương ứng với trong url
  const headerRef = useRef(null);
  const active = headerNav.findIndex((e) => e.path === pathname); // nó sẽ trả về index thỏa mãn và kết thúc tại vị trí đó

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink"); // thêm một class vào thẻ đang đc tham chiếu
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      // cleanup function
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <h3>@</h3>
          <Link to="/">tMovies</Link>
        </div>

        <ul className="header__nav">
          {headerNav.map((e, i) => {
            return (
              <li key={i} className={`${i === active ? "active" : ""}`}>
                <Link to={e.path}>{e.display}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Header;
