import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <ul className="menu p-4 w-64 min-h-full bg-base-100">
      <li>
        <ul className="menu bg-base-200 rounded-box w-56">
          <li>
            <Link to="/images">Images</Link>
          </li>
          <li>
            <Link to="/imagetypes">Image Type</Link>
          </li>
          <li>
            <Link to="/happeningtypes">Happening Type</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/education-partners">Education Partner</Link>
          </li>
          
          {/* <li>
                  <details open>
                    <summary>Parent</summary>
                    <ul>
                      <li>
                        <a>Submenu 1</a>
                      </li>
                      <li>
                        <a>Submenu 2</a>
                      </li>
                    </ul>
                  </details>
                </li> */}
        </ul>
      </li>
    </ul>
  );
};

export default Sidebar;
