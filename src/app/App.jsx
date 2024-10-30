import { useState } from "react";
import { useSelector } from "react-redux";
import AuthForm from "../features/auth/AuthForm";

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <h1>Recipe Organizer</h1>
      <p>The planner for all your recipe needs.</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
        inventore et, doloribus molestiae dicta recusandae odit debitis natus,
        ad nisi ipsum officia fugit maxime dolores ea tenetur! Maiores,
        dignissimos. Asperiores.
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur
        dolorem dolores inventore perferendis soluta minus, laudantium, officia
        explicabo itaque molestias ullam maiores, laborum asperiores aliquid?
        Incidunt quasi provident beatae. Id.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, nihil
        enim ab dicta non qui laborum, sunt expedita molestiae voluptas eius sed
        alias, veniam pariatur! Velit culpa doloribus id earum?
      </p>
    </>
  );
}
