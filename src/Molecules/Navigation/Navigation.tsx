import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <>
      <nav>
        <Link className="underline" to="/">Home</Link>
      </nav>
    </>
  );
};