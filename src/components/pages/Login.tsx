import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { css, Theme } from "@emotion/react";

import { UserDispatchContext, UserStateContext } from "@/Context";

import { GenericTemplate } from "@/components/templates/GenericTemplate";
import { Api } from "@/api";

type Credential = {
	email: string;
	password: string;
}

export function Login() {
	const userState = React.useContext(UserStateContext);
	const userDispatch = React.useContext(UserDispatchContext);
	const [credential, setCredential] = React.useState<Credential>({email: "", password: ""});
	const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
	const navigate = useNavigate();

	if(userState) {
		return (
			<Navigate to="/" replace />
		);
	}

	const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setCredential((credential) => ({
			...credential,
			[e.target.name]: e.target.value,
		}));
	}, []);

	const handleOnSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if(credential.email === "" || credential.password === "") {
			setErrorMessage("メールアドレスとパスワードを正しく入力してください。");
			return;
		}

		const api = new Api;
		api.login.login({
			email: credential.email,
			password: credential.password,
		}, {
			credentials: "include",
			headers: {
				"X-Requested-With": "XMLHttpRequest",
			},
		}).then((response) => {
			userDispatch({
				type: "loginSuccess",
				payload: response.data,
			});
			navigate("/", {replace: true});
		}).catch((_error) => {
			userDispatch({
				type: "failedToLogin",
			});
		});

	}, [credential]);

	if(userState === false) {
		return (
			<GenericTemplate>
				<div css={style.root}>
					<div css={style.container}>
						<div css={style.logo}>
							Login to RBLW
						</div>
						<form onSubmit={handleOnSubmit}>
							<label>
								<p>email-address</p>
								<input type="email" name="email" id="loginEmail" value={credential.email} onChange={handleChange}/>
							</label>
							<label>
								<p>password</p>
								<input type="password" name="password" id="loginPassword" value={credential.password} onChange={handleChange}/>
							</label>
							<div css={style.formItem}>
								<p css={style.errorMessage}>
									{errorMessage}
								</p>
							</div>
							<div css={style.formItem}>
								<div css={style.flexCenter}>
									<button type="submit" color="primary">ログイン！</button>
								</div>
								<div css={style.clearFix}></div>
							</div>
						</form>
					</div>
				</div>
			</GenericTemplate>
		);
	}
	return <>null</>;
}

const style = {
	root: css`
		width: 360px;
		margin: auto;
		margin-top: 100px;
	`,
	container: (theme: Theme) => css`
		padding: 20px;
		background-color: ${theme.color.paper.backgroundColor};
	`,
	logo: (theme: Theme) => css`
		margin: 20px 20px 30px 20px;
		font-size: ${theme.typography.h4.fontSize}px;
		text-align: center;
	`,
	formItem: css``,
	errorMessage: css``,
	flexCenter: css``,
	link: css``,
	clearFix: css``,
};
