import { Link } from "react-router-dom";
import main from "../assets/images/undraw_developer_activity.svg"; //undraw.co
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby brunch actually gochujang taiyaki, sriracha viral unicorn
            poutine sartorial bitters yuccie seitan. XOXO adaptogen authentic,
            chambray before they sold out food truck hammock. Freegan mukbang
            four loko praxis big mood DIY.
          </p>

          <Link to="/register" className="btn btn-hero">Login/Register</Link>
        </div>

        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
