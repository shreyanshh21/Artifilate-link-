import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Can from "../rbac/Can";

function UserHeader() {
    const userDetails = useSelector((state) => state.userDetails);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        Dashboard
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* Add other nav links here if needed */}
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {userDetails ? (userDetails.name) : (<>Account</>)}
                                </Link>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <Link className="dropdown-item" to="/manage-payments">
                                            Manage Payments
                                        </Link>
                                    </li>
                                    <Can permission='canViewUser'>
                                        <li>
                                            <Link className="dropdown-item" to="/users">
                                                Manage Users
                                            </Link>
                                        </li>
                                    </Can>
                                    <li>
                                        <Link className="dropdown-item" to="/logout">
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <style>{`
                .navbar {
                    background: rgba(0, 0, 0, 0.6) !important;
                    backdrop-filter: blur(8px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .navbar .navbar-brand {
                    background: linear-gradient(45deg, #ec4899, #8b5cf6);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-weight: bold;
                    font-size: 22px;
                }

                .navbar .nav-link,
                .navbar .dropdown-item {
                    color: #f5f5f5 !important;
                    transition: color 0.3s, background 0.3s;
                }

                .navbar .nav-link:hover,
                .navbar .dropdown-item:hover {
                    color: #ec4899 !important;
                    background: rgba(255, 255, 255, 0.1);
                }

                .navbar .dropdown-menu {
                    background: rgba(30, 30, 30, 0.95);
                    border-radius: 10px;
                    overflow: hidden;
                }

                .navbar .dropdown-menu .dropdown-item {
                    padding: 10px 20px;
                }

                .navbar .dropdown-menu .dropdown-item:hover {
                    background: #6d28d9;
                    color: white !important;
                }

                .navbar-toggler {
                    border: none;
                }

                .navbar-toggler-icon {
                    filter: invert(1);
                }
            `}</style>
        </>
    );
}

export default UserHeader;
