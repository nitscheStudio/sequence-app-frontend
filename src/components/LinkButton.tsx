import { Link } from "react-router-dom";

type button = {
  to: string;
  text: string;
};

const LinkButton = ({ to, text }: button) => {
  return (
    <Link to={to} className="button-link">
      {text}
    </Link>
  );
};

export default LinkButton;
