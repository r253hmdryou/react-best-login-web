import {Link} from "react-router-dom";
import {css} from "@emotion/react";

export function Header() {
	return (
		<header>
			<nav>
				<ul>
					<li>
						<Link to="/" css={style.link}>
						Home
						</Link>
					</li>
					<li>
						<Link to="/about">
						About
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

const style = {
	link: css`
		font-size: 5rem;
	`,
};
