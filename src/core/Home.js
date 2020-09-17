import React from "react";
import "../styles.css";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <div className="cover_body text-center">
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <header className="masthead mb-auto">
          <div className="inner">
            <h3 className="masthead-brand text-white">Deepak Electronics</h3>
            <nav className="nav nav-masthead justify-content-center">
              <Link to="/" className="nav-link active">
                Home
              </Link>
              <Link to="/signin" className="nav-link">
                Sign In
              </Link>
            </nav>
          </div>
        </header>

        <main role="main" className="inner cover text-white">
          <h1 className="cover-heading">Customer Management</h1>
          <p className="lead">
            Here you can record complaints, manage customers and much more.
            Please Sign in with your user Id provided by your Owner.
          </p>

          <p className="lead">
            <Link to="/signin" className="btn btn-lg btn-secondary">
              Sign in
            </Link>
          </p>
        </main>

        <footer className="mastfoot mt-auto"></footer>
      </div>
    </div>
  );
}

export default Home;
