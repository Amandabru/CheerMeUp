import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <div className="navbar bg-base-100">
      <a className="btn btn-ghost normal-case text-xl"><Link to="/">CheerMeUp</Link></a>
      <a className="btn btn-ghost normal-case text-xl"><Link to="/news">News</Link></a>
      <a className="btn btn-ghost normal-case text-xl"><Link to="/memes">Memes</Link></a>
      <a className="btn btn-ghost normal-case text-xl"><Link to="/jokes">Jokes</Link></a>
      <a className="btn btn-ghost normal-case text-xl">Suggestions</a>
    </div>
  );
}

export default NavigationBar;
