import { Link } from "react-router-dom";

export default function Home() {
  return (
    <nav className="p-16 text-4xl">
      <ul className="flex flex-col gap-16">
        <li className="underline-offset-2 hover:underline">
          <Link to="/test1">TEST 1 페이지로 이동</Link>
        </li>
        <li className="underline-offset-2 hover:underline">
          <Link to="/test2">TEST 2 (react-data-grid) 페이지로 이동</Link>
        </li>
        <li className="underline-offset-2 hover:underline">
          <Link to="/test2formik">TEST 2 (formik) 페이지로 이동</Link>
        </li>
      </ul>
    </nav>
  );
}
