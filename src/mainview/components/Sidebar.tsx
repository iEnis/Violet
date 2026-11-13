import { getInstalledExtensions } from "../extensions/manager";
import { Link, useLocation } from "@tanstack/react-router";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
    const extensions = getInstalledExtensions();
    const location = useLocation();

    return (
        <div className={styles.sidebar}>
            <div className={styles.pages}>
                <Link className={styles.page} to="/">
                    Home
                </Link>
                <Link className={styles.page} to="/about">
                    About
                </Link>
                {extensions.map((x) => (
                    <Link key={x.id} className={styles.page} to={`/${x.id}` as "/"}>
                        {x.name}
                    </Link>
                ))}
            </div>
            <div className={styles.currentPath}>{location.pathname}</div>
        </div>
    );
}
