import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {css, Theme} from "@emotion/react";
import { Api } from "@/api";
import { UserDispatchContext, UserStateContext } from "@/Context";

export function Header() {
	const userStateContext = React.useContext(UserStateContext);
	const isLoggedIn = userStateContext !== null && userStateContext !== false;

	return (
		<header>
			<nav css={style.nav}>
				<ul css={style.list}>
					<HeaderLink to="/" text="Home" />
					<HeaderLink to="/about" text="About" />
					{isLoggedIn || <HeaderLink to="/login" text="Login" />}
					{isLoggedIn && <Logout />}
				</ul>
			</nav>
		</header>
	);
}

type LinkProps = {
	to: string;
	text: string;
}

function HeaderLink(props: LinkProps) {
	return (
		<li css={style.listItem}>
			<Link to={props.to} css={style.link}>
				{props.text}
			</Link>
		</li>
	);
}

function Logout() {
	const userDispatch = React.useContext(UserDispatchContext);
	const navigate = useNavigate();

	const logout = () => {
		const api = new Api;
		api.logout.logout({
			credentials: "include",
			headers: {
				"X-Requested-With": "XMLHttpRequest",
			},
		}).then((response) => {
			console.log(response);
			userDispatch({
				type: "logout",
			});
			navigate("/", {replace: true});
		}).catch((error) => {
			console.warn(error);
		});
	};
	return (
		<li css={style.listItem}>
			<div css={[style.link, style.logout]} onClick={logout}>
				Logout
			</div>
		</li>
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
	logout: css`
		cursor: pointer;
	`,
};
