import type {Route} from "./+types/home";
import '../app.css'

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Emp"},
        {name: "description", content: "Welcome to React Router!"},
    ];
}

export default function Home() {
    return (
        <div className="container">
            <h1>Organize. Assign. Manage.</h1>
            <div className="wrapper">
                <div className="btn-login">
                    <a href="/login">Log in</a>
                </div>
                <span className="span">or</span>
                <div className="btn-register">
                    <a href="/register">Register</a>
                </div>
            </div>
        </div>

    );
}
