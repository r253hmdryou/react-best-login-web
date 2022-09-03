import {Link} from "react-router-dom";
import {css, Theme} from "@emotion/react";

export function Header() {
	return (
		<header>
			<nav css={style.nav}>
				<ul css={style.list}>
					<li css={style.listItem}>
						<Link to="/" css={style.link}>
						Home
						</Link>
					</li>
					<li css={style.listItem}>
						<Link to="/about" css={style.link}>
						About
						</Link>
					</li>
					<li css={style.listItem}>
						<Link to="/login" css={style.link}>
						Login
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

const style = {
	nav: (theme: Theme) => css`
		display: flex;
		z-index: 10;
		padding-left: 50;
		height: ${theme.typography.fontSize * 3}px;
		width: 100%;
		justify-content: space-between;
		overflow: hidden;
		background-color: ${theme.color.primary};
		transition: 0.25s;
	`,
	list: css`
		list-style-type: none;
		padding: 0;
		margin: 0;
		border-left: 1px solid;
	`,
	listItem: css`
		float: left;
		padding-left: 20px;
		padding-right: 20px;
		border-right: 1px solid;
		transition-duration: 0.3s;

		&:hover {
			background-color: rgba(0, 0, 0, 0.2);
			transition-duration: 0.3s;
		}
	`,
	link: (theme: Theme) => css`
		display: block;
		padding-top: ${(theme.typography.fontSize * 3 - theme.typography.fontSize) / 2}px;
		padding-bottom: ${(theme.typography.fontSize * 3 - theme.typography.fontSize) / 2}px;
		font-size: ${theme.typography.fontSize}px;
		text-align: center;
		text-decoration: none;
	`,
};
